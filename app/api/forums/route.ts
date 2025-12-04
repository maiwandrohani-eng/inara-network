import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const forumSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  type: z.enum(['ANNOUNCEMENT', 'DISCUSSION', 'WORKING_GROUP', 'OTHER']),
  createdAt: z.string(),
  active: z.boolean().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const active = searchParams.get('active');

    const where: any = {};
    if (type) where.type = type;
    if (active !== null) where.active = active === 'true';

    const forums = await prisma.forum.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(forums);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
