import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/options'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const applicationSchema = z.object({
  organizationId: z.string(),
  applicationLetter: z.string(),
  motivationStatement: z.string().optional(),
  registrationCertificate: z.string().optional(),
  financialStatements: z.string().optional(),
  projectList: z.string().optional(),
  workSamples: z.array(z.string()).optional(),
  policies: z.array(z.string()).optional(),
  referenceName: z.string().optional(),
  referenceEmail: z.string().email().optional(),
  referencePhone: z.string().optional(),
})

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const stage = searchParams.get('stage')

    const where: any = {}
    if (status) where.status = status
    if (stage) where.stage = stage

    const applications = await prisma.application.findMany({
      where,
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            type: true,
            country: true,
            email: true,
            logo: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ applications })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contentType = req.headers.get('content-type') || '';
    let data: any = {};
    let files: { [key: string]: string[] } = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          const uploadDir = `${process.cwd()}/public/uploads/applications`;
          await (await import('fs')).promises.mkdir(uploadDir, { recursive: true });
          const buffer = Buffer.from(await value.arrayBuffer());
          const filePath = `${uploadDir}/${Date.now()}_${value.name}`;
          await (await import('fs')).promises.writeFile(filePath, buffer);
          if (!files[key]) files[key] = [];
          files[key].push(`/uploads/applications/${Date.now()}_${value.name}`);
        } else {
          if (data[key]) {
            if (Array.isArray(data[key])) {
              data[key].push(value);
            } else {
              data[key] = [data[key], value];
            }
          } else {
            data[key] = value;
          }
        }
      }
    } else {
      data = await req.json();
    }

    // Merge file URLs into data
    Object.entries(files).forEach(([key, value]) => {
      data[key] = value.length > 1 ? value : value[0];
    });

    // Check if application already exists
    if (data.organizationId) {
      const existingApplication = await prisma.application.findUnique({
        where: { organizationId: data.organizationId },
      });
      if (existingApplication) {
        return NextResponse.json(
          { error: 'Application already submitted for this organization' },
          { status: 400 }
        );
      }
    }

    const application = await prisma.application.create({
      data: {
        ...data,
        status: 'SUBMITTED',
        stage: 'DOCUMENT_REVIEW',
      },
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'APPLICATION_SUBMITTED',
        title: 'Application submitted',
        description: `Application submitted`,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
