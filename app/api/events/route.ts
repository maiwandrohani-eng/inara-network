import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/options'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const eventSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  type: z.enum(['WORKSHOP', 'CONFERENCE', 'WEBINAR', 'TRAINING', 'COORDINATION_MEETING', 'NETWORKING_EVENT', 'SEMINAR', 'CONSULTATION', 'OTHER']),
  format: z.enum(['IN_PERSON', 'ONLINE', 'HYBRID']),
  startDate: z.string(),
  endDate: z.string(),
  venue: z.string().optional(),
  country: z.string().optional(),
  onlineUrl: z.string().optional(),
  maxParticipants: z.number().optional(),
  topics: z.array(z.string()),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const upcoming = searchParams.get('upcoming')

    const where: any = {}
    if (type) where.type = type
    if (status) where.status = status
    if (upcoming === 'true') {
      where.startDate = {
        gte: new Date(),
      }
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        _count: {
          select: {
            participants: true,
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    })

    return NextResponse.json({ events })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
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
    const data = eventSchema.parse(body)

    const event = await prisma.event.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: 'PLANNED',
      },
    })

    return NextResponse.json({ event }, { status: 201 })
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
