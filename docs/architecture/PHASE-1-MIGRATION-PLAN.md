# Phase 1A — Forward-only migration and backfill plan

Date: 2026-09-18. **Plan only. No schema, migration, seed, application, dependency or database changes have been made.** Controlling source: [Master](../requirements/FINAL-MASTER-REQUIREMENTS.md) §§1.1–1.4, 2.1, 5, 23–25, 28–33; [foundation design](PHASE-1-FOUNDATION-DESIGN.md) D-01–D-10; [test plan](../testing/PHASE-1-TEST-PLAN.md). Model/change cards M-01–M-33 in the design define the relationships, owner scope, constraints/indexes, privacy/history requirements and rollback risks for every proposed schema/service change.

## MP-01 — Starting point and invariants

Branch `feature/auth-rbac`; initial worktree clean; inspected HEAD `5704dd3`. Keep the applied migration history unchanged:

1. `20260914205402_init_core_hr`
2. `20260914221924_add_auth_rbac`

The user previously verified that database schema was up to date. No live database connection or checksum check occurred in Phase 1A. Neither the historical `20260904195227_phase1_foundation` nor a reconstructed 42-model schema is a migration input. Current source is 11 models / three enums. Four roles and 38 permissions are seed definitions; actual persisted rows, custom grants and employee codes require later protected inspection.

Preserve User/Employee/SalaryHistory IDs, password hashes, email/username identifiers, activation/lockout state, all role/permission links, every employeeCode and original joiningDate. Do not run a reset, destructive DB push, table truncation or mass delete. Do not reseed production or run `prisma/create-super-admin.ts`: it can replace the existing administrator's password and reactivate the account. Existing roles remain records even after authorization stops reading legacy assignments.

This plan expands schema, backfills verified ownership/facts, deploys compatible readers/writers, cuts over one capability at a time and tightens constraints last. No destructive contraction or historical-column removal is included in Phase 1 foundation. Plans for protected-field encryption remain gated on OD-16; they are not smuggled into owner backfill.

## MP-02 — Pre-migration inventory and backup gate

Before any later authorized database mutation, operators must record a protected manifest and a sanitized review summary. No passwords, connection strings, hashes, tokens, employee personal data or backup keys enter repository docs/logs.

| Evidence required | Acceptance before proceeding |
| --- | --- |
| Actual environment | Confirm intended database, engine/version, InnoDB/transaction behavior, SQL mode, collation, timezone configuration, capacity and operational owner without printing secrets; distinguish development, staging and production |
| Migration state | Inspect `_prisma_migrations` entries/checksums and actual tables/FKs against the two checked-in migrations; resolve genuine drift before planning additions; never mark drift resolved just to bypass it |
| Existing records | Counts and protected keyed digests by table/PK; referential integrity; actual role/permission sets and admin assignments; inactive/locked users; Employee codes and historical salary facts |
| Owner mapping | Written confirmation that each in-scope user/master/employee/history row belongs to the first Nexusbyte company; quarantine disputed/unmapped rows. A single-company deployment is not proof every row may be assigned blindly |
| Identity exceptions | Canonical/legacy/reserved code inventory, duplicate-normalization candidates, largest issued serial including external/historical evidence; no emission of real identifiers in ordinary logs |
| History exceptions | Unknown joining/exit dates, salary same-day changes, gaps, inconsistent current salary, missing creator/approval provenance and unverifiable organization dates; no fabricated fixes |
| Restore evidence | Isolated restore of a complete coordinated backup with database constraints and counts/digests checked; restored application can read compatible schema; observed recovery duration recorded |
| Admin recovery | Confirm existing administrator can authenticate in a safe authorized environment and has reviewed target administration grants; approved operator recovery procedure and protected key availability |
| Required decisions | OD-15–18 for production retention/key/hosting/recovery; security settings and per-user grant mapping review; dependent unresolved business policy remains inactive |

Backup coverage must include a transaction-consistent full database snapshot, migration metadata, existing private files/references if any, deployment build/configuration inventory and separately protected signing/encryption material with access controls. Include off-host/off-site encrypted copies and verified integrity. Keys are recoverable through an approved mechanism, not pasted alongside the backup. Inventory records explicitly whether private files currently exist; do not assume their absence from application models proves no files exist.

Define the write freeze or database-native consistent snapshot/PITR procedure, snapshot coordinates and restoration operator. Capture transaction logs or equivalent issued-ID evidence for writes after the backup point. OD-18 must approve acceptable RPO/RTO and destinations before production; no arbitrary objective is invented here. Backups are not accepted until restored and checked (§25). If recovery cannot reconstruct newly issued business IDs or revocations, block those operations after restore until reconciled.

