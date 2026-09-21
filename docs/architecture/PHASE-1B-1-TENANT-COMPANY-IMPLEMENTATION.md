# Phase 1B.1 — Tenant / Company foundation implementation

Latest update recorded 2026-09-22: following the [disposable-clone rehearsal](../testing/PHASE-1B-1-MIGRATION-REHEARSAL.md), the user reports successful deployment to real development `nexusbyte_hrms`, three migrations/up-to-date status, all three new tables present and lint/type-check/build passes. See [development deployment evidence](../testing/PHASE-1B-1-DEV-DEPLOYMENT.md) for the fresh backup and verification scope. This is not production deployment. No foundation business rows have been backfilled; Phase 1B.2 will handle controlled, idempotent NexusByte tenant/company/settings backfill. Creation-time and rehearsal-only results below remain historical.

Date: 2026-09-21. Branch: `feature/phase1-foundation`; working tree was clean before this slice. Authority: [Master](../requirements/FINAL-MASTER-REQUIREMENTS.md) preamble, §§2.1, 4, 24 and 30; [design](PHASE-1-FOUNDATION-DESIGN.md) D-02/M-01–M-03; [migration plan](PHASE-1-MIGRATION-PLAN.md) MP-03/A1; latest user instruction limits implementation to three models and one create-only migration. This is a subset of A1, not completion of F1 or Phase 1. Product status: PARTIALLY_COMPLETE.

## Files and schema

Changed files:

- `prisma/schema.prisma`
- `prisma/migrations/20260921180023_phase1_tenant_company_foundation/migration.sql` (new)
- `docs/requirements/TRACEABILITY-MATRIX.md`
- `docs/architecture/PHASE-1B-1-TENANT-COMPANY-IMPLEMENTATION.md` (this record)

Exactly three models added: **Tenant**, **Company**, **CompanySettings**. Schema now has 14 models and the same three enums. Existing 11 model definitions, old migrations and all application definitions are unchanged. Generated Prisma client/build artifacts are ignored by Git; generation does not apply schema to a database.

All new IDs follow the repository's Int/autoincrement convention. Tenant and Company have display names, `isActive`, `createdAt` and `updatedAt`. Settings have an explicit integral `version`, timezone, three-character currency, date-only `validFrom`/nullable `validTo` and recording timestamp. No guessed legal/company/payroll/HR policy fields or values were added. Identity, timezone and currency have no implicit baseline defaults: later reviewed insertion supplies `nexusbyte-solutions`, `Nexusbyte Solutions`, `NBSO`, `Asia/Karachi` and `PKR` explicitly. No effective date is invented.

| Model | Unique constraints in addition to primary key | Query indexes |
| --- | --- | --- |
| Tenant | `slug` | `isActive` |
| Company | `(tenantId, code)`; `(tenantId, id)`; `(tenantId, id, currentSettingsId)` | `(tenantId, isActive)` |
| CompanySettings | `(tenantId, companyId, id)`; `(tenantId, companyId, version)` | `(tenantId, companyId, validFrom)` |

Relations (all `ON DELETE RESTRICT ON UPDATE RESTRICT`):

1. `Company.tenantId` → `Tenant.id`, with `Tenant.companies` inverse.
2. `CompanySettings.(tenantId, companyId)` → `Company.(tenantId, id)`, with `Company.settings` history inverse.
3. Nullable `Company.(tenantId, id, currentSettingsId)` → `CompanySettings.(tenantId, companyId, id)`, with `CompanySettings.currentForCompany` inverse. The complete tuple prevents a current pointer naming another company's settings. The referencing unique tuple expresses the Prisma one-to-one relation; owner-prefix unique/index keys also support FK lookup.

The nullable pointer permits parent-first creation without fake settings: Company with null pointer, then owned settings, then pointer publication in a later controlled transaction. CompanySettings ownership implies Tenant ownership through Company; no redundant independent tenant FK can disagree with the company. Existing Employee, User, Department, SalaryHistory and other models acquire no owner columns or new relations in this slice.

## SQL review and database boundary

Generated exactly one migration with `npx prisma migrate dev --create-only --name phase1_tenant_company_foundation`. Full SQL inspected at `prisma/migrations/20260921180023_phase1_tenant_company_foundation/migration.sql`:

- Three CREATE TABLE statements, with three primary keys, six unique indexes and three non-unique indexes.
- Three ALTER TABLE ADD CONSTRAINT FOREIGN KEY statements, only against the newly created Company/CompanySettings tables after all target tables exist.
- Every operation is additive. No DROP, destructive ALTER, rename, INSERT, UPDATE, DELETE, backfill, existing-table operation or unexpected operation.
- All new relations restrict deletion/update; no new cascading action. Existing SalaryHistory cascade remains a separate known conflict.

