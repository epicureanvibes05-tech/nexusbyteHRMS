# Requirement reconciliation — Phase 0

Date: 2026-09-18. Scope: §30, “Phase 0 — Governance and baseline” only. Controlling source: [FINAL-MASTER-REQUIREMENTS.md](FINAL-MASTER-REQUIREMENTS.md). The user's explicit documentation-only limit governs this delivery; later phases are recommendations, not authorization to implement them.

The Master was read completely with `AGENTS.md`. Its §1.3 states: “These are status claims, not a substitute for repository evidence. Verify them.” Current source evidence supersedes historical completion claims, not approved business requirements. Latest explicit approved decisions prevail under §1.4. The identical `.md.md` copy is preserved but is not a separate authority.

## Deliverables and evidence

| Deliverable | Purpose | Status |
| --- | --- | --- |
| This report | Reconciliation, conflicts and next safe boundary | COMPLETE_AND_VERIFIED |
| [Traceability matrix](TRACEABILITY-MATRIX.md) | Source-preserving requirement register and evidence profiles | COMPLETE_AND_VERIFIED |
| [Open decisions](OPEN-DECISIONS.md) | All 21 §29 decisions; dependent production gates | COMPLETE_AND_VERIFIED |
| [Current baseline](../architecture/CURRENT-BASELINE.md) | Architecture, routes, models, migrations and recovery precautions | COMPLETE_AND_VERIFIED |
| [Threat model](../security/THREAT-MODEL.md) | Current and future trust boundaries, controls and acceptance checks | COMPLETE_AND_VERIFIED |
| [Baseline validation](../testing/BASELINE-VALIDATION.md) | Supplied command results, review checks and test absence | COMPLETE_AND_VERIFIED |

These statuses apply to documentation delivery only. No application module is certified complete under §§31–32. Lint, type-check and build success are not functional, authorization, isolation or recovery tests.

## Historical baseline conflict

| §1.3 reported checkpoint | Current evidence | Finding |
| --- | --- | --- |
| “Prisma foundation: 42 models and 22 enums.” | 11 models / 3 enums in `prisma/schema.prisma` | CONFLICT_FOUND |
| Migration `20260904195227_phase1_foundation`; 42 tables, 75 foreign keys, 41 unique constraints, 62 indexes | Only `20260914205402_init_core_hr` and `20260914221924_add_auth_rbac`; SQL creates 11 tables | CONFLICT_FOUND |
| Tenant/company, NBSO settings, policy defaults, 21 permissions, 7 roles, Argon2id administrator, 7 document categories | Seed defines 38 permissions / 4 roles; separate bcrypt bootstrap; no tenant/company/settings/document categories | CONFLICT_FOUND |
| Environment validation uses Zod and has tests | Zod login validation; environment presence checks; no environment-schema test suite found | CONFLICT_FOUND |
| Hardened `.gitignore` and `.env.example` | `.gitignore` excludes `.env*`, generated Prisma and build output; `.env.example` absent | PARTIALLY_COMPLETE |
| Zero npm audit vulnerabilities | Supplied current result: 6 (1 moderate, 5 high) | CONFLICT_FOUND |

Do not manufacture the historical foundation or declare current data missing merely from that checkpoint. Preserve existing migrations and confirm actual environment state before future migration work.

## Critical conflict register

All entries remain unresolved; recording them is not remediation.

