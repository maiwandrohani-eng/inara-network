import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import request from 'supertest'

const prisma = new PrismaClient()

export async function ensureTestUser({ email = 'test-user@inara.test', password = 'testpass', role = 'SUPER_ADMIN' } = {}) {
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashed,
      role,
    },
    create: {
      email,
      password: hashed,
      name: 'Test User',
      role,
      verified: true,
    },
  })
  return { user, password }
}

export async function signInAndGetCookie({ email = 'test-user@inara.test', password = 'testpass' } = {}) {
  // Try to POST to NextAuth credentials callback and capture auth cookie
  const agent = request.agent('http://localhost:3000')
  const res = await agent
    .post('/api/auth/callback/credentials')
    .set('Accept', 'application/json')
    .send({ email, password, json: true })

  // NextAuth should set a session cookie on successful auth
  const cookies = res.headers['set-cookie'] || []
  return cookies
}

export async function cleanupUser(email) {
  await prisma.user.deleteMany({ where: { email } })
}

export async function disconnectAuth() {
  await prisma.$disconnect()
}
