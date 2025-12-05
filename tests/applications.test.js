import { test } from 'node:test'
import assert from 'assert'
import { z } from 'zod'

const applicationSchema = z.object({
  organizationId: z.string(),
  applicationLetter: z.string(),
  motivationStatement: z.string().optional(),
})

test('application schema accepts valid payload', () => {
  const payload = {
    organizationId: 'org_123',
    applicationLetter: 'We would like to join.',
  }
  const parsed = applicationSchema.parse(payload)
  assert.strictEqual(parsed.organizationId, payload.organizationId)
})

test('application schema rejects missing organizationId', () => {
  const payload = {
    applicationLetter: 'Missing org id',
  }
  let threw = false
  try {
    applicationSchema.parse(payload)
  } catch (e) {
    threw = true
  }
  assert.strictEqual(threw, true)
})
