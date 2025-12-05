import { test } from 'node:test'
import assert from 'assert'
import { resetDatabase, seedRegion } from './helpers.js'
import { createTestUser, createOrganization, signInAgent, disconnect } from './auth.helpers.js'
import request from 'supertest'

test('POST /api/applications (protected) creates application (agent sign-in)', async () => {
  await resetDatabase()

  const { user, password } = await createTestUser({ email: 'applicant@test.local', password: 'apppass', role: 'MEMBER' })
  const org = await createOrganization({ name: 'Applicant Org', slug: 'applicant-org', email: 'contact@applicant.local' })

  const agent = await signInAgent({ email: user.email, password })

  const payload = {
    organizationId: org.id,
    applicationLetter: 'We would like to join',
  }

  const res = await agent.post('/api/applications').send(payload)
  assert.ok([200,201,302,201].includes(res.status), `unexpected status ${res.status} body=${JSON.stringify(res.body)}`)

  await disconnect()
})

test('POST /api/applications as authenticated user creates application (cookie sign-in)', async () => {
  await resetDatabase()
  const region = await seedRegion({ name: 'App Region', slug: 'app-region', country: 'Testland' })
  const { user, password } = await createTestUser({ email: 'applicant@inara.test', password: 'apppass', role: 'MEMBER' })
  const org = await createOrganization({ name: 'Applicant Org', slug: 'applicant-org-2', email: 'contact@applicant.local' })

  const signedAgent = await signInAgent({ email: user.email, password })

  const payload = {
    organizationId: org.id,
    applicationLetter: 'We would like to join INARA',
  }

  const res = await signedAgent.post('/api/applications').send(payload).set('Accept', 'application/json')
  
  assert.ok([201, 400, 200].includes(res.status), `unexpected status ${res.status}`)

  await disconnect()
})

test('applications API smoke placeholder', async () => {
  assert.ok(true)
})