## MP-03 — Forward-only release sequence

The entries are **proposed ordered batches**, not migration directories created now. DDL, data backfill and application activation have separate gates. Migrate deployment applies all pending checked-in migrations: do not ship a later NOT NULL/constraint-tightening batch in the same release before its required backfill has completed.

| Step / slice | Additive schema or application preparation | Backfill / activation | Required exit evidence and stop condition |
| --- | --- | --- | --- |
| A0 / preparation | Freeze reviewed schema/data mapping; implement test fixtures and backup rehearsal in an isolated environment | No business transformation | Test and recovery environments demonstrably separated from production; migration state and backups verified |
| A1 / F1 expand ownership + audit | Add Tenant, Company, CompanySettings, UserCompanyAccess, AuditEvent, neutral PolicyActivation; nullable owner columns on User and six HR tables; supporting owner indexes/unique parent tuples | Create first tenant/company/settings only after identity/owner review; no guessed policy activation | Old code remains compatible with added columns; no existing value/PK/hash/link loss; audit app principal permissions reviewed |
| A2 / F1 owner backfill | Compatible owner-aware service paths; additive composite FKs after verified tuples | Resumable owner backfill parent-first; explicit memberships; old writers paused or constrained to first company during transition | Zero contradictory owner edges; null owners quarantined; dashboard/DTO/isolation tests pass before new company access. No second production company while any old unscoped reader exists |
| A3 / F2 auth expand | Add AuthenticationPolicyVersion, Session, LoginAttempt, PasswordResetChallenge; add User epochs/version/revocation fields; factor interface only, no MFA enrollment | Preserve counters/locks/hashes; deploy dual-hash and database-session-capable code while legacy compatibility enabled | Existing admin/password and login/logout contract verified; old-version writers drained before enabling upgraded hashes/new cookies |
| A4 / F2 auth activate | Enable new session issuance and bounded legacy-cookie materialization; precise deployment cutoff | Lazy bcrypt rehash on verified login; legacy-cookie window expires naturally; revoke persists immediately; reset delivery stays disabled unless approved | Replay/logout/reset/suspension/concurrent-login tests pass; no lost admin; no stateless fallback. Rollback floor is now compatible verifier/session build |
| A5 / F3 RBAC expand/review | Add seven approved role catalogue entries, reviewed bundles and AccessAssignment; preserve Role, Permission, UserRole, RolePermission | Stage proposed assignments inactive; protected per-user old/new permission-scope comparison and review | Every addition/removal explicitly approved; custom/unknown roles remain unresolved exceptions; no implicit sensitive-data or tenant-to-platform elevation |
| A6 / F3 RBAC cutover | Activate reviewed new engine per user; one engine authoritative for that user; all data reads scoped | Confirm admin mapping first, then users in controlled batches; bump authz version/revoke or rotate sessions; preserve source UserRole links | No union with legacy permissions; last authorized administration path retained; denied/unmapped access fails closed, not global |
| A7 / F4 identity/history expand | Add M-07 and M-20–M-30 identity/history structures and nullable Employee projection pointers; retain old fields and SalaryHistory facts | Import verified canonical allocations and explicit legacy aliases; establish reviewed revision/episode facts; no fabricated historical approvals | Exactly-once backfill, intact old code/value snapshots, safe sequence high-water mark and exception report; ambiguous records blocked only from dependent activation |
| A8 / F4 safe write cutover | Deploy history/issuance services and policy-aware writers; no direct mutable-history updates; Employee archive path | Activate approved registration-gated issuance only after namespace reconciliation; history readers use published revision and current-date projection | Concurrency, overlap, non-reuse, no self/circular manager, archive preservation and denied-pending-policy tests pass |
| A9 / F4 deletion/default correction | New reviewed FK replacement to RESTRICT for SalaryHistory and other historical references; new Employee policy defaults false; protected grant/audit delete paths | Preserve existing SalaryHistory values and booleans; legacy flags alone never activate policies | Real DB deletion attempts fail without lost rows. No assumption that a default change changed existing true values. Old seed/bootstrap mutation paths disabled or compatibility-reviewed |
| A10 / F5 tighten and verify | Owner columns NOT NULL only after all relevant rows verified; composite owner FKs and new uniqueness finalized; validated date/status/grant constraints | Stop old writers and complete final reconciliation; retain legacy columns/roles/links | All required rows mapped; no duplicate keys/orphans; signed isolation/admin/history/recovery evidence. If unresolved rows remain, defer affected constraint/cutover rather than assign a fake owner |

