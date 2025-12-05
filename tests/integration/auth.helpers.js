import request from 'supertest'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createTestUser({ email = 'testuser@local', password = 'testpass', role = 'ADMIN' } = {}) {
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashed, role },
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

export async function createOrganization({ name = 'Test Org', slug = `test-org-${Date.now()}`, country = 'Testland', email = 'org@test.local' } = {}) {
  const org = await prisma.organization.create({
    data: {
      name,
      slug,
      country,
      email,
      verified: true,
      type: 'NGO',
      size: 'SMALL',
    },
  })
  return org
}

export async function signInAgent({ email, password }) {
  const agent = request.agent('http://localhost:3000')
  // Retrieve CSRF token first (NextAuth expects this for credential callbacks)
  const csrfRes = await agent.get('/api/auth/csrf')
  const csrf = csrfRes.body?.csrfToken || csrfRes.body?.csrf_token || ''

  const res = await agent
    .post('/api/auth/callback/credentials')
    .type('form')
    .send({ csrfToken: csrf, email, password })

  if (![200, 302].includes(res.status)) {
    throw new Error(`signin failed: ${res.status} ${JSON.stringify(res.body)}`)
  }

  return agent
}

export async function disconnect() {
  await prisma.$disconnect()
}
