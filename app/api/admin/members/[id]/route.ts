import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/options'
import { prisma } from '@/lib/prisma'
import { requireRoles } from '@/app/lib/auth'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    const roleCheck = requireRoles(session, ['ADMIN', 'SUPER_ADMIN'])
    if (roleCheck) return roleCheck

    const body = await request.json()
    const { role, verified, membershipTier } = body

    const updatedMember = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(role && { role }),
        ...(verified !== undefined && { verified }),
        ...(membershipTier && { membershipTier }),
      }
    })

    return NextResponse.json(updatedMember)
  } catch (error) {
    console.error('Error updating member:', error)
    return NextResponse.json(
      { error: 'Failed to update member' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    const roleCheck2 = requireRoles(session, ['SUPER_ADMIN'])
    if (roleCheck2) return roleCheck2

    await prisma.user.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting member:', error)
    return NextResponse.json(
      { error: 'Failed to delete member' },
      { status: 500 }
    )
  }
}
