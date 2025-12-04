import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const serviceSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  category: z.enum(['TECHNICAL_ASSISTANCE', 'CONSULTING', 'GRANT_MANAGEMENT', 'PROPOSAL_DEVELOPMENT', 'MONITORING_EVALUATION', 'RESOURCE_MOBILIZATION', 'NETWORKING', 'ADVOCACY', 'CAPACITY_BUILDING', 'LEGAL_SUPPORT', 'FINANCIAL_MANAGEMENT', 'OTHER']),
  deliveryMode: z.enum(['ONLINE', 'IN_PERSON', 'HYBRID', 'SELF_PACED']),
  duration: z.string().optional(),
  objectives: z.array(z.string()),
  active: z.boolean().optional(),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const active = searchParams.get('active')

    const where: any = {}
    if (category) where.category = category
    if (active !== null) where.active = active === 'true'

    const services = await prisma.service.findMany({
      where,
      include: {
        _count: {
          select: {
            utilization: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ services })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = serviceSchema.parse(body)

    const service = await prisma.service.create({
      data,
    })

    return NextResponse.json({ service }, { status: 201 })
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