**At the original create-only checkpoint, the migration was NOT applied to development. It has since been deployed there, as recorded above.** Before generation, both old migrations were applied and Prisma reported the database up to date. After generation, Prisma found three migration files and reported only `20260921180023_phase1_tenant_company_foundation` pending (expected exit 1). Create-only uses the dedicated shadow database for Prisma's workflow; that is not application to development or a migration rehearsal on representative data. Configured database names were checked as distinct without displaying connection values.

The user reports a verified pre-migration SQL backup outside the repository. No backup file was copied, opened or independently restored in this slice. No database row insertion/backfill, seed, reset, db push, role/password change or application activation was performed. No environment contents or secrets are included here.

## Commands and validation

| Command | Observed result |
| --- | --- |
| `git status --short` (entry) | Empty, clean tree |
| `git branch --show-current` | `feature/phase1-foundation` |
| `npx prisma migrate status` (preflight) | Exit 0; two migrations; database schema up to date |
| `npx prisma validate` (before generation) | Exit 0; schema valid |
| `npx prisma migrate dev --create-only --name phase1_tenant_company_foundation` | Exit 0; exactly one new migration generated, not applied |
| `npx prisma format` | Exit 0; schema formatted |
| `npx prisma validate` (after formatting) | Exit 0; schema valid |
| `npx prisma generate` | Exit 0; Prisma Client 7.10.0 generated into `src/generated/prisma` |
| `npx prisma migrate status` (after generation) | Exit 1, expected; only the new migration pending |
| `npm run lint` | Exit 0; no diagnostics |
| `npx tsc --noEmit` | Exit 0; no diagnostics |
| `npm run build` | Exit 0; Next.js 16.3.5/Turbopack compiled, TypeScript completed, 8/8 static pages generated and page optimization finished |

Sandboxed migration-status attempts (`npx prisma migrate status` and diagnostic `node node_modules/prisma/build/index.js migrate status`) failed to spawn the schema engine with EPERM; the permitted retry outside that restriction produced the successful preflight above. No schema-engine failure was bypassed by altering migration state. Installed dependencies were used; no package upgrade or install occurred.

No automated test suite exists, and no automated tests are claimed passed. During the original implementation slice, no database migration, foreign-key enforcement, duplicate-key rejection, isolation, concurrency, UAT or restore tests were run. The later user-reported restore/deployment rehearsal and FK metadata checks are recorded separately in the linked rehearsal evidence; they do not complete the broader [test-plan](../testing/PHASE-1-TEST-PLAN.md) gates.

Static preservation review passed: the complete schema prefix before `model Tenant` matches HEAD (line endings normalized), so all original model/enum definitions are intact. Git comparison found no changes to either old migration, `migration_lock.toml`, `package.json`, `package-lock.json`, `prisma/seed.ts` or tracked `src` files. Exactly one new migration file exists. Full SQL review and statement-count screening agree on the six additive statements above. `git diff --check` passed. These are artifact checks, not an automated application test suite.

## Remaining risks and next controlled step

Schema structure alone does not enforce append-only settings, immutable slugs/codes, positive versions, valid timezone/currency identifiers, ordered/non-overlapping validity, approved publication or current-pointer applicability. These need a later authorized validation/publication/audit service, concurrency control, restricted database grants and real-database tests. DATETIME recording fields do not themselves establish a UTC database connection. Nullable current settings are intentional during staged creation; future consumers must reject incomplete configuration.

Existing application authorization and HR records are still unscoped. Do not expose another company through current application paths. Settings are not consumed by the application yet. Existing bcrypt/role/session/security gaps, SalaryHistory cascade, policy booleans, encryption decisions and baseline six audit vulnerabilities remain unresolved; no dependency audit rerun or remediation is claimed. All §29 decisions retain their existing status.

Next (after reported development deployment, 2026-09-22): Phase 1B.2 controlled, idempotent NexusByte tenant/company/settings backfill, with post-deployment verification evidence captured in the linked deployment record before backfill execution. Production compatibility and broader behavioral tests remain unproven. In that separate reviewed backfill, resolve Tenant by slug and Company by `(tenantId, code)`, verify identity rather than assume ID 1, insert the approved timezone/currency settings with a reviewed validity date/version, and publish the same-company pointer transactionally. Existing HR/User ownership mapping, nullable expansion, explicit memberships and scoped application services require their own later slice; no automatic reassignment or seed rerun.

The migration is now reported applied in real development and the disposable clone: preserve the migration file/history and use a new forward repair; do not edit applied SQL or drop new tables containing history. No rollback was performed by this documentation task. MySQL DDL may partially commit: inventory actual tables/constraints before repair. Severe failure requires the protected backup restored into isolation and reconciliation before any controlled switch; never restore over live writes casually. Existing application code remains unchanged; deployment and static/build results do not establish application behavior through runtime tests.
