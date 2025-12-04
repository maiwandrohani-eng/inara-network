import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const organizationSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  type: z.enum(['NGO', 'INGO', 'UN_AGENCY', 'GOVERNMENT', 'FAITH_BASED', 'COMMUNITY', 'PRIVATE_SECTOR', 'ACADEMIC']),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().optional(),
  country: z.string(),
  city: z.string().optional(),
  address: z.string().optional(),
  focusAreas: z.array(z.string()),
  operatingRegions: z.array(z.string()),
  languages: z.array(z.string()),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const country = searchParams.get('country')
    const type = searchParams.get('type')

    const where: any = {}
    if (status) where.status = status
    if (country) where.country = country
    if (type) where.type = type

    const organizations = await prisma.organization.findMany({
      where,
      include: {
        _count: {
          select: {
            projects: true,
            resources: true,
            users: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ organizations })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
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
    const data = organizationSchema.parse(body)

    const existingOrg = await prisma.organization.findFirst({
      where: {
        OR: [
          { name: data.name },
          { slug: data.slug },
        ],
      },
    })

    if (existingOrg) {
      return NextResponse.json(
        { error: 'Organization with this name or slug already exists' },
        { status: 400 }
      )
    }

    const organization = await prisma.organization.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ organization }, { status: 201 })
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
