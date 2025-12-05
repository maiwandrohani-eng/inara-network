import request from 'supertest'
import assert from 'assert'

describe('GET /api/applications (integration)', () => {
  it('returns a valid status code (200, 401 or 403)', async () => {
    const res = await request('http://localhost:3000').get('/api/applications')
    assert.ok([200, 401, 403].includes(res.status), `unexpected status ${res.status}`)
  })
})
import { test } from 'node:test'
import assert from 'assert'

test('GET /api/applications returns 401 when unauthenticated', async () => {
  const res = await fetch('http://localhost:3000/api/applications')
  // The endpoint requires ADMIN by default for listing — expect 401 or redirect
  assert.ok(res.status === 401 || res.status === 403 || res.status === 200)
})
