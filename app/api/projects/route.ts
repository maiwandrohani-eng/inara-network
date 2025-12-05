import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/options'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string(),
  shortDescription: z.string().optional(),
  type: z.enum(['EMERGENCY_RESPONSE', 'DEVELOPMENT', 'ADVOCACY', 'CAPACITY_BUILDING', 'RESEARCH', 'COORDINATION']),
  priority: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).optional(),
  country: z.string(),
  region: z.string().optional(),
  city: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  targetBeneficiaries: z.number().optional(),
  budget: z.number().optional(),
  sectors: z.array(z.string()),
  tags: z.array(z.string()).optional(),
  organizationId: z.string(),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const country = searchParams.get('country')
    const type = searchParams.get('type')
    const organizationId = searchParams.get('organizationId')

    const where: any = {}
    if (status) where.status = status
    if (country) where.country = country
    if (type) where.type = type
    if (organizationId) where.organizationId = organizationId

    const projects = await prisma.project.findMany({
      where,
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            logo: true,
            type: true,
          },
        },
        _count: {
          select: {
            members: true,
            resources: true,
            updates: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ projects })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const data = projectSchema.parse(body)

    const existingProject = await prisma.project.findUnique({
      where: { slug: data.slug },
    })

    if (existingProject) {
      return NextResponse.json(
        { error: 'Project with this slug already exists' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        status: 'PLANNING',
      },
    })

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'PROJECT_CREATED',
        title: 'Project created',
        description: `New project "${data.title}" created`,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
