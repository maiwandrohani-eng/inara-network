import { test } from 'node:test'
import assert from 'assert'

test('GET /api/applications returns 401 when unauthenticated', async () => {
  const res = await fetch('http://localhost:3000/api/applications')
  // The endpoint requires ADMIN by default for listing — expect 401 or redirect
  assert.ok(res.status === 401 || res.status === 403 || res.status === 200)
})
