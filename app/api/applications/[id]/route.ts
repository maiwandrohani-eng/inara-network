import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/options'
import { requireRoles } from '@/app/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    const roleCheck = requireRoles(session, ['ADMIN', 'SUPER_ADMIN'])
    if (roleCheck) return roleCheck

    const body = await req.json()
    const { action, reviewNotes, rejectionReason } = body

    const application = await prisma.application.findUnique({
      where: { id: params.id },
      include: { organization: true },
    })

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    let updateData: any = {
      reviewedBy: session.user.id,
      reviewDate: new Date(),
      reviewNotes,
    }

    if (action === 'approve') {
      updateData = {
        ...updateData,
        status: 'APPROVED',
        approvedBy: session.user.id,
        approvalDate: new Date(),
      }

      // Update organization status
      await prisma.organization.update({
        where: { id: application.organizationId },
        data: {
          status: 'ACTIVE',
          verified: true,
          membershipStartDate: new Date(),
        },
      })

      // Create activity
      await prisma.activity.create({
        data: {
          type: 'APPLICATION_APPROVED',
          title: 'Application approved',
          description: `Application approved for ${application.organization.name}`,
          userId: session.user.id,
        },
      })
    } else if (action === 'reject') {
      updateData = {
        ...updateData,
        status: 'REJECTED',
        rejectionReason,
      }

      // Update organization status
      await prisma.organization.update({
        where: { id: application.organizationId },
        data: { status: 'REJECTED' },
      })
    } else if (action === 'request_info') {
      updateData = {
        ...updateData,
        status: 'ADDITIONAL_INFO_REQUIRED',
      }
    }

    const updatedApplication = await prisma.application.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json({ application: updatedApplication })
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
