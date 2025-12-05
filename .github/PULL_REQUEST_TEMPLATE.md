## Summary

Describe the purpose of this PR and the main changes made.

## Changes

- TypeScript fixes and NextAuth typing
- Centralized role checks
- CI: type-check, lint, prisma generate, tests
- Dependency upgrades: eslint, UI libs, etc.

## Verification

- Ran `tsc --noEmit` locally
- Ran `npm test` locally (unit tests)
- Audit: `npm audit` shows no high/critical vulnerabilities after fixes

## Notes

- Some major dependencies were upgraded; please run a staging deploy and smoke tests.

