# Project Review — INARA Network

Date: 2025-12-05

Summary of actions performed

- Ran dependency checks (`npm outdated`, `npm audit`) and linting.
- Fixed TypeScript errors surfaced by `tsc --noEmit`.
- Added NextAuth type augmentations at `types/next-auth.d.ts`.
- Moved NextAuth `authOptions` to `app/api/auth/options.ts` to avoid Next.js type generation issues and updated imports.
- Replaced some incorrect Prisma model/field references and improved error handling (casts of `unknown` errors).
- Committed changes to branch `review/ts-and-security-fixes`.

Key findings

- Stack is modern and well-organized (Next.js App Router, Prisma, NextAuth).
- `prisma/schema.prisma` is comprehensive — consider normalizing frequently-filtered arrays of strings.
- `prisma/seed.ts` logs plaintext dev credentials; rotate/remove before sharing or production.
- `next.config.js` restricts `images.domains` to `localhost` — update for production/CDNs.
- `node_modules` contains a few outdated packages (see `outdated.json`) and `npm audit` reports 3 high vulnerabilities related to `glob` via `eslint-config-next`.

Recommendations

1. Address vulnerabilities by updating `eslint-config-next` / `@next/eslint-plugin-next` to a patched version. Test linting after upgrade.
2. Update major packages in a controlled manner: `next`, `prisma`/`@prisma/client`, `react`, and `tailwindcss` — run tests and smoke checks after each upgrade.
3. Remove plaintext seed credentials from `prisma/seed.ts` or make seeding conditional on a dev-only flag; use environment variables for seed passwords.
4. Add TypeScript declaration merges for NextAuth (done) and replace `@ts-ignore` usage in components with proper session types.
5. Add CI workflow to run `npm ci`, `npm run type-check`, `npm run lint`, `npx prisma generate` and other checks on PRs.
6. Audit API routes for authorization logic coverage and add unit/integration tests for critical paths (auth, application approval, resource allocation).

Files changed (high-level)

- `types/next-auth.d.ts` — NextAuth type augmentations
- `app/api/auth/options.ts` — extracted `authOptions`
- `app/api/auth/[...nextauth]/route.ts` — simplified route importing options
- Multiple `app/api/*/route.ts` files — safer error handling and import fixes

Next steps I can take (pick any) — I can proceed with these automatically:

- Upgrade `eslint-config-next` and `@next/eslint-plugin-next` to patched versions and re-run `npm audit`.
- Open a remote PR (requires push permission and remote configured) with the branch `review/ts-and-security-fixes`.
- Audit API routes for missing authorization checks and add protective middleware or explicit guards.

Actions completed in this run:

- Added integration-test skeletons under `tests/integration/` and a README to guide expansion.
- Updated CI (`.github/workflows/ci.yml`) to run `npm test` in addition to type-check and lint.
- Added a pull-request template at `.github/PULL_REQUEST_TEMPLATE.md`.

Suggested immediate follow-ups:

- Expand integration tests to use `supertest` against a running dev server and add DB fixtures.
- Run a staging deploy and perform manual smoke tests (login, application submission, admin approval).
- Optionally, remove plaintext seed credentials from `prisma/seed.ts` or restrict seed execution.

If you want me to push the branch and open a PR, grant or confirm remote repo access and preferred base branch.
