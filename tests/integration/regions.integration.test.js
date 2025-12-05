import { test } from 'node:test'
import assert from 'assert'
import request from 'supertest'
import { resetDatabase, seedRegion, disconnect } from './helpers.js'

test('GET /api/regions returns seeded region', async () => {
  await resetDatabase()
  await seedRegion({ name: 'Integration Region', slug: 'integration-region', country: 'Testland' })

  const res = await request('http://localhost:3000').get('/api/regions')
  assert.strictEqual(res.status, 200, `expected 200 but got ${res.status}`)

  const regions = res.body
  assert.ok(Array.isArray(regions), 'response should be an array')
  const found = regions.find((r) => r.slug === 'integration-region')
  assert.ok(found, 'seeded region not found in response')

  await disconnect()
})
