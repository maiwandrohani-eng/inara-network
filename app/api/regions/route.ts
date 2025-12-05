import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const regionSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  countries: z.array(z.string()).optional(),
  active: z.boolean().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get('country');
    const active = searchParams.get('active');

    const where: any = {};
    if (country) where.countries = { has: country };
    if (active !== null) where.active = active === 'true';

    const regions = await prisma.region.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(regions);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message ?? String(error) }, { status: 500 });
  }
}