Use actual production engine capabilities, not assumed PostgreSQL range exclusions or untested CHECK behavior. Composite FKs, indexes and explicit transactional serialization form the portable baseline. Validate any database CHECK constraints on the selected server/version and test enforcement; server validation still applies. Replacing FKs may take locks and must be rehearsed for duration and failure behavior. MySQL DDL such as ALTER TABLE can commit independently; enclosing a set of DDL operations in an application transaction does not make the whole migration reversible. [MySQL implicit-commit documentation](https://dev.mysql.com/doc/refman/8.4/en/implicit-commit.html).

Within each batch, order parent keys before child foreign keys. A1 AuditEvent may reserve a nullable session-reference column, but its Session FK is added only after Session exists in A3; pre-session events keep that reference null. Likewise, add Company.currentSettings and Employee.currentHistoryRevision pointer constraints after their target tables exist and owner tuples are validated. No circular creation order or placeholder target row is required.

## MP-04 — Backfill rules by existing table

| Existing object | Deterministic safe mapping | Preservation / exception handling |
| --- | --- | --- |
| Department, Designation, Shift | Reviewed first-company owner; retain IDs, names, codes and defaults | Do not lowercase/rename values to satisfy new uniqueness silently; duplicates under new collation create an exception |
| ShiftWeeklyOff | Owner inherited through verified Shift relation | Preserve `(shiftId,dayOfWeek)`; dangling links stop the relevant batch |
| Employee | Owner by reviewed manifest; employeeCode and joiningDate unchanged; nullable canonical businessId only after adoption review | No use of insertion order as employee serial; noncanonical aliases retained; no made-up department/manager/exit dates |
| SalaryHistory | Owner through Employee, preserve old and new Decimal values and original effectiveDate/reason/remarks/PK | No deduplication/deletion; contradictory same-day rows stay facts, but derived SalaryAssignmentVersion activation waits for review |
| User | Add confirmed tenant; preserve IDs, hash bytes, lockout values, active state, login/password times and identifiers | Add verified company memberships; do not infer Employee link from email/name; inactive users stay inactive |
| Role, Permission, UserRole, RolePermission | Preserve global IDs and keys and all old links; reviewed new assignments reference source links | Seed catalogue is not proof actual DB contains exactly four roles/38 permissions. Preserve additional real rows and assess them explicitly |

For employment history, record a revision containing only evidenced validity. A known original joiningDate can begin a known episode, but today's department/salary/shift must not be projected back to it without evidence. For exited records without a known exit date, preserve an unresolved imported episode and deny new overlapping employment/eligibility until reviewed. Do not create fake dates to satisfy a constraint. Current salary snapshots inconsistent with salary history require explicit adjudication; never use last PK as an approved chronological winner.

For identity sequence initialization, reserve every verified canonical ID and any approved historical reservation before opening issuance; set high-water at least as high as every issued/reserved serial. Zero is valid only for an empty verified namespace. Existing already-canonical employeeCode is imported without renumbering, with provenance indicating migration adoption rather than a newly invented historic approval. Any newly assigned canonical ID for a legacy Employee requires authorized adoption approval and is added alongside the retained legacy employeeCode.

## MP-05 — Resumability and concurrent writers

Backfills use bounded transactions, stable PK ordering and deterministic source-to-target keys. Each batch has a protected manifest version, source range, input digest, expected count, inserted/matched/conflicting count and completion evidence. Target uniqueness prevents duplicates when a batch commits but its acknowledgement is lost. On retry, match the existing row to expected source values; a mismatch stops the batch rather than overwriting it. A protected operational manifest is sufficient; no extra application MigrationCheckpoint model is proposed.

Maintain separate DDL completion, data completion and application activation records. An unrecorded checkpoint never means data may be inserted twice. Row-count equality alone does not prove values survived: compare keyed digest/value invariants in the protected environment, output only sanitized totals and pass/fail results. Hashes/digests of credentials or predictable personal identifiers are not emitted as public evidence.

The initial workforce favors a scheduled bounded maintenance window over complex prolonged dual writes. During owner/history final backfill, pause relevant admin/import/seed writes, finish a final delta check and atomically activate new writer paths. If availability requires dual writes later, first implement transactionally consistent old/new projections with divergence detection and prove every writer participates; that is additional scope, not assumed here.

Auth can continue only through the compatible build once epochs/sessions/hash upgrades matter. Drain old replicas before A4 so an old login request cannot overwrite counters or mint untracked tokens after cutoff. Durable session revocation and credential replacement may never be bypassed by routing to an old instance. Background jobs, scripts and administrative clients count as writers too.

## MP-06 — Command boundaries for later implementation

**None of the following Prisma/build/test commands ran in Phase 1A.** They describe a future reviewed execution plan using the project's pinned Prisma 7 installation, not latest-global CLI behavior. The installed [Prisma CLI skill](../../.agents/skills/prisma-cli/SKILL.md) and its `references/migrate-dev.md` / `references/migrate-deploy.md` were consulted. Do not adopt newer Prisma-major workflow commands or change dependencies as part of this plan.

| Future command | Allowed target and purpose |
| --- | --- |
| `npx prisma validate` | Future schema validation; loads protected config; never print secrets |
| `npx prisma migrate dev --create-only --name phase1_owner_expand` | Only isolated developer database and dedicated shadow database, after future schema approval; example name, not an existing migration. This is not a pure read-only command; drift/reset prompts must stop the process |
| `npx prisma migrate status` | Protected read-only history inspection on the explicitly verified target; record sanitized result |
| `npx prisma migrate deploy` | Reviewed pending SQL only, first on representative isolated restore and staging, then separately authorized target. Applies all pending migrations, not just the next desired gate |
| `npx prisma generate` | Explicit client generation in the future implementation workspace/build; do not assume migrate deploy generates client |
| `npm run lint`, `npx tsc --noEmit`, `npm run build` | Future implementation static/build gates, plus the actual tests established by the test plan |

Do not run `prisma migrate reset`, `prisma db push`, destructive flags, production `migrate dev`, seed/bootstrap or `npm audit fix --force`. No `migrate resolve` is a normal step: a failed migration requires inspecting actual partial effects, a reviewed repair and proof of the final state before any truthful resolution marker. Never edit an already applied migration or falsely label unapplied SQL as applied. A tooling reset prompt is a stop condition, not permission.

## MP-07 — Rollback floors and forward repair

| Failure boundary | Safe response | Unsafe response explicitly excluded |
| --- | --- | --- |
| Before any later DB change | Stop; revise design or restore only documentation edits | Changing live data to make assumptions true |
| Additive DDL partly applied | Pause release, inventory actual constraints/tables, compare to manifest; finish with reviewed forward repair and correct migration accounting | Assume transaction rollback undid every DDL statement; delete old migration metadata |
| Partial owner backfill | Keep affected new paths disabled, resume idempotently or append reviewed correction mapping under write pause | Blindly assign all nulls to company 1 or reparent live history without review |
| After first Argon2id hash or persistent revocation | Roll forward or deploy a prevalidated build supporting both hashes, persistent state and epochs | Restore bcrypt-only/stateless app, overwrite hashes from backup, reset admin password through bootstrap |
| RBAC mapping error | Disable affected new assignments, preserve evidence and issue corrected reviewed grants; retain verified administration path | Re-enable broad legacy grants automatically or delete source roles/links |
| ID issued or history revision published | Preserve allocation/high-water and old revision; append correction/superseding revision with reason | Decrement counter, reuse/reassign code, delete history or alter original joiningDate |
| Ownership/history constraints tightened | Use compatible application or forward repair retaining constraints/data | Run old writer that omits owner/revision checks or expects cascades |
| Severe corruption requiring restore | Restore into isolation first, reconcile DB/private files/config/keys and post-backup writes, then planned controlled switch | Restore over live writes without reconciliation or call an untested backup a rollback |

After any restore, revoke pre-restore bearer capabilities with fresh session epoch/signing-material strategy before reopening authentication; expired/reset tokens and revoked grants must not resurrect. Reconcile committed employee allocations beyond the restore point or hold issuance until the non-reuse guarantee is demonstrable. Revalidate admin access using the existing credential path or the approved recovery process, never disclose/reset credentials in a migration log. Compare employee and salary-history counts/content, owner links, role mappings and audit continuity before reopening writes.

For this Phase 1A delivery itself, rollback is documentation-only: the three new design/plan files and the explicit matrix addendum are the only intended changes. No database recovery action is needed now.

## MP-08 — Go/no-go evidence

Proceed to a later implementation slice only with exact approved scope and reviewed SQL/application changes. Its release gate requires: backup/restore evidence, known actual DB engine and migration state, owner mapping, admin preservation, complete applicable [tests](../testing/PHASE-1-TEST-PLAN.md), no unexplained preservation differences, reviewed per-user privilege changes, safe pending-policy behavior, no secrets in logs, and a proven compatible fallback build. Dependency audit findings remain unresolved until advisory-level triage and reviewed remediation; Phase 1A does not reduce the recorded six vulnerabilities.

Unresolved OD-01–14 do not stop neutral owner/session/history structure, but they stop dependent payroll/HR policy activation. OD-15–18 and reset/MFA operational decisions block their production-specific capabilities. Record exceptions narrowly and preserve evidence; do not declare all Phase 1 complete merely because A1 tables exist.
