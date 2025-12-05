Integration tests

This folder contains integration-test skeletons for API endpoints.

How to run locally:

1. Ensure a dev database is available and `DATABASE_URL` points to it.
2. Start the app in a background terminal: `npm run dev`.
3. Run the tests: `npm run test`

Notes:
- These integration tests are lightweight skeletons that call API routes
  directly where possible or can be expanded to use `supertest` against
  a running dev server. They are intentionally small to be safe in CI.
