import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/options'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const documentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  category: z.enum(['TEMPLATE', 'GUIDELINE', 'BEST_PRACTICE', 'POLICY', 'PROCEDURE', 'TOOLKIT', 'CASE_STUDY', 'RESEARCH', 'REPORT', 'PRESENTATION', 'OTHER']),
  type: z.enum(['PDF', 'WORD', 'EXCEL', 'POWERPOINT', 'VIDEO', 'AUDIO', 'IMAGE', 'OTHER']),
  fileUrl: z.string(),
  fileName: z.string(),
  tags: z.array(z.string()),
  visibility: z.enum(['PUBLIC', 'MEMBERS_ONLY', 'ADMIN_ONLY', 'RESTRICTED']),
})

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const type = searchParams.get('type')

    const where: any = {}
    if (category) where.category = category
    if (type) where.type = type

    // Filter by visibility based on user role
    if (!session) {
      where.visibility = 'PUBLIC'
    } else if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      where.visibility = {
        in: ['PUBLIC', 'MEMBERS_ONLY'],
      }
    }

    const documents = await prisma.document.findMany({
      where,
      orderBy: {
        publishDate: 'desc',
      },
    })

    return NextResponse.json({ documents })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
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
    const data = documentSchema.parse(body)

    const document = await prisma.document.create({
      data,
    })

    return NextResponse.json({ document }, { status: 201 })
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
