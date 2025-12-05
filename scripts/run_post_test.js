const request = require('supertest')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

;(async () => {
  const prisma = new PrismaClient()
  try {
    // create test user
    const email = `int-user-${Date.now()}@test.local`
    const password = 'testpass'
    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name: 'Int User',
        role: 'MEMBER',
        verified: true,
      },
    })

    // create organization
    const org = await prisma.organization.create({
      data: {
        name: `Org ${Date.now()}`,
        slug: `org-${Date.now()}`,
        country: 'Testland',
        email: `org-${Date.now()}@test.local`,
        verified: true,
        type: 'NGO',
        size: 'SMALL',
      },
    })

    // sign in via NextAuth csrf + credentials
    const agent = request.agent('http://localhost:3000')
    const csrfRes = await agent.get('/api/auth/csrf')
    const csrf = csrfRes.body?.csrfToken || ''
    const sign = await agent.post('/api/auth/callback/credentials').type('form').send({ csrfToken: csrf, email, password })
    console.log('signin status', sign.status)

    const payload = { organizationId: org.id, applicationLetter: 'please accept' }
    const res = await agent.post('/api/applications').send(payload)
    console.log('post status', res.status, 'body', res.body)
  } catch (e) {
    console.error('script error', e)
  } finally {
    await prisma.$disconnect()
  }
})()
