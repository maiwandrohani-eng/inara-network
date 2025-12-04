import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const assessmentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  score: z.number().optional(),
  improvementPlan: z.string().optional(),
  milestone: z.string().optional(),
  active: z.boolean().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const active = searchParams.get('active');

    const where: any = {};
    if (active !== null) where.active = active === 'true';

    const assessments = await prisma.assessment.findMany({
      where,
      orderBy: {
        title: 'asc',
      },
    });
    return NextResponse.json(assessments);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
