import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/options'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const resourceSchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  type: z.enum(['EQUIPMENT', 'SUPPLIES', 'MEDICINE', 'FOOD', 'SHELTER_MATERIALS', 'VEHICLES', 'TECHNOLOGY', 'EXPERTISE', 'FUNDING', 'VOLUNTEERS']),
  category: z.string(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  location: z.string(),
  country: z.string(),
  condition: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  organizationId: z.string(),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const country = searchParams.get('country')
    const available = searchParams.get('available')
    const organizationId = searchParams.get('organizationId')

    const where: any = {}
    if (type) where.type = type
    if (country) where.country = country
    if (available !== null) where.available = available === 'true'
    if (organizationId) where.organizationId = organizationId

    const resources = await prisma.resource.findMany({
      where,
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
        _count: {
          select: {
            projects: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ resources })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
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
    const data = resourceSchema.parse(body)

    const resource = await prisma.resource.create({
      data,
    })

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'RESOURCE_ADDED',
        title: 'Resource added',
        description: `New resource "${data.name}" added`,
          userId: session!.user.id,
      },
    })

    return NextResponse.json({ resource }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: (error as any).errors ?? (error as any).issues ?? [] },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
