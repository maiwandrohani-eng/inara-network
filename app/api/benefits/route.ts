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

    const benefits = await prisma.benefit.findMany({
      where,
      orderBy: {
        title: 'asc',
      },
    });
    return NextResponse.json(benefits);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
