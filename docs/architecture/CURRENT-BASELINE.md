# Current repository baseline — Phase 0

Review date: 2026-09-18. Branch: `feature/auth-rbac`.

Controlling source: [Final Master Requirements](../requirements/FINAL-MASTER-REQUIREMENTS.md), especially §§1.1–1.4, 24–26, 30–33. `AGENTS.md` was read completely. No application code is being written; its requirement to read the installed Next.js guides applies before future code changes.

## Evidence boundaries

The user supplied a verified operational baseline. This review independently inspected repository files and installed versions without connecting to the database, running seeds, or executing authentication. Database migration status is user-verified evidence, not inferred from the schema. The initial status was `?? docs/`; tracked files had no staged or unstaged changes. The two pre-existing source files `FINAL-MASTER-REQUIREMENTS.md` and `FINAL-MASTER-REQUIREMENTS.md.md` have identical SHA-256 `5E2DC79D37CB2E1F8784CA37F2FB6A8183EEE7A0797366CF52463A0426125E52`. Both are preserved; the exact `.md` path is authoritative.

## Stack and topology

| Component | Observed version / evidence |
| --- | --- |
| Node / npm | 24.19.0 / 11.17.0; `node --version`, `npm --version` |
| Next.js / React / React DOM | 16.3.5 / 19.2.8 / 19.2.8; `package.json`, `npm ls --depth=0` |
| Prisma / client / MariaDB adapter | 7.10.0 / 7.10.0 / 7.10.0; installed dependency listing |
| Authentication libraries | bcryptjs 3.0.3, jose 6.2.12, Zod 4.6.5 |
| TypeScript | 5.9.3 |
| Database | Prisma `mysql` provider; MariaDB adapter. Actual server product/version and production topology not established |

Browser → Next.js App Router pages and route handlers → auth/session helpers → Prisma client → MySQL/MariaDB-compatible database. This is the observed application boundary, not a verified production deployment. `src/lib/prisma.ts` constructs the adapter from protected configuration and uses a development singleton. `prisma.config.ts` declares the schema, migrations and seed entry point. No private storage service, worker, device connector or email provider implementation was found.

## Route and service inventory

| Path | Evidence / current behavior |
| --- | --- |
| `/` | `src/app/page.tsx`: Next.js starter content |
| `/login` | `src/app/login/page.tsx`: client login form |
| `POST /api/auth/login` | `src/app/api/auth/login/route.ts`: JSON input, `loginUser`, response; raw error logging in catch |
| `POST /api/auth/logout` | `src/app/api/auth/logout/route.ts`: deletes browser session cookie |
| `/dashboard` | `src/app/dashboard/page.tsx`: signed session and active-user check, role display, four global employee counts; no permission/company filter |
| Authentication | `src/lib/auth.ts`: Zod login validation, bcrypt comparison, account counter/lockout at five failures for 15 minutes, role/permission loading |
| Sessions | `src/lib/session.ts`: eight-hour HS256 signed JWT, subject/issuer/audience validation; HttpOnly, SameSite=Lax, Secure in production cookie |

No public registration route was found. This does not prove all enrollment, access or security requirements complete. Role permissions are loaded but there is no general scope/field authorization layer. Inactive role filtering is not evident. User deactivation blocks the dashboard, but cookie deletion and that check do not provide persistent session revocation; `passwordChangedAt` is not checked against token issuance.

## Data and migration inventory

`prisma/schema.prisma` contains exactly 11 models: `Department`, `Designation`, `Shift`, `ShiftWeeklyOff`, `Employee`, `SalaryHistory`, `User`, `Role`, `Permission`, `UserRole`, `RolePermission`.

The three enums are `EmployeeStatus`, `SalaryType`, `DayOfWeek`. Employee status currently has six values. Employee code is unique, but an approval-gated, concurrency-safe `NBSE-0001` issuance service is absent. Salary uses `Decimal(12,2)` and salary history has an effective date; neither establishes complete payroll or immutable history.

| Migration directory | SQL evidence |
| --- | --- |
| `20260914205402_init_core_hr` | Creates six HR tables and their constraints; includes enabled Employee policy defaults and SalaryHistory `ON DELETE CASCADE` |
| `20260914221924_add_auth_rbac` | Creates five authentication/RBAC tables and linking constraints |

The supplied `prisma migrate status` result is “database schema up to date.” No production rows, migration checksums or live grants were inspected. There is no `20260904195227_phase1_foundation` migration in this checkout. See [reconciliation](../requirements/RECONCILIATION-REPORT.md) for the historical conflict.

`prisma/seed.ts` defines four roles (`SUPER_ADMIN`, `HR`, `FINANCE_PAYROLL`, `ATTENDANCE_OPERATOR`) and 38 permission keys. These are source definitions, not a live database role count. Permission names for future modules do not establish implemented modules. `prisma/create-super-admin.ts` separately performs environment-driven bootstrap with bcrypt cost 12; rerunning it can replace an existing password and reactivate the account. Neither script was executed.

No Tenant, Company, Session, LoginAttempt, AuditLog, document, approval, attendance-event, leave-ledger or payroll model exists. Current sensitive Employee fields include identity, address, contact and salary information without a final field encryption/masking design. No bank/tax profile model is present.

## Migration and recovery safety

Phase 0 introduces no migration or database operation. Preserve both existing migration directories and all valid data. Never substitute the historical foundation migration, reset the database, rewrite applied migrations or rerun seed/bootstrap as reconciliation.

For a later approved foundation slice: capture protected database/file backups, verify restoration in isolation, inspect actual migration history and representative data, add owner boundaries with staged nullable additions/backfill/validation before mandatory constraints, and review foreign-key effects. Owner assignment must be explicit and checked; never infer it from arbitrary IDs. Replace risky deletion behavior only through a new reviewed migration and preservation tests. Existing password hashes require a compatible transition plan, not bulk unusable replacements. Retain old role assignments until an explicit mapping and access review exist.

Application rollback must remain compatible with additive schema changes. Destructive schema rollback is not presumed safe; use a rehearsed forward repair or protected restore with reconciliation of subsequent writes. Database, files and configuration must be restored consistently. RPO/RTO, key recovery and destination approval remain OD-16–18. No recovery rehearsal is claimed.

Phase 0 rollback: remove only the six newly authored documents if requested; preserve both pre-existing Master files and all unrelated changes. No data rollback is necessary.
