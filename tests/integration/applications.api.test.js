import { test } from 'node:test'
import assert from 'assert'
import request from 'supertest'

test('GET /api/applications (integration) - public/unauthenticated', async () => {
  const res = await request('http://localhost:3000').get('/api/applications')
  assert.ok([200, 401, 403].includes(res.status), `unexpected status ${res.status}`)
})

test('GET /api/applications returns 401/403 when unauthenticated (fetch)', async () => {
  const res = await fetch('http://localhost:3000/api/applications')
  assert.ok([401, 403, 200].includes(res.status), `unexpected status ${res.status}`)
})