| ID / Master source | Evidence and impact | Required disposition / dependency | Status |
| --- | --- | --- | --- |
| C-01 / §§1.3, 24 | `src/lib/auth.ts`, `prisma/create-super-admin.ts`: bcrypt instead of required Argon2id | Plan backward-compatible verification/rehashing and privileged-session handling; no hash changes in Phase 0 | CONFLICT_FOUND |
| C-02 / §§3–3.2 | Four seed roles differ from the seven approved roles; finance/payroll and attendance operator are current roles rather than approved bundles; broad SUPER_ADMIN grants | Explicit migration mapping and permission/scope/field review, preserving valid assignments and avoiding privilege escalation | CONFLICT_FOUND |
| C-03 / §§3.1, 4, 24, 28.18 | No Tenant/Company models or owner keys; dashboard queries global employee counts | Boundary foundation and negative cross-company tests before protected data operations | CONFLICT_FOUND |
| C-04 / §§22.2, 23–24, 28.28 | No persistent Session/LoginAttempt history; JWT logout deletes cookie only | Persist session lifecycle and attempts, revoke on logout/disable/reset/exit; test stolen-token replay | CONFLICT_FOUND |
| C-05 / §§2.3, 9.4–9.6, 11, 14.5, 29 | Employee savings, punctuality, leave, half-day, absence, dock and other-fine booleans default true in schema and initial SQL | Prevent pending policies activating financial behavior; approve OD-01–14 as applicable. No payroll calculation implementation was found, so actual deductions are not alleged | CONFLICT_FOUND |
| C-06 / §§2.1, 5.4, 13.1, 23 | SalaryHistory employee relation and initial SQL use cascade deletion | Protect historical rows with a new reviewed migration, archive semantics and deletion-preservation tests | CONFLICT_FOUND |
| C-07 / §§5.2, 8.2, 24, 29.16 | Sensitive Employee columns exist without final encryption/masking design | OD-16 key custody/rotation/recovery design; field-access matrix and safe redaction; no plaintext personal data in evidence | CONFLICT_FOUND |
| C-08 / §§1.3, 28, 31–32 | No automated tests, test runner or test script found | Establish focused behavioral and security tests in a later authorized phase; no test-pass claim now | CONFLICT_FOUND |
| C-09 / §§1.3, 24, 31 | Current supplied audit result: 6 vulnerabilities (1 moderate, 5 high) | Obtain advisory-level triage, direct/transitive and runtime exposure, then reviewed compatible remediation; never `npm audit fix --force` | CONFLICT_FOUND |
| C-10 / §§3.1, 22.1, 24 | Dashboard requires active login but not employee-view permission/scope; role permissions loaded but not enforced there | Server-side authorization and scope checks with denial tests | CONFLICT_FOUND |
| C-11 / §§23–24 | No explicit CSRF verification in auth handlers; raw login error logged; no audit/security-event model | Define CSRF defenses, safe error logging and append-only redacted events; verify against actual deployment | PARTIALLY_COMPLETE |

## Approved role catalogue

Section 3 remains controlling: **Tenant Administrator**, **Company Administrator**, **HR Administrator**, **HR Officer**, **Manager**, **Employee**, **Auditor / Read-only**. No automatic sensitive-field access or platform administration follows from a tenant role. Existing `SUPER_ADMIN`, `HR`, `FINANCE_PAYROLL`, `ATTENDANCE_OPERATOR` must not be silently renamed, elevated or deleted. The approved target catalogue is not an open question; mapping existing assignments and evaluating excess privileges is later implementation work.

## Completion, gaps and genuine blockers

The repository provides partial employee/organization/shift schema, salary-history records, local sign-in, cookie sessions, RBAC tables/seed and a basic dashboard. Recruitment, workflow approvals, documents, audit, full attendance/leave/payroll, talent, assets, exit, exports, private storage and production operations are absent as executable workflows. The [matrix](TRACEABILITY-MATRIX.md) preserves every source section and source clause, including all 30 §28 acceptance scenarios.

[OPEN-DECISIONS.md](OPEN-DECISIONS.md) distinguishes dependent production gates from safe neutral design. Argon2id, the seven-role catalogue, tenant/company isolation, immutable history, test requirements and prohibition on public signup are already requirements; they do not require policy reinvention. Legal/policy values, key management and production infrastructure are genuinely unresolved. None prevents Phase 0 documentation.

## Recommended next smallest safe milestone — not implemented

Recommend an initial Phase 1 slice for tenant/company ownership and server authorization, with a focused test foundation, before broader employee or payroll functionality. Acceptance criteria: explicit NBSO ownership mapping; owner-bound unique constraints; approved role mapping without automatic sensitive-data access; deny unauthenticated, inactive, unauthorized and cross-company reads/mutations; scope dashboard counts; exercise two companies in tests; retain all existing employee/salary/user history; keep unapproved deductions inactive; produce migration/backfill/recovery evidence and lint/type/build results. Pending encryption decisions must block sensitive-data activation, not neutral owner-bound structures.

Expected future change areas: `prisma/schema.prisma`, a new migration, reviewed `prisma/seed.ts`, server authorization helpers, `src/app/dashboard/page.tsx`, test configuration/fixtures and focused authorization/isolation/migration tests. Potential model changes include Tenant/Company ownership and scoped role assignments. Exact code design and any test dependencies belong to the next authorized phase. Existing auth routes, password/session implementation and production rollout are separate controlled slices; their critical conflicts remain gates, not silently accepted risks.

Verification and rollback must follow the [baseline migration safeguards](../architecture/CURRENT-BASELINE.md) and §§28, 31–32. No current application, Prisma schema, migration, seed, dependency, lockfile, database, auth, route, page or UI change was made. No commit or push is part of this work.
