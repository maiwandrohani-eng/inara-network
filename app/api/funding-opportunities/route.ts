import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const fundingOpportunitySchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  funderName: z.string(),
  funderType: z.enum(['BILATERAL', 'MULTILATERAL', 'FOUNDATION', 'CORPORATE', 'INDIVIDUAL', 'GOVERNMENT', 'UN_AGENCY', 'OTHER']),
  fundingType: z.enum(['GRANT', 'CONTRACT', 'COOPERATIVE_AGREEMENT', 'PRIZE', 'LOAN', 'EQUITY', 'OTHER']),
  amount: z.number().optional(),
  eligibleRegions: z.array(z.string()),
  eligibleSectors: z.array(z.string()),
  openDate: z.string(),
  deadline: z.string(),
  applicationUrl: z.string().optional(),
  requirements: z.array(z.string()),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const funderType = searchParams.get('funderType')

    const where: any = {}
    if (status) where.status = status
    if (funderType) where.funderType = funderType

    const opportunities = await prisma.fundingOpportunity.findMany({
      where,
      include: {
        _count: {
          select: {
            proposalsSubmitted: true,
            successStories: true,
          },
        },
      },
      orderBy: {
        deadline: 'asc',
      },
    })

    return NextResponse.json({ opportunities })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch funding opportunities' },
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
    const data = fundingOpportunitySchema.parse(body)

    const opportunity = await prisma.fundingOpportunity.create({
      data: {
        ...data,
        openDate: new Date(data.openDate),
        deadline: new Date(data.deadline),
        status: 'OPEN',
      },
    })

    return NextResponse.json({ opportunity }, { status: 201 })
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
