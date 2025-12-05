import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const trainingSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  category: z.enum(['FIRST_AID', 'LEADERSHIP', 'TECHNICAL', 'SOFT_SKILLS', 'HEALTH', 'EDUCATION', 'OTHER']),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string().optional(),
  onlineUrl: z.string().optional(),
  certificate: z.boolean().optional(),
  active: z.boolean().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const active = searchParams.get('active');

    const where: any = {};
    if (category) where.category = category;
    if (active !== null) where.active = active === 'true';

    const trainings = await prisma.training.findMany({
      where,
      orderBy: {
        startDate: 'desc',
      },
    });
    return NextResponse.json(trainings);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message ?? String(error) }, { status: 500 });
  }
}
