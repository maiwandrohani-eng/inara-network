import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/options'
import { requireRoles } from '@/app/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    const roleCheck = requireRoles(session, ['ADMIN', 'SUPER_ADMIN'])
    if (roleCheck) return roleCheck

    const members = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        memberType: true,
        membershipTier: true,
        verified: true,
        phone: true,
        createdAt: true,
        organization: {
          select: {
            name: true,
            slug: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(members)
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    )
  }
}
