import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const benefitSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  eligibility: z.string(),
  redemptionUrl: z.string().optional(),
  active: z.boolean().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const active = searchParams.get('active');

    const where: any = {};
    if (active !== null) where.active = active === 'true';

    const benefits = await prisma.memberBenefit.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(benefits);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message ?? String(error) }, { status: 500 });
  }
}
