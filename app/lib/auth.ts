import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/options'
import { NextResponse } from 'next/server'

export async function getSession() {
  return await getServerSession(authOptions)
}

export function requireRoles(session: any, roles: string[]) {
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userRole = session.user?.role
  if (!userRole || !roles.includes(userRole)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return null
}
