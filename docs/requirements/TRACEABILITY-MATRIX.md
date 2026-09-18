# Traceability matrix — Phase 0

Date: 2026-09-18. Controlling source: [FINAL-MASTER-REQUIREMENTS.md](FINAL-MASTER-REQUIREMENTS.md), read completely with `AGENTS.md`. This register preserves source headings and every nonblank source clause, including contextual text and acceptance lists. Source list markers are preserved. Source hash and observed evidence are in [CURRENT-BASELINE.md](../architecture/CURRENT-BASELINE.md).

Phase 1A update: the original Phase 0 register below is retained as a historical implementation assessment. The user's later authorization permits foundation technical design and migration/test planning only; see the [Phase 1A design addendum](#phase-1a-design-addendum). No product status or original source clause is changed by completing design documents.

## Status vocabulary and record interpretation

Allowed statuses only: `COMPLETE_AND_VERIFIED`, `COMPLETE_BUT_NEEDS_IMPROVEMENT`, `PARTIALLY_COMPLETE`, `NOT_STARTED`, `BLOCKED_BY_DECISION`, `BLOCKED_BY_EXTERNAL_DEPENDENCY`, `DEFERRED_WITH_REASON`, `CONFLICT_FOUND`. No status must be used merely to fill the vocabulary. `NOT_STARTED` describes absent implementation, not a decision to abandon scope. `BLOCKED_BY_DECISION` blocks only dependent production behavior.

Each MR record consists of its source clause below **plus its referenced P profile and the shared fields in this paragraph**; these are part of every record, not optional reading. ID is MR-section-sequence; title is its exact source heading plus source clause. Business purpose and security/data/history impact are the profile impact/purpose column. Source/decision precedence is the named Master section, §1.4 latest explicit approved decisions, and the user’s Phase 0-only limit. Current evidence, gap, dependencies and implementation phase are in P. Acceptance criteria are the complete verbatim clause in its surrounding source section, relevant §28 scenarios, and every applicable §32 condition; contextual/reporting lines do not become new product requirements. Test evidence for all product records: **no automated tests exist**, with only supplied static/build/migration results in [BASELINE-VALIDATION.md](../testing/BASELINE-VALIDATION.md). Documentation records use source/link/status/preservation review only. Migration/rollback for every record: no Phase 0 data change; future schema work uses new reviewed Prisma migrations, staged backfill, history preservation and tested recovery as specified in [CURRENT-BASELINE.md](../architecture/CURRENT-BASELINE.md); non-schema work requires compatible application rollback.

Owner: proposed domain stakeholder in OPEN-DECISIONS where applicable, otherwise engineering/HR for assignment; not an invented approval. Priority: critical conflicts C-01–10 before dependent rollout, otherwise §30 delivery order. Decision state: approved Master requirement unless explicitly pending §29 or proposed wording. Release: Phase 0 documentation only, no application release. Change history: initial reconciliation 2026-09-18; preserve IDs and append future evidence/decision changes rather than silently dropping clauses.

Per-clause statuses are conservative assessments of the requirement in context. Existing fields and permission names alone never establish completed workflows. P profiles summarize a domain; a row can be NOT_STARTED despite related partial scaffolding. Historical claims are CONFLICT_FOUND where contradicted. Full documentation completion is distinguished from product completion.

## Evidence profiles

| Profile | Implementation phase | Current implementation evidence | Gap / defect | Business purpose and security/data/history impact | Dependencies |
| --- | --- | --- | --- | --- | --- |
| P0 | 0–8 | package.json; schema; login routes; CURRENT-BASELINE.md | Stack present; identity/company settings, private deployment, storage and exports incomplete | Private company identity, confidentiality and consistent regional handling | Foundation; OD-17, OD-21 |
| P1 | 0 | AGENTS.md; all six Phase 0 documents; schema, SQL, seed, source inspection; supplied validation | Historical claims conflict; application test and implementation gates remain unmet | Preserve valid work, avoid unsafe changes and unsupported completion claims | C-01–09; subsequent authorized phases |
| P2 | 0–8 | Governance documented here; no policy/history/workflow engine | Operational governance and versioned enforcement not implemented | Due process, legal approval, immutable history and least privilege | OD-01–16; HR/legal owners |
| P3 | 1 | prisma/seed.ts; Role, Permission, UserRole, RolePermission; src/lib/auth.ts; dashboard | Four current roles conflict with seven approved roles; no scope/field guard or segregation workflow | Prevent privilege escalation, cross-scope access and self-approval | C-02–03, C-10; OD-14 |
| P4 | 1–2 | Department, Designation, Shift, ShiftWeeklyOff in schema and initial migration | Tenant/company and other masters absent; no effective-dated/audited maintenance | Owner-bound uniqueness and preservation of historical labels/references | C-03; organization mapping |
| P5 | 1–2 | Employee and SalaryHistory; initial migration; no employee service/routes/tests | Partial scalar fields/statuses; no full lifecycle, approval-gated ID issuance, rehire or effective-dated assignments | Protect identity, access dates and employment/salary history | C-03, C-05–07; OD-03, OD-12–16 |
| P6 | 6 | No recruitment model/service/route in source inventory | Recruitment workflow and candidate retention absent | Candidate privacy, evidence, consent and hiring accountability | Foundation; OD-15 |
| P7 | 2, 6 | Employee.probationMonths defaults to 2; probationEndDate; no onboarding service | No plans, reminders, evaluation/approval or transition workflow | Prevent unsupported automatic employment decisions | Employee lifecycle; HR-approved configuration |
| P8 | 1–2 | No document/category/version/policy model or service; permission names only | Private storage, validation, versions, acknowledgements and audit absent | Private document access and immutable policy evidence | OD-15–17; foundation |
| P9 | 3 | Shift and ShiftWeeklyOff; Employee.shiftId and policy flags; no raw attendance service | No roster/history/raw events/calculation/correction/locking; unsafe pending-policy defaults | Prevent inaccurate hours, duplicate penalties and silent paid-period changes | C-05; OD-07–09; timezone and policy versioning |
| P10 | 3 | No adapter, ingestion endpoint, connector or mock tests | All connector and raw-event capabilities absent; real device selection pending | Authentic, replay-safe, loss-visible attendance without biometric templates | OD-19 for real integration; mock architecture independent |
| P11 | 4 | Leave permission keys only; no leave model/service | No policies, balances, approval/calendar or overlap/deduction controls | Correct entitlements, privacy and no double deductions | OD-03, OD-09–10, OD-13 |
| P12 | 4 | No overtime/timesheet model/service | No approved overtime engine; optional timesheets not selected | Separate approved payable time from raw presence; no invasive monitoring | OD-04 |
| P13 | 5 | Employee Decimal salary; SalaryHistory effective date; initial migration | Missing components, approval, ledger, change actor and overlap protection; cascade deletion | Salary accuracy, financial authorization and permanent history | C-06; OD-02, OD-06, OD-14 |
| P14 | 5 | Salary fields and permission names only; no payroll/savings ledger/services | No production calculation, period, snapshots, workflow, payslip or settlement | Prevent unapproved deductions, duplicate pay and mutable financial records | C-05–06; OD-01–14 |
| P15 | 6–7 | No performance/training/continuity model/service | No goal, review, skill, calibration or backup-readiness workflow | Fair evidence-based evaluation and knowledge continuity | Foundation; scoped confidentiality and HR review |
| P16 | 6 | No discipline/grievance/safety model/service | No confidential intake, investigation, response, appeal or PIP | Due process, safe escalation and restricted medical/case data | OD-01, OD-15–16; field permissions |
| P17 | 2 | Login/dashboard only; no self-service/request model/service | No own-record portal, proxy identity or approval lifecycle | Self-only access, traceable proxy submission and no self-approval | Foundation; affected domain policies |
| P18 | 8 | No notification/job/delegation service | No authorized notices, retries, delivery history or escalation | Prevent sensitive previews and unintended delegation privileges | OD-17, OD-20; versioned workflow |
| P19 | 7 | No asset/access-checklist model/service | No issue/return/access-removal confirmation | Company ownership and verified access revocation without stored passwords | Employee lifecycle; operations ownership |
| P20 | 7 | Limited Employee status enum; no exit or employment-period service | No notice/handover/clearance/rehire workflow | Preserve identity/history and prevent old access restoration | OD-12–13; payroll final settlement |
| P21 | 7 | No continuity model/runbook | No readiness evidence or emergency playbook | Business continuity with authorized backup personnel | Operations/HR ownership; asset/access inventory |
| P22 | 2, 8 | src/app/dashboard/page.tsx global four-count dashboard; no reports/exports | Counts lack permission/scope; reports, masking and export history absent | Prevent aggregate and bulk data leakage | C-10; OD-15–17, OD-21 |
| P23 | 1–8 | No audit model/service; SalaryHistory exists with cascade | No append-only audit, general idempotency or retention workflow | Protect historical evidence and redact sensitive metadata | C-06; OD-15 |
| P24 | 1, 8 | src/lib/auth.ts; src/lib/session.ts; login/logout routes; .gitignore | Bcrypt conflict; missing persistent sessions, CSRF design, scoped guards, encryption and security operations | Account, HR data and company boundary protection | C-01–04, C-07–11; OD-15–18 |
| P25 | 8 | No backup/restore or production operations evidence | No approved objectives, protected destinations or tested recovery | Recover database/files/config consistently and retain audit history | OD-15–18 |
| P26 | 1–8 | Tailwind pages; Decimal salary; Zod login validation; schema indexes | No broad accessibility/performance, jobs/imports/API-versioning or timezone test evidence | Accessible, precise and reliable operations without data leakage | OD-17 hosting capacity; affected policies |
| P27 | 2, 5–7 | No templates or generated-document history | All listed templates/letters and snapshot/version controls absent | Accurate authorized official communications and history | OD-21; domain approvals; private files |
| P28 | 1–8 | No automated tests; supplied static checks only | All 30 acceptance scenarios lack executable verification | Prevent identity, isolation, financial and recovery edge-case failures | Relevant domain implementation and approved policy expected values |
| P29 | 0; dependent phases | OPEN-DECISIONS.md records all 21 source decisions | Approvals not supplied; only dependent production behavior blocked | Avoid guessed legal/policy/infrastructure activation | OD-01–21; neutral design remains possible |
| P30 | 0–8 | Six Phase 0 documents; partial current foundation | Only Phase 0 authorized now; no claim later phases complete | Controlled coherent delivery without overwriting valid work | Authorization for subsequent phases; their applicable decisions |
| P31 | 0–8 | BASELINE-VALIDATION.md; package.json has no test script | Automated layers, restore exercises and UAT absent | Prevent unsupported assurance and catch real behavioral failures | Test foundation; representative data; stakeholder sign-off |
| P32 | 0–8 | Static checks supplied; partial foundation only | Application does not satisfy final definition of done | Preserve complete employee journey, privacy, payroll and history | All domain gates and required approvals |
| P33 | 0 | RECONCILIATION-REPORT.md plus linked five documents | Phase 0 response recorded; future execution excluded from this completion scope | Evidence-led incremental delivery and concrete review boundary | User authorization before later implementation |

Paths in profiles are repository-relative. Schema references mean `prisma/schema.prisma`; initial migration means `prisma/migrations/20260914205402_init_core_hr/migration.sql`; authentication tables are in `20260914221924_add_auth_rbac/migration.sql`. No future-module routes/models/tests were found beyond the baseline inventory. Read [RECONCILIATION-REPORT.md](RECONCILIATION-REPORT.md) for C IDs and [OPEN-DECISIONS.md](OPEN-DECISIONS.md) for OD IDs.

## Source-preserving clause register

### NEXUSBYTE SOLUTIONS HRM SYSTEM

Source: Master preamble; profile P0.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### Final Consolidated, Gap-Corrected and Implementation-Ready Master Requirements

Source: Master preamble; profile P0.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-0-001 | **Document purpose:** Paste this complete document into the current Nexusbyte HRM development conversation. The development agent must inspect the existing repository, reconcile what is already complete, improve incomplete work safely, and implement all remaining approved requirements without losing prior work, history, security or traceability. | PARTIALLY_COMPLETE |
| MR-0-002 | **Company:** Nexusbyte Solutions | PARTIALLY_COMPLETE |
| MR-0-003 | **System:** Nexusbyte Solutions HRM System | PARTIALLY_COMPLETE |
| MR-0-004 | **Short name:** Nexusbyte HRM | PARTIALLY_COMPLETE |
| MR-0-005 | **Tenant slug:** `nexusbyte-solutions` | PARTIALLY_COMPLETE |
| MR-0-006 | **Company code:** `NBSO` | PARTIALLY_COMPLETE |
| MR-0-007 | **Employee number sequence:** counter starts at `NBSE-0000`; first issued ID is `NBSE-0001` | PARTIALLY_COMPLETE |
| MR-0-008 | **Timezone:** `Asia/Karachi` | PARTIALLY_COMPLETE |
| MR-0-009 | **Currency:** `PKR` | PARTIALLY_COMPLETE |
| MR-0-010 | **System type:** Private, administrator-enrolled, single-company deployment initially; architecture may retain tenant/company boundaries for security and future scalability | PARTIALLY_COMPLETE |
| MR-0-011 | **Public registration:** Prohibited | PARTIALLY_COMPLETE |
| MR-0-012 | **Initial workforce:** Approximately 15–20 employees, scalable to 25, 50, 100 and 250+ | PARTIALLY_COMPLETE |
| MR-0-013 | **Target hosting:** Hostinger-compatible private deployment | PARTIALLY_COMPLETE |
| MR-0-014 | **Web stack:** Next.js App Router, TypeScript, React, Node.js server/API, Prisma and MySQL/MariaDB-compatible database | PARTIALLY_COMPLETE |
| MR-0-015 | **Future mobile client:** React Native/Expo through the same secured API | PARTIALLY_COMPLETE |
| MR-0-016 | **Private files:** Stored outside MySQL in approved private storage; MySQL stores protected metadata and references | PARTIALLY_COMPLETE |
| MR-0-017 | **Exports:** PDF, XLSX and DOCX where specified | PARTIALLY_COMPLETE |

### 1. INSTRUCTIONS TO THE DEVELOPMENT AGENT

Source: Master §1; profile P1.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-1-001 | Act as a senior HR operations architect, payroll/attendance analyst, security architect, database architect, Next.js/TypeScript engineer, Prisma/MySQL engineer, QA lead and deployment engineer. | PARTIALLY_COMPLETE |
| MR-1-002 | Do not treat this document as permission to rewrite the project from scratch. Continue the existing system safely. | PARTIALLY_COMPLETE |

### 1.1 Mandatory first action: inspect before changing

Source: Master §1.1; profile P1.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-1.1-001 | Before implementing anything: | PARTIALLY_COMPLETE |
| MR-1.1-002 | 1. Read `AGENTS.md` completely and obey it. | PARTIALLY_COMPLETE |
| MR-1.1-003 | 2. Inspect repository structure, documentation, requirements, open decisions, migrations, Prisma schema, seed, authentication, RBAC, services, routes, pages, tests and Git status. | PARTIALLY_COMPLETE |
| MR-1.1-004 | 3. Identify current framework/library versions from the repository; do not downgrade or replace them without an approved reason. | PARTIALLY_COMPLETE |
| MR-1.1-005 | 4. Run safe baseline validation: install status, formatting/lint, type-check, unit/integration tests and production build where available. | PARTIALLY_COMPLETE |
| MR-1.1-006 | 5. Inspect the database migration history. Never infer production database state only from `schema.prisma`. | PARTIALLY_COMPLETE |
| MR-1.1-007 | 6. Do not run destructive migrations, resets or data deletion. | PARTIALLY_COMPLETE |
| MR-1.1-008 | 7. Preserve user changes and unrelated dirty-worktree files. | PARTIALLY_COMPLETE |
| MR-1.1-009 | 8. Do not expose secrets, passwords, tokens, personal data or encryption keys in code, logs, tests, commits or documentation. | PARTIALLY_COMPLETE |

### 1.2 Produce a requirement reconciliation report first

Source: Master §1.2; profile P1.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-1.2-001 | Create or update a traceability matrix with these statuses: | PARTIALLY_COMPLETE |
| MR-1.2-002 | - `COMPLETE_AND_VERIFIED` | PARTIALLY_COMPLETE |
| MR-1.2-003 | - `COMPLETE_BUT_NEEDS_IMPROVEMENT` | PARTIALLY_COMPLETE |
| MR-1.2-004 | - `PARTIALLY_COMPLETE` | PARTIALLY_COMPLETE |
| MR-1.2-005 | - `NOT_STARTED` | PARTIALLY_COMPLETE |
| MR-1.2-006 | - `BLOCKED_BY_DECISION` | PARTIALLY_COMPLETE |
| MR-1.2-007 | - `BLOCKED_BY_EXTERNAL_DEPENDENCY` | PARTIALLY_COMPLETE |
| MR-1.2-008 | - `DEFERRED_WITH_REASON` | PARTIALLY_COMPLETE |
| MR-1.2-009 | - `CONFLICT_FOUND` | PARTIALLY_COMPLETE |
| MR-1.2-010 | For every requirement record: | PARTIALLY_COMPLETE |
| MR-1.2-011 | - Requirement ID and title | PARTIALLY_COMPLETE |
| MR-1.2-012 | - Business purpose | PARTIALLY_COMPLETE |
| MR-1.2-013 | - Source/decision precedence | PARTIALLY_COMPLETE |
| MR-1.2-014 | - Current implementation evidence: files, routes, models, migrations and tests | PARTIALLY_COMPLETE |
| MR-1.2-015 | - Gap or defect | PARTIALLY_COMPLETE |
| MR-1.2-016 | - Security/data/history impact | PARTIALLY_COMPLETE |
| MR-1.2-017 | - Dependencies | PARTIALLY_COMPLETE |
| MR-1.2-018 | - Acceptance criteria | PARTIALLY_COMPLETE |
| MR-1.2-019 | - Implementation phase | PARTIALLY_COMPLETE |
| MR-1.2-020 | - Test evidence | PARTIALLY_COMPLETE |
| MR-1.2-021 | - Migration and rollback considerations | PARTIALLY_COMPLETE |
| MR-1.2-022 | - Final status | PARTIALLY_COMPLETE |
| MR-1.2-023 | Do not mark an item complete merely because a model, route or screen exists. It is complete only when authorization, validation, history, audit, edge cases and tests pass. | PARTIALLY_COMPLETE |

### 1.3 Existing foundation that must be verified and preserved

Source: Master §1.3; profile P1.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-1.3-001 | The latest known development baseline reports: | CONFLICT_FOUND |
| MR-1.3-002 | - Prisma foundation: 42 models and 22 enums. | CONFLICT_FOUND |
| MR-1.3-003 | - Migration: `20260904195227_phase1_foundation`. | CONFLICT_FOUND |
| MR-1.3-004 | - Migration output: 42 tables, 75 foreign keys, 41 unique constraints and 62 indexes. | CONFLICT_FOUND |
| MR-1.3-005 | - Initial seed: tenant and company, `NBSO` settings, policy defaults, 21 permissions, 7 roles, bootstrap administrator using Argon2id, and 7 non-sensitive document categories. | CONFLICT_FOUND |
| MR-1.3-006 | - Environment validation uses Zod and has tests. | CONFLICT_FOUND |
| MR-1.3-007 | - `.gitignore` and `.env.example` are hardened. | CONFLICT_FOUND |
| MR-1.3-008 | - `npm audit` was reported as zero vulnerabilities at that checkpoint. | CONFLICT_FOUND |
| MR-1.3-009 | These are status claims, not a substitute for repository evidence. Verify them. Preserve valid completed work. If the repository differs, document the difference before making changes. | CONFLICT_FOUND |

### 1.4 Change-control rules

Source: Master §1.4; profile P1.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-1.4-001 | - Existing approved requirements remain valid unless explicitly superseded. | PARTIALLY_COMPLETE |
| MR-1.4-002 | - The latest explicit approved decision takes precedence over an older proposal. | PARTIALLY_COMPLETE |
| MR-1.4-003 | - Never silently remove a field, workflow, permission, report, history record or validation rule. | PARTIALLY_COMPLETE |
| MR-1.4-004 | - Resolve duplicates into one traceable requirement without losing details. | PARTIALLY_COMPLETE |
| MR-1.4-005 | - Record conflicts and stop only the affected implementation area; continue safe independent work. | PARTIALLY_COMPLETE |
| MR-1.4-006 | - Do not invent HR, payroll, tax, savings, leave, overtime or legal policy values. | PARTIALLY_COMPLETE |
| MR-1.4-007 | - Use configurable policies with effective dates instead of hard-coded business rules. | PARTIALLY_COMPLETE |
| MR-1.4-008 | - Use Prisma migrations for schema changes. | PARTIALLY_COMPLETE |
| MR-1.4-009 | - Use server-side authorization and validation; hiding a UI control is not security. | PARTIALLY_COMPLETE |
| MR-1.4-010 | - Make focused changes only. Avoid unrelated refactoring. | PARTIALLY_COMPLETE |
| MR-1.4-011 | - Every phase must end with lint, type-check, focused tests and build, plus migration validation when applicable. | PARTIALLY_COMPLETE |

### 2. GOVERNANCE, PRINCIPLES AND DEFINITIONS

Source: Master §2; profile P2.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### 2.1 Core principles

Source: Master §2.1; profile P2.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-2.1-001 | 1. Trust employees; do not secretly monitor or spy on them. | NOT_STARTED |
| MR-2.1-002 | 2. Measure responsibilities, outcomes, quality, deadlines, communication and professional conduct. | NOT_STARTED |
| MR-2.1-003 | 3. Apply transparent, written and consistently configured policies. | NOT_STARTED |
| MR-2.1-004 | 4. Protect both employees and the company through due process and accurate records. | NOT_STARTED |
| MR-2.1-005 | 5. Never overwrite material history. | NOT_STARTED |
| MR-2.1-006 | 6. Use least privilege: each user receives only the minimum access required for the job. | NOT_STARTED |
| MR-2.1-007 | 7. Company accounts, data, documents and work products remain under authorized company control. | NOT_STARTED |
| MR-2.1-008 | 8. Critical knowledge must be documented and have an authorized backup person. | NOT_STARTED |
| MR-2.1-009 | 9. Sensitive decisions and financial adjustments require evidence, approval and audit history. | NOT_STARTED |
| MR-2.1-010 | 10. Policies are versioned and effective-dated; future changes must not rewrite past calculations. | NOT_STARTED |
| MR-2.1-011 | 11. Store timestamps in UTC and display/calculations in the applicable company/shift timezone, normally `Asia/Karachi`. | NOT_STARTED |
| MR-2.1-012 | 12. Posted, locked, paid or finalized records are immutable. Corrections occur through controlled reversals, superseding records or authorized reopening. | NOT_STARTED |

### 2.2 Requirement lifecycle

Source: Master §2.2; profile P2.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-2.2-001 | Use: Draft → Proposed → Under Review → Approved → In Development → Under QA → UAT → Accepted/Released. Deferred, Rejected and Superseded items remain in history with reasons. | NOT_STARTED |
| MR-2.2-002 | Each requirement must include ID, description, purpose, owner, priority, dependencies, acceptance criteria, decision status, implementation evidence, test evidence, release and change history. | NOT_STARTED |

### 2.3 Legal classification

Source: Master §2.3; profile P2.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-2.3-001 | Any rule affecting working hours, deductions, savings forfeiture, leave, overtime, termination, notice, final settlement, tax, statutory contributions, biometric data, privacy or record retention must be labelled: | NOT_STARTED |
| MR-2.3-002 | > **Company Policy — Legal Review Recommended** | NOT_STARTED |
| MR-2.3-003 | The application must not imply that an internal rule overrides applicable law. Pakistan-specific legal/tax values remain configurable and blocked from production activation until approved by qualified HR/legal/payroll stakeholders. | NOT_STARTED |

### 3. APPROVED ROLES AND ACCESS MODEL

Source: Master §3; profile P3.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-3-001 | The approved application roles are: | CONFLICT_FOUND |
| MR-3-002 | 1. **Tenant Administrator** — tenant-level configuration and authorized company access; no automatic access to every sensitive employee field. | CONFLICT_FOUND |
| MR-3-003 | 2. **Company Administrator** — company configuration and authorized administration. | CONFLICT_FOUND |
| MR-3-004 | 3. **HR Administrator** — employee lifecycle, HR policy, documents, approvals and HR operations. | CONFLICT_FOUND |
| MR-3-005 | 4. **HR Officer** — daily HR operations; document verification is allowed as later approved, but role/permission administration, destructive archive operations and highly sensitive functions require separate explicit permissions. | CONFLICT_FOUND |
| MR-3-006 | 5. **Manager** — scoped team/department visibility, approvals and performance input; no bank, tax, sensitive identity or unrestricted payroll access. | CONFLICT_FOUND |
| MR-3-007 | 6. **Employee** — self-service and own authorized records only. | CONFLICT_FOUND |
| MR-3-008 | 7. **Auditor / Read-only** — permission-scoped read and export access without mutation. | CONFLICT_FOUND |
| MR-3-009 | Finance/Payroll, IT/Admin, Attendance Operator, Department Head and Team Lead are functional permission bundles or future roles only if approved. Do not silently create high-privilege roles. No user becomes Platform Administrator through a tenant role. Platform-level administration, if retained technically, must be separately controlled and must not automatically grant company-data access. | CONFLICT_FOUND |

### 3.1 Permission dimensions

Source: Master §3.1; profile P3.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-3.1-001 | Permissions must distinguish: | CONFLICT_FOUND |
| MR-3.1-002 | - View, create, edit, submit, verify, approve, reject, cancel, reopen, lock, pay, export, archive and configure. | CONFLICT_FOUND |
| MR-3.1-003 | - Self, direct reports, team, department, branch, company and tenant scopes. | CONFLICT_FOUND |
| MR-3.1-004 | - Normal, confidential, sensitive and highly sensitive data. | CONFLICT_FOUND |
| MR-3.1-005 | - Field-level permissions for salary, CNIC/identity, bank, tax, address, emergency contacts, medical/supporting evidence, performance, warnings, grievances and exit records. | CONFLICT_FOUND |

### 3.2 Segregation of duties

Source: Master §3.2; profile P3.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-3.2-001 | - The maker of a sensitive financial or attendance correction should not approve the same action where staffing permits. | CONFLICT_FOUND |
| MR-3.2-002 | - Payroll preparer, reviewer, approver and payment confirmer must be distinguishable. | CONFLICT_FOUND |
| MR-3.2-003 | - A user may not approve their own leave, attendance correction, salary change, expense or HR request. | CONFLICT_FOUND |
| MR-3.2-004 | - Emergency override requires explicit permission, reason and post-action review. | CONFLICT_FOUND |

### 4. ORGANIZATION AND MASTER DATA

Source: Master §4; profile P4.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-4-001 | Support effective-dated, audited master data for: | PARTIALLY_COMPLETE |
| MR-4-002 | - Tenant, company and company settings | PARTIALLY_COMPLETE |
| MR-4-003 | - Branches and work locations | PARTIALLY_COMPLETE |
| MR-4-004 | - Departments, teams and cost centres | PARTIALLY_COMPLETE |
| MR-4-005 | - Designations, job titles, grades and career levels | PARTIALLY_COMPLETE |
| MR-4-006 | - Employment types: permanent/full-time, part-time, intern, contractor/freelancer and other approved types | PARTIALLY_COMPLETE |
| MR-4-007 | - Work modes: office, remote and hybrid | PARTIALLY_COMPLETE |
| MR-4-008 | - Reporting relationships: primary manager, functional manager and team lead where applicable | PARTIALLY_COMPLETE |
| MR-4-009 | - Holiday calendars by company/branch/location | PARTIALLY_COMPLETE |
| MR-4-010 | - Shifts, rosters and working-week patterns | PARTIALLY_COMPLETE |
| MR-4-011 | - Leave types and policies | PARTIALLY_COMPLETE |
| MR-4-012 | - Salary/pay components and deduction types | PARTIALLY_COMPLETE |
| MR-4-013 | - Document categories and sensitivity | PARTIALLY_COMPLETE |
| MR-4-014 | - Asset types and conditions | PARTIALLY_COMPLETE |
| MR-4-015 | - Request, warning, grievance, training and exit categories | PARTIALLY_COMPLETE |
| MR-4-016 | Rules: | PARTIALLY_COMPLETE |
| MR-4-017 | - Codes are unique within their owner boundary. | PARTIALLY_COMPLETE |
| MR-4-018 | - Active referenced values cannot be deleted. | PARTIALLY_COMPLETE |
| MR-4-019 | - Deactivation is future-only or requires a safe replacement mapping. | PARTIALLY_COMPLETE |
| MR-4-020 | - Historical records continue displaying the original label/code even after deactivation. | PARTIALLY_COMPLETE |
| MR-4-021 | - Reporting hierarchies must reject self-reporting and circular manager loops. | PARTIALLY_COMPLETE |

### 5. EMPLOYEE MASTER AND COMPLETE LIFECYCLE

Source: Master §5; profile P5.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### 5.1 Permanent employee identity

Source: Master §5.1; profile P5.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-5.1-001 | - Generate the permanent business ID only after authorized registration approval. | NOT_STARTED |
| MR-5.1-002 | - Counter starts from `NBSE-0000`; the first real employee ID is `NBSE-0001`. | NOT_STARTED |
| MR-5.1-003 | - Never reuse an employee ID. | NOT_STARTED |
| MR-5.1-004 | - Rehire uses the same person/employee master and a new employment period unless a later approved policy explicitly requires otherwise. | NOT_STARTED |
| MR-5.1-005 | - Original joining date remains historical and is never overwritten. | NOT_STARTED |
| MR-5.1-006 | - Joining and exit effective dates gate attendance, leave eligibility, access and payroll. | NOT_STARTED |

### 5.2 Employee profile

Source: Master §5.2; profile P5.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-5.2-001 | Capture with field-level validation and permissions: | PARTIALLY_COMPLETE |
| MR-5.2-002 | - Legal/full name, official English name, father/guardian name where required, preferred name | PARTIALLY_COMPLETE |
| MR-5.2-003 | - Date of birth, profile photo, gender/marital details only when approved and lawful | PARTIALLY_COMPLETE |
| MR-5.2-004 | - CNIC or approved identity type, masked display, issue/expiry dates and verification | PARTIALLY_COMPLETE |
| MR-5.2-005 | - Personal and work phone/email | PARTIALLY_COMPLETE |
| MR-5.2-006 | - Current and permanent addresses | PARTIALLY_COMPLETE |
| MR-5.2-007 | - One or more emergency contacts with relationship and primary marker | PARTIALLY_COMPLETE |
| MR-5.2-008 | - Department, team, designation, grade, branch, location, cost centre | PARTIALLY_COMPLETE |
| MR-5.2-009 | - Manager and reporting lines | PARTIALLY_COMPLETE |
| MR-5.2-010 | - Employment type, work mode and status | PARTIALLY_COMPLETE |
| MR-5.2-011 | - Joining, registration, probation, confirmation and exit information | PARTIALLY_COMPLETE |
| MR-5.2-012 | - Shift/roster and attendance eligibility | PARTIALLY_COMPLETE |
| MR-5.2-013 | - Leave policy assignment | PARTIALLY_COMPLETE |
| MR-5.2-014 | - Salary/payroll eligibility | PARTIALLY_COMPLETE |
| MR-5.2-015 | - Bank/payment and tax profile with encryption and masking | PARTIALLY_COMPLETE |
| MR-5.2-016 | - Skills, education, experience, certifications and languages where required | PARTIALLY_COMPLETE |
| MR-5.2-017 | - Accessibility/workplace accommodation data only with strict access and consent/legal basis | PARTIALLY_COMPLETE |

### 5.3 Lifecycle statuses and scenarios

Source: Master §5.3; profile P5.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-5.3-001 | Support Draft, Pending Verification, Pending Approval, Pre-boarding, Probation, Confirmed, Active, On Leave, Suspended, Notice Period, Contract End Pending, Exited, Resigned, Terminated, Probation Discontinued, Retired, Deceased where lawfully required, and Archived. | NOT_STARTED |
| MR-5.3-002 | Every transition requires allowed-from/allowed-to rules, effective date, reason, actor, approval and evidence where needed. | NOT_STARTED |

### 5.4 Effective-dated history

Source: Master §5.4; profile P5.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-5.4-001 | Never overwrite history for: | PARTIALLY_COMPLETE |
| MR-5.4-002 | - Employment periods and rehire | PARTIALLY_COMPLETE |
| MR-5.4-003 | - Branch, location, department, team and cost centre | PARTIALLY_COMPLETE |
| MR-5.4-004 | - Designation, grade and job title | PARTIALLY_COMPLETE |
| MR-5.4-005 | - Manager/reporting line | PARTIALLY_COMPLETE |
| MR-5.4-006 | - Employment type/work mode/status | PARTIALLY_COMPLETE |
| MR-5.4-007 | - Shift and leave policy assignment | PARTIALLY_COMPLETE |
| MR-5.4-008 | - Salary/pay components | PARTIALLY_COMPLETE |
| MR-5.4-009 | - Bank/tax/identity records | PARTIALLY_COMPLETE |
| MR-5.4-010 | Reject overlapping effective-date ranges unless the domain explicitly supports them. | PARTIALLY_COMPLETE |

### 5.5 Employee registration workflow

Source: Master §5.5; profile P5.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-5.5-001 | Draft → HR data entry → employee/self completion where allowed → document collection → HR verification → manager/HR approval → Employee ID issuance → account/access provisioning → attendance/leave/payroll enrollment by effective date. | NOT_STARTED |
| MR-5.5-002 | Missing mandatory information must block only the dependent activation steps and be displayed clearly. Never create fake placeholder personal data. | NOT_STARTED |

### 5.6 Transfers and changes

Source: Master §5.6; profile P5.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-5.6-001 | Support promotion, demotion where approved, department/branch/team transfer, manager change, designation/grade change, work-mode change, shift change, temporary assignment, secondment where applicable, suspension and reinstatement. Each creates history and triggers relevant access, attendance, leave and payroll impact review. | NOT_STARTED |

### 6. RECRUITMENT AND HIRING

Source: Master §6; profile P6.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-6-001 | Implement: | NOT_STARTED |
| MR-6-002 | Manpower Request → Budget/Headcount Approval → Job Description → Vacancy → Candidate Application → Screening → Interview Stages → Evaluation → Reference/Background Checks where approved → Selection → Offer → Negotiation/Revision → Acceptance/Decline → Pre-boarding → Joining/No-show. | NOT_STARTED |
| MR-6-003 | Required capabilities: | NOT_STARTED |
| MR-6-004 | - Vacancy ID, department, location, employment type, headcount, reason, budget range and target date | NOT_STARTED |
| MR-6-005 | - Versioned job description and approval | NOT_STARTED |
| MR-6-006 | - Candidate source, CV, contact, consent, status and communication history | NOT_STARTED |
| MR-6-007 | - Duplicate-candidate detection without unsafe merging | NOT_STARTED |
| MR-6-008 | - Interview scheduling, panel, structured scorecard and conflict-of-interest declaration | NOT_STARTED |
| MR-6-009 | - Final decision and approval trail | NOT_STARTED |
| MR-6-010 | - Offer versions, expiry, acceptance/rejection and joining date | NOT_STARTED |
| MR-6-011 | - Talent-pool retention based on approved retention/consent rules | NOT_STARTED |
| MR-6-012 | - Convert selected candidate to employee without copying irrelevant recruitment notes | NOT_STARTED |
| MR-6-013 | - Record withdrawal, rejection, offer decline, no-show and vacancy cancellation reasons | NOT_STARTED |
| MR-6-014 | - Candidate data access, retention and secure deletion/legal hold rules | NOT_STARTED |
| MR-6-015 | Templates: manpower request, JD, interview evaluation, selection approval, offer letter and joining confirmation. | NOT_STARTED |

### 7. ONBOARDING, PRE-BOARDING AND PROBATION

Source: Master §7; profile P7.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### 7.1 Onboarding plans

Source: Master §7.1; profile P7.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-7.1-001 | Create reusable plans by role/department and individual assignments: | PARTIALLY_COMPLETE |
| MR-7.1-002 | - Pre-joining tasks | PARTIALLY_COMPLETE |
| MR-7.1-003 | - Day 1 | PARTIALLY_COMPLETE |
| MR-7.1-004 | - First week | PARTIALLY_COMPLETE |
| MR-7.1-005 | - 30, 60 and 90 days where applicable | PARTIALLY_COMPLETE |
| MR-7.1-006 | - Two-month default probation evaluation checkpoint | PARTIALLY_COMPLETE |
| MR-7.1-007 | - Manager, HR, IT/Admin, trainer and employee tasks | PARTIALLY_COMPLETE |
| MR-7.1-008 | - Dependencies, due dates, reminders, evidence and completion approval | PARTIALLY_COMPLETE |
| MR-7.1-009 | Cover company orientation, policies, job responsibilities, working hours, leave, payroll cycle, security, confidentiality, communication, tools, system access, assets, training and initial goals. | PARTIALLY_COMPLETE |

### 7.2 Probation

Source: Master §7.2; profile P7.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-7.2-001 | Default probation is two months but configurable by employment type/individual policy. | PARTIALLY_COMPLETE |
| MR-7.2-002 | Track start/end, attendance, punctuality, learning, behaviour, communication, job knowledge, work quality, task completion, manager feedback and training progress. | PARTIALLY_COMPLETE |
| MR-7.2-003 | Outcomes: | PARTIALLY_COMPLETE |
| MR-7.2-004 | - Confirmed | PARTIALLY_COMPLETE |
| MR-7.2-005 | - Extended with new end date, reason and improvement plan | PARTIALLY_COMPLETE |
| MR-7.2-006 | - Employment discontinued with due process | PARTIALLY_COMPLETE |
| MR-7.2-007 | No automatic confirmation, extension or termination. Notify stakeholders before due date; late decisions remain visible and auditable. | PARTIALLY_COMPLETE |

### 8. DOCUMENT AND POLICY MANAGEMENT

Source: Master §8; profile P8.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### 8.1 Employee and company documents

Source: Master §8.1; profile P8.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-8.1-001 | Support CNIC/ID, CV, employee form, appointment/contract letter, confirmation, promotion, salary revision, evaluation, warning, PIP, resignation, experience, education/certification, bank/tax and other approved categories. | NOT_STARTED |
| MR-8.1-002 | For each category configure: | NOT_STARTED |
| MR-8.1-003 | - Mandatory/optional by employment type/status | NOT_STARTED |
| MR-8.1-004 | - Sensitivity | NOT_STARTED |
| MR-8.1-005 | - Submission deadline | NOT_STARTED |
| MR-8.1-006 | - Verification permission | NOT_STARTED |
| MR-8.1-007 | - Expiry and reminder schedule | NOT_STARTED |
| MR-8.1-008 | - Allowed MIME types/extensions and maximum size | NOT_STARTED |
| MR-8.1-009 | - Retention and archive rule | NOT_STARTED |
| MR-8.1-010 | - Whether employee may view/download/update | NOT_STARTED |

### 8.2 Storage and versions

Source: Master §8.2; profile P8.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-8.2-001 | - Files stay in private storage; never public URLs. | NOT_STARTED |
| MR-8.2-002 | - Use server-authorized, time-limited download/preview. | NOT_STARTED |
| MR-8.2-003 | - Validate extension, MIME signature and size; malware scan when infrastructure supports it. | NOT_STARTED |
| MR-8.2-004 | - Encrypt sensitive storage references and data where designed. | NOT_STARTED |
| MR-8.2-005 | - Document versions are append-only; replacement creates a new version. | NOT_STARTED |
| MR-8.2-006 | - Log upload, verification, rejection, view, download, export and archive. | NOT_STARTED |
| MR-8.2-007 | - Missing mandatory documents appear on dashboards and onboarding/exit checklists. | NOT_STARTED |

### 8.3 Policy management

Source: Master §8.3; profile P8.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-8.3-001 | Policies require version, effective date, owner, approval, audience, legal-review flag, superseded version and acknowledgement requirements. Employees must be able to view the applicable version and acknowledge it. Later policy changes must not rewrite old payroll/attendance outcomes. | NOT_STARTED |
| MR-8.3-002 | Include attendance, leave, working hours, overtime, remote/hybrid work, salary/payroll, savings, performance, promotion, discipline, anti-harassment/grievance, confidentiality, data protection, acceptable use, assets, health/safety, document retention, communication, training, exit and handover policies. | NOT_STARTED |

### 9. SHIFTS, ROSTERS, ATTENDANCE AND TIME

Source: Master §9; profile P9.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### 9.1 Configurable defaults

Source: Master §9.1; profile P9.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-9.1-001 | - Default shift: 5:30 PM–2:30 AM | PARTIALLY_COMPLETE |
| MR-9.1-002 | - Alternative shift: 4:30 PM–2:30 AM | PARTIALLY_COMPLETE |
| MR-9.1-003 | - Default weekly off: Saturday and Sunday | PARTIALLY_COMPLETE |
| MR-9.1-004 | - Default break window: 9:30 PM–10:30 PM | PARTIALLY_COMPLETE |
| MR-9.1-005 | - Default 5:30 PM shift grace period: 10 minutes; 5:30–5:40 on time and 5:41 onward late | PARTIALLY_COMPLETE |
| MR-9.1-006 | These are configuration defaults, not hard-coded universal rules. | PARTIALLY_COMPLETE |

### 9.2 Shift engine

Source: Master §9.2; profile P9.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-9.2-001 | Support fixed, night/cross-midnight, rotating, flexible, split where approved, temporary, department and employee-specific shifts. Preserve shift assignment history and effective dates. Handle work date versus calendar date correctly for overnight shifts. | NOT_STARTED |
| MR-9.2-002 | Support roster publication, shift swaps, rest-day changes and temporary shift approvals without retroactively changing processed periods. | NOT_STARTED |

### 9.3 Raw punches and calculated attendance

Source: Master §9.3; profile P9.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-9.3-001 | Store raw device/manual import events append-only and separately from calculated attendance. Preserve source, external ID, device ID, event timestamp, received timestamp, timezone, direction/type, sequence and deduplication key. | NOT_STARTED |
| MR-9.3-002 | Calculated daily attendance supports: | NOT_STARTED |
| MR-9.3-003 | - Present, Late, Early Departure, Half Day, Absent | NOT_STARTED |
| MR-9.3-004 | - Paid/Unpaid Leave | NOT_STARTED |
| MR-9.3-005 | - Holiday, Weekly Off, Optional/Substitute Holiday | NOT_STARTED |
| MR-9.3-006 | - Remote Work, Field Duty, Business Travel, Training | NOT_STARTED |
| MR-9.3-007 | - Missing Check-in, Missing Check-out, Missing/Invalid Punch | NOT_STARTED |
| MR-9.3-008 | - System/Device Failure and Authorized Override | NOT_STARTED |
| MR-9.3-009 | - Overtime where enabled | NOT_STARTED |

### 9.4 Break management

Source: Master §9.4; profile P9.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-9.4-001 | Configure per employee/policy: | BLOCKED_BY_DECISION |
| MR-9.4-002 | - Break allowed | BLOCKED_BY_DECISION |
| MR-9.4-003 | - Paid/unpaid | BLOCKED_BY_DECISION |
| MR-9.4-004 | - Start/end window | BLOCKED_BY_DECISION |
| MR-9.4-005 | - Maximum duration | BLOCKED_BY_DECISION |
| MR-9.4-006 | - Multiple breaks if approved | BLOCKED_BY_DECISION |
| MR-9.4-007 | - Late start, late return and excessive-duration treatment | BLOCKED_BY_DECISION |
| MR-9.4-008 | - Dock fine enabled and amount | BLOCKED_BY_DECISION |
| MR-9.4-009 | Default proposed dock fine is PKR 500 after 10:30 PM, but the precise trigger—late break start, late return or over-duration—remains a required policy decision. Employees without break allowance must not receive dock-fine calculations. | BLOCKED_BY_DECISION |

### 9.5 Lateness and punctuality

Source: Master §9.5; profile P9.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-9.5-001 | Default proposed rule: three qualifying lates in a payroll period produce PKR 2,500 punctuality deduction. The system must configure occurrence threshold, amount, repeat behavior (for example 3, 6, 9), reset period, exclusions, manual adjustment and approval. Repeat behavior is not approved until explicitly decided. | BLOCKED_BY_DECISION |

### 9.6 Half day, absence and early departure

Source: Master §9.6; profile P9.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-9.6-001 | Configure thresholds and sources. Half-day accumulation supports 0.5 day units. Two half days equal one day for payroll impact, but source records remain separate. Do not automatically infer half day/absence without an approved formula. | BLOCKED_BY_DECISION |

### 9.7 Corrections and exceptions

Source: Master §9.7; profile P9.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-9.7-001 | No punch on a scheduled workday defaults to Absent only after evaluating approved leave, holiday, weekly off, work mode/duty, joining/exit date and authorized exception. | NOT_STARTED |
| MR-9.7-002 | Attendance correction workflow: | NOT_STARTED |
| MR-9.7-003 | Employee/HR request → original record preserved → reason/evidence → manager/HR review → approval/rejection → recalculation → dependent payroll impact flag → audit. | NOT_STARTED |
| MR-9.7-004 | Cover forgotten punches, emergency, internet/device outage, field duty, remote work, overnight pairing, duplicate/out-of-order events, clock drift and unknown device user IDs. | NOT_STARTED |

### 9.8 Locking

Source: Master §9.8; profile P9.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-9.8-001 | Attendance period: Open → Under Review → Approved → Locked. Reopening requires permission, reason and audit; if payroll depends on it, payroll must be marked stale and reviewed/recalculated rather than silently changing. | NOT_STARTED |

### 10. ATTENDANCE DEVICE INTEGRATION

Source: Master §10; profile P10.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-10-001 | - Brand-independent adapter architecture. | NOT_STARTED |
| MR-10-002 | - Future support for ZKTeco, eSSL, Suprema, Anviz and compatible devices, subject to selected device/provider. | NOT_STARTED |
| MR-10-003 | - Methods: API, webhook, ADMS/push, TCP/IP SDK, cloud API, scheduled polling and CSV/XLSX fallback. | NOT_STARTED |
| MR-10-004 | - A secure separate Windows connector for LAN/SDK-only devices. | NOT_STARTED |
| MR-10-005 | - Multiple device mappings per employee; prevent duplicate active mapping on the same device. | NOT_STARTED |
| MR-10-006 | - Setup wizard, connectivity test, device timezone/clock test, mapping, test punch and activation. | NOT_STARTED |
| MR-10-007 | - Idempotency, duplicate detection, queued retry, dead-letter/review queue and no silent loss. | NOT_STARTED |
| MR-10-008 | - Device states: online, offline, syncing, auth failure, configuration error, connector stopped and never connected. | NOT_STARTED |
| MR-10-009 | - Alert on clock drift, offline state, unknown IDs, failed sync and expiring credentials. | NOT_STARTED |
| MR-10-010 | - Signed/authenticated ingestion, rate limiting, replay protection, secret rotation and optional IP allowlisting. | NOT_STARTED |
| MR-10-011 | - Do not store biometric templates in the HRM by default. Store enrollment state/mapping and attendance events only. | NOT_STARTED |
| MR-10-012 | - Provide a mock device/connector for automated tests, including night shifts, delayed/out-of-order events, duplicates, outages and invalid timestamps. | NOT_STARTED |

### 11. LEAVE, HOLIDAYS AND ABSENCE

Source: Master §11; profile P11.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### 11.1 Leave policy engine

Source: Master §11.1; profile P11.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-11.1-001 | Support configurable leave types, including annual, casual, sick, emergency, unpaid, maternity/paternity and other approved categories. Do not activate unapproved balances or legal entitlements. | BLOCKED_BY_DECISION |
| MR-11.1-002 | Each policy can define: | BLOCKED_BY_DECISION |
| MR-11.1-003 | - Eligibility by employment type, grade, branch, gender/legal rule where lawful, probation and service length | BLOCKED_BY_DECISION |
| MR-11.1-004 | - Annual entitlement and grant/accrual method | BLOCKED_BY_DECISION |
| MR-11.1-005 | - Calendar-year, anniversary-year or custom cycle | BLOCKED_BY_DECISION |
| MR-11.1-006 | - Joining-year and exit-year proration | BLOCKED_BY_DECISION |
| MR-11.1-007 | - Carry forward, expiry and maximum accumulation | BLOCKED_BY_DECISION |
| MR-11.1-008 | - Encashment where approved | BLOCKED_BY_DECISION |
| MR-11.1-009 | - Paid/unpaid status | BLOCKED_BY_DECISION |
| MR-11.1-010 | - Full/half-day and hourly/short leave if approved | BLOCKED_BY_DECISION |
| MR-11.1-011 | - Minimum/maximum request duration | BLOCKED_BY_DECISION |
| MR-11.1-012 | - Advance notice and backdated/emergency request rules | BLOCKED_BY_DECISION |
| MR-11.1-013 | - Attachment requirement | BLOCKED_BY_DECISION |
| MR-11.1-014 | - Consecutive-day and blackout limits | BLOCKED_BY_DECISION |
| MR-11.1-015 | - Negative balance behavior | BLOCKED_BY_DECISION |
| MR-11.1-016 | - Approval levels and delegated approver | BLOCKED_BY_DECISION |
| MR-11.1-017 | - Cancellation/recall and balance restoration | BLOCKED_BY_DECISION |

### 11.2 Workflow and conflicts

Source: Master §11.2; profile P11.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-11.2-001 | Request → validation → approver(s) → approved/rejected/cancelled/withdrawn → attendance integration → payroll integration. | NOT_STARTED |
| MR-11.2-002 | Prevent overlapping requests, attendance conflicts and double deductions. Handle approver absence, self-approval prohibition, emergency retrospective approval and partial approval. | NOT_STARTED |

### 11.3 Leave reasons

Source: Master §11.3; profile P11.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-11.3-001 | Initial valid reasons may include Family Reason, Emergency and Accident. Selecting Other requires remarks. Reasons and evidence access must be privacy-controlled. | NOT_STARTED |

### 11.4 Sandwich policy

Source: Master §11.4; profile P11.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-11.4-001 | Implement only through a versioned configurable policy. Preserve original calculated result, override, reason, approver and timestamp. Exact qualifying combinations, holiday/weekend treatment and exceptions require explicit approval and legal review. | BLOCKED_BY_DECISION |

### 11.5 Holiday calendar

Source: Master §11.5; profile P11.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-11.5-001 | Support official, company, branch/location, optional and substitute holidays. Holiday changes after attendance/payroll processing require impact analysis and controlled recalculation. | NOT_STARTED |

### 12. OVERTIME, TIMESHEETS AND DUTY RECORDS

Source: Master §12; profile P12.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-12-001 | Overtime must be optional and policy-controlled: | NOT_STARTED |
| MR-12-002 | - Employee eligibility | NOT_STARTED |
| MR-12-003 | - Pre-approval/post-approval | NOT_STARTED |
| MR-12-004 | - Minimum threshold, rounding and daily/monthly caps | NOT_STARTED |
| MR-12-005 | - Working day, rest day and holiday treatment | NOT_STARTED |
| MR-12-006 | - Rate multiplier or time-off-in-lieu | NOT_STARTED |
| MR-12-007 | - Raw, calculated, approved and payable hours stored separately | NOT_STARTED |
| MR-12-008 | - Cross-midnight overtime | NOT_STARTED |
| MR-12-009 | - Payroll integration and rejection reasons | NOT_STARTED |
| MR-12-010 | Timesheets/project allocation are a separate optional module from attendance. They may track project/client/task hours without invasive monitoring. Attendance must not be silently replaced by timesheets. | NOT_STARTED |

### 13. SALARY, COMPENSATION AND BENEFITS

Source: Master §13; profile P13.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### 13.1 Effective-dated salary structure

Source: Master §13.1; profile P13.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-13.1-001 | Maintain basic salary and approved components such as allowances, bonuses, commissions, benefits, reimbursements and deductions. Classify gross, taxable/non-taxable, employee deduction, employer contribution and net-pay impact. | PARTIALLY_COMPLETE |
| MR-13.1-002 | Every change creates a new effective-dated record with previous value, new value, reason, creator, approver and timestamp. Never overwrite salary history. | PARTIALLY_COMPLETE |

### 13.2 Salary review and revision

Source: Master §13.2; profile P13.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-13.2-001 | Support annual, semi-annual, promotion, performance, market adjustment, correction and role-change reviews. Workflow: recommendation → budget/management review → approval → effective date → letter → payroll impact. | PARTIALLY_COMPLETE |

### 13.3 Loans, advances and reimbursements

Source: Master §13.3; profile P13.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-13.3-001 | Where approved, support request, approval, amount, installment schedule, outstanding balance, early settlement, pause/adjustment, payroll recovery and ledger. Expense reimbursement requires category, date, evidence, approval, paid status and must not be confused with salary. | PARTIALLY_COMPLETE |

### 14. PAYROLL AND FINANCIAL CONTROL

Source: Master §14; profile P14.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### 14.1 Payroll period

Source: Master §14.1; profile P14.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-14.1-001 | Support calendar month, 5th-to-5th, 10th-to-10th, 15th-to-15th and custom cycles. Prevent overlap and gaps. The current proposed default is 5th of current month to 5th of next month, but inclusive/exclusive boundary and payment date must be explicitly approved before activation. | BLOCKED_BY_DECISION |

### 14.2 Payroll inputs

Source: Master §14.2; profile P14.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-14.2-001 | Use effective-dated salary, approved attendance, leave, overtime, late/half-day/absence rules, savings, loans/advances, bonuses, allowances, reimbursements, manual adjustments, taxes and statutory contributions. | NOT_STARTED |
| MR-14.2-002 | Take an auditable input snapshot per calculation so later master-data changes do not silently alter a finalized result. | NOT_STARTED |

### 14.3 Proration and daily rate

Source: Master §14.3; profile P14.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-14.3-001 | Support calendar-day, working-day, fixed-divisor and payroll-cycle methods. Configure rounding precision and treatment of join, exit, unpaid leave and salary changes mid-period. No method becomes production default without approval. | BLOCKED_BY_DECISION |

### 14.4 Central deduction register

Source: Master §14.4; profile P14.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-14.4-001 | Types may include savings, punctuality, unpaid leave, half day, dock fine, absence, loan installment, tax/statutory, recovery and approved manual adjustment. | NOT_STARTED |
| MR-14.4-002 | Every deduction stores source, formula/version, quantity, rate, amount, reason, period, creator, approver, status and reversal link. Never create an unexplained lump sum. | NOT_STARTED |

### 14.5 Employee savings

Source: Master §14.5; profile P14.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-14.5-001 | Proposed default: PKR 2,500 monthly, only when basic salary exists and savings is enabled for the employee. | BLOCKED_BY_DECISION |
| MR-14.5-002 | Maintain a separate immutable savings ledger for deduction, adjustment, refund/payout, forfeiture decision, reversal and running balance. Never use only a mutable total. | BLOCKED_BY_DECISION |
| MR-14.5-003 | Urgent resignation forfeiture, notice-completed payout and probation-exit non-payment are proposed company rules and must remain disabled or clearly pending until legal/policy approval and employee agreement requirements are satisfied. | BLOCKED_BY_DECISION |

### 14.6 Payroll workflow

Source: Master §14.6; profile P14.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-14.6-001 | Period Open → Inputs Prepared → Attendance/Leave Locked → Draft → Calculated → Exception Review → Reviewed → Approved → Locked → Payslips Generated → Payment Prepared → Paid/Reconciled. | NOT_STARTED |
| MR-14.6-002 | Required controls: | NOT_STARTED |
| MR-14.6-003 | - Pre-calculation validation and blocking exceptions | NOT_STARTED |
| MR-14.6-004 | - Preview and employee-level breakdown | NOT_STARTED |
| MR-14.6-005 | - Variance versus previous period | NOT_STARTED |
| MR-14.6-006 | - Negative/zero net-pay review | NOT_STARTED |
| MR-14.6-007 | - Duplicate payroll prevention | NOT_STARTED |
| MR-14.6-008 | - Maker-checker approvals | NOT_STARTED |
| MR-14.6-009 | - Fixed decimal precision and controlled rounding | NOT_STARTED |
| MR-14.6-010 | - Recalculation before lock | NOT_STARTED |
| MR-14.6-011 | - Authorized reopen after lock with reason/version history | NOT_STARTED |
| MR-14.6-012 | - Off-cycle payroll and arrears/retroactive adjustments | NOT_STARTED |
| MR-14.6-013 | - Payment reference, date, method and reconciliation | NOT_STARTED |
| MR-14.6-014 | - Failed/returned payment handling | NOT_STARTED |
| MR-14.6-015 | - Locked/paid values never silently edited | NOT_STARTED |

### 14.7 Payslip

Source: Master §14.7; profile P14.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-14.7-001 | Include company details, employee ID/name, department/designation, period, pay days, basic salary, componentized earnings, overtime/bonus, savings, each deduction, gross, total deductions, net pay, payment status/reference where allowed and generation metadata. Employee sees only own payslips unless wider access is explicitly granted. | NOT_STARTED |

### 14.8 Final settlement

Source: Master §14.8; profile P14.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-14.8-001 | Calculate through a reviewed workflow: | NOT_STARTED |
| MR-14.8-002 | - Salary through final eligible date | NOT_STARTED |
| MR-14.8-003 | - Unpaid attendance/leave adjustments | NOT_STARTED |
| MR-14.8-004 | - Approved overtime/bonus/reimbursement | NOT_STARTED |
| MR-14.8-005 | - Leave encashment where approved | NOT_STARTED |
| MR-14.8-006 | - Notice pay/recovery | NOT_STARTED |
| MR-14.8-007 | - Loan/advance/asset recoveries | NOT_STARTED |
| MR-14.8-008 | - Savings payout/forfeiture according to approved policy | NOT_STARTED |
| MR-14.8-009 | - Tax/statutory effects | NOT_STARTED |
| MR-14.8-010 | - Other approved adjustments | NOT_STARTED |
| MR-14.8-011 | - Net settlement, payment and acknowledgement | NOT_STARTED |
| MR-14.8-012 | Preserve a component breakdown, approval, payment status and settlement version. Do not release experience/clearance artifacts solely based on an unverified automatic calculation. | NOT_STARTED |

### 15. PERFORMANCE, GOALS, KPI AND DEVELOPMENT

Source: Master §15; profile P15.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-15-001 | - Role-specific job responsibilities and competency frameworks | NOT_STARTED |
| MR-15-002 | - Goal periods and weighted objectives without forced ranking | NOT_STARTED |
| MR-15-003 | - Daily work updates only where operationally needed | NOT_STARTED |
| MR-15-004 | - Weekly/monthly/quarterly reviews | NOT_STARTED |
| MR-15-005 | - Self-review, manager review, employee acknowledgement/comments and appeal/clarification | NOT_STARTED |
| MR-15-006 | - Evidence, feedback, achievements, support needs and development actions | NOT_STARTED |
| MR-15-007 | - Calibration permission and audit where used | NOT_STARTED |
| MR-15-008 | - KPI definitions by role, versioned and effective-dated | NOT_STARTED |
| MR-15-009 | - Avoid vanity metrics or targets that encourage unhealthy/artificial behaviour | NOT_STARTED |
| MR-15-010 | Examples: | NOT_STARTED |
| MR-15-011 | - Designer: quality, revision rate, deadline, brand consistency | NOT_STARTED |
| MR-15-012 | - Developer: delivery, quality, defects, maintainability, documentation and collaboration | NOT_STARTED |
| MR-15-013 | - Sales: qualified activity, conversion, revenue and quality/compliance | NOT_STARTED |
| MR-15-014 | - HR: hiring, document completion, attendance/payroll coordination accuracy and issue resolution | NOT_STARTED |
| MR-15-015 | Performance outcomes may inform confirmation, development, salary review and promotion but must not automatically cause disciplinary or termination action. | NOT_STARTED |

### 15.1 Training and skills

Source: Master §15.1; profile P15.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-15.1-001 | Maintain skill catalogue, current/target level, gap, training plan, session, trainer, materials, attendance, practice tasks, evaluation, certification/expiry, manager feedback and effectiveness review. | NOT_STARTED |
| MR-15.1-002 | Career path: Training → Practice → Evaluation → Independent Work → Advanced Responsibility. | NOT_STARTED |

### 15.2 Expert/junior continuity

Source: Master §15.2; profile P15.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-15.2-001 | For critical roles maintain expert, trained backup, SOP, video/material reference, practice date, readiness status and review. Use PASS / FAIL / ACTION REQUIRED, not employee ranking. | NOT_STARTED |

### 16. DISCIPLINE, GRIEVANCE AND EMPLOYEE RELATIONS

Source: Master §16; profile P16.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### 16.1 Fair disciplinary workflow

Source: Master §16.1; profile P16.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-16.1-001 | Issue → preliminary review → evidence → confidential discussion → employee response → informal/verbal action where appropriate → written warning → corrective action/PIP → final warning where appropriate → decision/appeal → closure. | NOT_STARTED |
| MR-16.1-002 | No automatic punishment from attendance/performance data. Record allegation separately from substantiated findings. Control confidentiality and conflicts of interest. | NOT_STARTED |

### 16.2 PIP

Source: Master §16.2; profile P16.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-16.2-001 | Include issue, expected standard, gap, measurable target, support/training, review dates, employee/manager comments, evidence and final outcome. Purpose is improvement and clarity. | NOT_STARTED |

### 16.3 Grievance, harassment and whistleblowing

Source: Master §16.3; profile P16.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-16.3-001 | Add confidential case management for grievance, harassment complaint, discrimination concern, retaliation concern, ethics/whistleblowing and workplace conflict: | NOT_STARTED |
| MR-16.3-002 | - Restricted intake and case permissions | NOT_STARTED |
| MR-16.3-003 | - Safe alternative approver if the normal manager is implicated | NOT_STARTED |
| MR-16.3-004 | - Evidence and interview records | NOT_STARTED |
| MR-16.3-005 | - Investigation assignment and conflict check | NOT_STARTED |
| MR-16.3-006 | - Interim protection actions | NOT_STARTED |
| MR-16.3-007 | - Findings, decision, appeal and closure | NOT_STARTED |
| MR-16.3-008 | - Anti-retaliation reminders | NOT_STARTED |
| MR-16.3-009 | - Retention/legal-hold configuration | NOT_STARTED |
| MR-16.3-010 | Do not expose confidential case details in general employee timelines or ordinary manager reports. | NOT_STARTED |

### 16.4 Health, safety and incidents

Source: Master §16.4; profile P16.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-16.4-001 | Support workplace accident/incident reporting, emergency contact process, immediate action, investigation, corrective action and closure where applicable. Medical data must be minimized and highly restricted. | NOT_STARTED |

### 17. EMPLOYEE SELF-SERVICE AND HR REQUESTS

Source: Master §17; profile P17.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-17-001 | Employees can view their authorized profile, attendance, leave, payslips, documents, policies, training, performance feedback, assets and request history. | NOT_STARTED |
| MR-17-002 | Requests include leave, attendance correction, profile/document update, shift change, remote work, short permission, salary/employment certificate, experience letter, advance/loan where approved, grievance and other HR requests. | NOT_STARTED |
| MR-17-003 | Each request has ID, type, details, attachments, submitted date, status, workflow version, current approver, decisions, remarks, timestamps, SLA/due date, escalation and cancellation/withdrawal rules. | NOT_STARTED |
| MR-17-004 | Support proxy submission by authorized HR with clear `submittedFor` and `submittedBy` records. Prevent self-approval. | NOT_STARTED |

### 18. COMMUNICATION, NOTIFICATIONS AND ESCALATIONS

Source: Master §18; profile P18.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-18-001 | - In-app and approved email notifications; SMS/other channels only after provider approval. | NOT_STARTED |
| MR-18-002 | - Templates are versioned and support company branding. | NOT_STARTED |
| MR-18-003 | - Notify only users authorized to see the subject. | NOT_STARTED |
| MR-18-004 | - Reminders for probation, documents, contracts, leave, attendance exceptions, payroll deadlines, training, assets, notice/exit and approvals. | NOT_STARTED |
| MR-18-005 | - Escalation for overdue approvals with configurable SLA. | NOT_STARTED |
| MR-18-006 | - Delegation/substitute approver with effective dates; no permanent privilege inheritance. | NOT_STARTED |
| MR-18-007 | - Notification delivery status, retry and failure log. | NOT_STARTED |
| MR-18-008 | - Sensitive information must not appear unnecessarily in email subject/push previews. | NOT_STARTED |
| MR-18-009 | - Important HR decisions require an in-system written record even if discussed verbally. | NOT_STARTED |

### 19. ASSET, ACCOUNT AND ACCESS MANAGEMENT

Source: Master §19; profile P19.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-19-001 | Track asset category, asset ID/tag, serial, model, ownership, condition, location, issue/return dates, accessories, acknowledgement, damage/loss, repair, recovery amount, evidence and lifecycle status. | NOT_STARTED |
| MR-19-002 | Support issuance, transfer, temporary loan, return, damage review, lost/stolen and disposal with authorization. | NOT_STARTED |
| MR-19-003 | Maintain access checklist for company email, source control, cloud, project tools, client systems, VPN, licenses and physical access. Store references/ownership status—not plaintext passwords. Use an approved password manager for secrets. | NOT_STARTED |
| MR-19-004 | Joining, transfer, suspension and exit trigger access review tasks. Access removal must be confirmed, not merely requested. | NOT_STARTED |

### 20. RESIGNATION, TERMINATION, EXIT AND REHIRE

Source: Master §20; profile P20.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### 20.1 Exit types

Source: Master §20.1; profile P20.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-20.1-001 | Resignation, termination, probation discontinuation, contract completion, retirement, absconding/unauthorized absence subject to due process, death where required and other approved exit. | NOT_STARTED |

### 20.2 Exit workflow

Source: Master §20.2; profile P20.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-20.2-001 | Notice/decision → HR validation → manager/management approval where required → notice tracking → handover/knowledge transfer → asset return → access removal → attendance/leave finalization → payroll/final settlement → exit interview → letters → record closure/archive. | NOT_STARTED |
| MR-20.2-002 | Track resignation date, reason, notice requirement, start, expected/approved exit date, early release, waived/recovered notice, absence during notice, final working day and clearance statuses. | NOT_STARTED |

### 20.3 Handover

Source: Master §20.3; profile P20.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-20.3-001 | Track active projects, tasks, deadlines, client communication, files, SOPs, risks, outstanding issues, authorized account/access transfer and receiving employee acceptance. Never put plaintext credentials in handover forms. | NOT_STARTED |

### 20.4 Rehire

Source: Master §20.4; profile P20.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-20.4-001 | Rehire preserves the employee/person identity, previous employment, exit and settlement history. Create a new employment period, new onboarding/eligibility assignments and conflict checks. Do not reactivate old access, salary, shift or leave balances automatically. | NOT_STARTED |

### 21. BUSINESS CONTINUITY

Source: Master §21; profile P21.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-21-001 | For every critical role maintain: | NOT_STARTED |
| MR-21-002 | - Critical responsibilities and systems | NOT_STARTED |
| MR-21-003 | - Central file/SOP locations | NOT_STARTED |
| MR-21-004 | - Authorized company-account ownership | NOT_STARTED |
| MR-21-005 | - Primary and backup employee | NOT_STARTED |
| MR-21-006 | - Backup training/practice date | NOT_STARTED |
| MR-21-007 | - Active projects, clients, deadlines and risks | NOT_STARTED |
| MR-21-008 | - Emergency absence plan | NOT_STARTED |
| MR-21-009 | - Readiness: PASS / FAIL / ACTION REQUIRED | NOT_STARTED |
| MR-21-010 | Emergency unavailability playbook must define actions for first hour, 24 hours, 3 days, 7 days and 30 days, covering safety/welfare contact, access security, task ownership, client continuity, documentation, replacement/support and HR/payroll handling. | NOT_STARTED |

### 22. REPORTS, DASHBOARDS AND EXPORTS

Source: Master §22; profile P22.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |

### 22.1 Dashboard

Source: Master §22.1; profile P22.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-22.1-001 | Permission-scoped cards/alerts for total headcount, active/probation/notice employees, remote/office/hybrid, joiners/exits, attendance, late/absent/on leave, missing documents, HR requests, probation/contract/document expiry, payroll status, training and continuity readiness. | CONFLICT_FOUND |

### 22.2 Reports

Source: Master §22.2; profile P22.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-22.2-001 | Daily: attendance, late, absent, leave and exceptions. | NOT_STARTED |
| MR-22.2-002 | Weekly: attendance summary, recruitment, onboarding, documents, training and requests. | NOT_STARTED |
| MR-22.2-003 | Monthly: headcount, joiners/exits, attendance, leave, overtime, payroll, salary changes, performance, warnings, documents and department metrics. | NOT_STARTED |
| MR-22.2-004 | Quarterly/annual: turnover, retention, workforce trends, skills, succession/backup readiness and critical dependencies. | NOT_STARTED |
| MR-22.2-005 | Also support employee history, login/session, audit, export, device/raw-log, asset, grievance-restricted, payroll variance and final settlement reports. | NOT_STARTED |

### 22.3 Export control

Source: Master §22.3; profile P22.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-22.3-001 | - PDF, XLSX and DOCX as applicable. | NOT_STARTED |
| MR-22.3-002 | - Official logo/company name, report title, filters/period, generated time and generated-by identity. | NOT_STARTED |
| MR-22.3-003 | - Permission-aware columns and masking. | NOT_STARTED |
| MR-22.3-004 | - Large exports generated asynchronously with expiry. | NOT_STARTED |
| MR-22.3-005 | - Export activity logged with type, filters summary, row count, requester and status. | NOT_STARTED |
| MR-22.3-006 | - Prevent formula injection in spreadsheet exports. | NOT_STARTED |
| MR-22.3-007 | - Optional watermark/classification for sensitive exports. | NOT_STARTED |

### 23. AUDIT, HISTORY AND DATA INTEGRITY

Source: Master §23; profile P23.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-23-001 | Audit sensitive actions: authentication, permissions, employee status, documents, attendance, leave, salary, payroll, savings, assets, performance, discipline, grievance, exports, access and exit. | NOT_STARTED |
| MR-23-002 | Audit stores actor, authorized context, action, entity, timestamp, request/correlation ID, reason and safe old/new metadata. Never store plaintext passwords, tokens, CNIC, bank/tax data, full sensitive documents or medical/grievance content in generic audit payloads. | NOT_STARTED |
| MR-23-003 | Audit records are append-only. Application behavior must prevent ordinary update/delete. Use idempotency for imports, payroll runs, device events and retried commands. Use transactions for multi-record financial/lifecycle changes. | NOT_STARTED |
| MR-23-004 | Soft archive is not deletion. Retention expiry, privacy deletion and legal hold require separate approved workflows. | NOT_STARTED |

### 24. SECURITY AND PRIVACY

Source: Master §24; profile P24.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-24-001 | - Administrator-enrolled users only; no public sign-up. | PARTIALLY_COMPLETE |
| MR-24-002 | - Argon2id password hashing where local credentials are used. | CONFLICT_FOUND |
| MR-24-003 | - Strong password policy, rate limiting, lockout and secure reset. | PARTIALLY_COMPLETE |
| MR-24-004 | - MFA capability, mandatory for privileged roles when approved/configured. | NOT_STARTED |
| MR-24-005 | - Secure HttpOnly/SameSite cookies; session rotation and revocation. | CONFLICT_FOUND |
| MR-24-006 | - Accurate session states: active, logged out, expired, revoked/forced and abandoned where exact logout is unknown. | CONFLICT_FOUND |
| MR-24-007 | - CSRF protection for cookie-authenticated mutations. | NOT_STARTED |
| MR-24-008 | - Input validation with schemas on the server. | PARTIALLY_COMPLETE |
| MR-24-009 | - Output encoding, parameterized ORM access and safe file handling. | PARTIALLY_COMPLETE |
| MR-24-010 | - RBAC plus organization scope on every server operation. | CONFLICT_FOUND |
| MR-24-011 | - Field encryption/masking for identity, bank, tax, emergency-contact and sensitive file references according to the approved key-management design. | CONFLICT_FOUND |
| MR-24-012 | - Secrets only in protected environment/configuration stores; rotation and recovery procedures. | PARTIALLY_COMPLETE |
| MR-24-013 | - TLS in transit and encryption at rest where available. | PARTIALLY_COMPLETE |
| MR-24-014 | - Security headers, dependency scanning, logging/monitoring and incident response. | NOT_STARTED |
| MR-24-015 | - Account termination/revocation on exit. | NOT_STARTED |
| MR-24-016 | - Data minimization, purpose limitation, consent/legal basis where required, retention and legal hold. | NOT_STARTED |
| MR-24-017 | - Do not collect invasive screenshots, webcam, keystrokes, private browsing or raw biometric templates. | PARTIALLY_COMPLETE |
| MR-24-018 | Cross-company/tenant access attempts must be tested explicitly even though the initial deployment is one company. | CONFLICT_FOUND |

### 25. BACKUP, RECOVERY AND OPERATIONS

Source: Master §25; profile P25.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-25-001 | Define and approve before production: | NOT_STARTED |
| MR-25-002 | - Backup frequency and encryption | NOT_STARTED |
| MR-25-003 | - Database plus private files plus configuration coverage | NOT_STARTED |
| MR-25-004 | - Off-host/off-site copy | NOT_STARTED |
| MR-25-005 | - Retention schedule | NOT_STARTED |
| MR-25-006 | - Access to backups | NOT_STARTED |
| MR-25-007 | - Restore runbook | NOT_STARTED |
| MR-25-008 | - Regular restoration tests | NOT_STARTED |
| MR-25-009 | - RPO (maximum acceptable data loss) and RTO (maximum acceptable recovery time) | NOT_STARTED |
| MR-25-010 | - Disaster recovery responsibilities | NOT_STARTED |
| MR-25-011 | - Monitoring for application, jobs, database, storage, device connector, email and backups | NOT_STARTED |
| MR-25-012 | - Log retention and alerting | NOT_STARTED |
| MR-25-013 | - Deployment rollback and database migration recovery | NOT_STARTED |
| MR-25-014 | Backups are not complete until restoration is successfully tested. | NOT_STARTED |

### 26. NON-FUNCTIONAL REQUIREMENTS

Source: Master §26; profile P26.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-26-001 | - Responsive desktop/tablet/mobile web interface. | PARTIALLY_COMPLETE |
| MR-26-002 | - Light and dark themes; print/export theme remains professional and stable. | PARTIALLY_COMPLETE |
| MR-26-003 | - WCAG-oriented keyboard navigation, labels, focus visibility, contrast and error messages. | PARTIALLY_COMPLETE |
| MR-26-004 | - Pagination/virtualization for large tables; indexed common filters. | PARTIALLY_COMPLETE |
| MR-26-005 | - Define measurable response-time and concurrency targets after hosting capacity review. | PARTIALLY_COMPLETE |
| MR-26-006 | - Background jobs for notifications, reports, imports and device sync with retries and observability. | PARTIALLY_COMPLETE |
| MR-26-007 | - Localization-ready date/time/number/currency formatting; initial English UI. | PARTIALLY_COMPLETE |
| MR-26-008 | - UTC persistence with explicit business timezone conversion. | PARTIALLY_COMPLETE |
| MR-26-009 | - No floating-point arithmetic for money; use fixed decimals and controlled rounding. | PARTIALLY_COMPLETE |
| MR-26-010 | - Reliable validation and user-friendly error states without leaking internal data. | PARTIALLY_COMPLETE |
| MR-26-011 | - Search, filters, saved views and stable sorting. | PARTIALLY_COMPLETE |
| MR-26-012 | - Import preview, validation report, duplicate strategy and rollback for bulk employee/attendance/master-data imports. | PARTIALLY_COMPLETE |
| MR-26-013 | - API versioning/authentication/rate limits for connector/mobile integrations. | PARTIALLY_COMPLETE |

### 27. REQUIRED TEMPLATES AND LETTERS

Source: Master §27; profile P27.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-27-001 | Provide configurable, versioned templates with approval and generated-document history for: | NOT_STARTED |
| MR-27-002 | 1. Manpower request | NOT_STARTED |
| MR-27-003 | 2. Job description | NOT_STARTED |
| MR-27-004 | 3. Interview evaluation | NOT_STARTED |
| MR-27-005 | 4. Offer and offer revision | NOT_STARTED |
| MR-27-006 | 5. Employee registration | NOT_STARTED |
| MR-27-007 | 6. Joining confirmation | NOT_STARTED |
| MR-27-008 | 7. Onboarding/document checklists | NOT_STARTED |
| MR-27-009 | 8. Probation evaluation | NOT_STARTED |
| MR-27-010 | 9. Confirmation/extension/discontinuation | NOT_STARTED |
| MR-27-011 | 10. Leave and attendance correction | NOT_STARTED |
| MR-27-012 | 11. Remote/shift/HR requests | NOT_STARTED |
| MR-27-013 | 12. Salary/employment certificate | NOT_STARTED |
| MR-27-014 | 13. Warning, employee response, investigation and PIP | NOT_STARTED |
| MR-27-015 | 14. Performance review and promotion recommendation | NOT_STARTED |
| MR-27-016 | 15. Salary revision | NOT_STARTED |
| MR-27-017 | 16. Training plan/evaluation | NOT_STARTED |
| MR-27-018 | 17. Asset issuance/transfer/return | NOT_STARTED |
| MR-27-019 | 18. Resignation acknowledgement and notice checklist | NOT_STARTED |
| MR-27-020 | 19. Handover/knowledge transfer | NOT_STARTED |
| MR-27-021 | 20. Exit clearance/interview | NOT_STARTED |
| MR-27-022 | 21. Final settlement statement | NOT_STARTED |
| MR-27-023 | 22. Experience/service letter | NOT_STARTED |
| MR-27-024 | Generated letters must retain the template version and data snapshot used. | NOT_STARTED |

### 28. CRITICAL EDGE-CASE ACCEPTANCE SCENARIOS

Source: Master §28; profile P28.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-28-001 | At minimum, test these scenarios: | NOT_STARTED |
| MR-28-002 | 1. First employee ID is `NBSE-0001`; concurrent creation never duplicates an ID. | NOT_STARTED |
| MR-28-003 | 2. Rehire preserves old joining/exit/payroll history and does not restore old access automatically. | NOT_STARTED |
| MR-28-004 | 3. Employee joins or exits mid-payroll period and proration follows the approved method. | NOT_STARTED |
| MR-28-005 | 4. Salary changes mid-period; calculation splits correctly without overwriting history. | NOT_STARTED |
| MR-28-006 | 5. Night shift begins one day and ends next day; punches attach to the correct work date. | NOT_STARTED |
| MR-28-007 | 6. Delayed/out-of-order/duplicate biometric events do not create duplicate attendance. | NOT_STARTED |
| MR-28-008 | 7. Device is offline and later syncs; retries are idempotent and visible. | NOT_STARTED |
| MR-28-009 | 8. Missing check-out creates an exception, not a fabricated time. | NOT_STARTED |
| MR-28-010 | 9. Approved leave replaces absence but never duplicates pay/deduction. | NOT_STARTED |
| MR-28-011 | 10. Leave overlaps a holiday/weekly off and follows the versioned policy. | NOT_STARTED |
| MR-28-012 | 11. Employee with no break allowance never receives dock-fine logic. | NOT_STARTED |
| MR-28-013 | 12. Late threshold boundary at 5:40/5:41 behaves as configured. | NOT_STARTED |
| MR-28-014 | 13. Attendance correction after payroll lock does not silently change paid payroll. | NOT_STARTED |
| MR-28-015 | 14. Approver cannot approve their own request or correction. | NOT_STARTED |
| MR-28-016 | 15. Manager cannot view CNIC, bank, tax or unrestricted salary. | NOT_STARTED |
| MR-28-017 | 16. HR Officer can verify permitted documents but cannot administer roles without explicit permission. | NOT_STARTED |
| MR-28-018 | 17. Employee cannot retrieve another employee’s payslip/document by changing an ID/URL. | NOT_STARTED |
| MR-28-019 | 18. Cross-tenant/company IDs are rejected server-side. | NOT_STARTED |
| MR-28-020 | 19. Uploaded file with forged extension/MIME is rejected. | NOT_STARTED |
| MR-28-021 | 20. Expired/superseded policy remains linked to historical calculations. | NOT_STARTED |
| MR-28-022 | 21. Payroll rerun/retry does not create duplicate rows or deductions. | NOT_STARTED |
| MR-28-023 | 22. Reopened payroll keeps original approved version and complete audit history. | NOT_STARTED |
| MR-28-024 | 23. Savings reversal/refund preserves ledger integrity. | NOT_STARTED |
| MR-28-025 | 24. Negative/zero net pay is flagged for review. | NOT_STARTED |
| MR-28-026 | 25. Exit effective date stops future attendance/payroll/access but permits authorized final settlement. | NOT_STARTED |
| MR-28-027 | 26. Contract/document/probation expiries trigger alerts without exposing sensitive data. | NOT_STARTED |
| MR-28-028 | 27. Delegated approver works only in approved effective dates and scope. | NOT_STARTED |
| MR-28-029 | 28. Suspended/deactivated user sessions are revoked. | NOT_STARTED |
| MR-28-030 | 29. Export masks unauthorized fields and logs the export. | NOT_STARTED |
| MR-28-031 | 30. Backup restoration recreates database-to-file consistency. | NOT_STARTED |

### 29. OPEN DECISIONS — DO NOT INVENT OR HARD-CODE

Source: Master §29; profile P29.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-29-001 | Create/update `OPEN-DECISIONS.md` and block only dependent production behavior for: | BLOCKED_BY_DECISION |
| MR-29-002 | 1. Pakistan employment-law review and payroll jurisdiction. | BLOCKED_BY_DECISION |
| MR-29-003 | 2. Tax, EOBI/social-security or other statutory rules and effective dates. | BLOCKED_BY_DECISION |
| MR-29-004 | 3. Leave types, balances, accrual, carry-forward, encashment and probation eligibility. | BLOCKED_BY_DECISION |
| MR-29-005 | 4. Overtime eligibility, thresholds, rates and approval. | BLOCKED_BY_DECISION |
| MR-29-006 | 5. Payroll cycle boundary semantics, payment date and cutoff. | BLOCKED_BY_DECISION |
| MR-29-007 | 6. Salary proration and daily-rate divisor. | BLOCKED_BY_DECISION |
| MR-29-008 | 7. Exact late repeat rule and deduction legality. | BLOCKED_BY_DECISION |
| MR-29-009 | 8. Exact break dock-fine trigger and deduction legality. | BLOCKED_BY_DECISION |
| MR-29-010 | 9. Half-day/early-departure/absence thresholds. | BLOCKED_BY_DECISION |
| MR-29-011 | 10. Sandwich-rule combinations and exceptions. | BLOCKED_BY_DECISION |
| MR-29-012 | 11. Savings deduction, payout and forfeiture legal/policy approval. | BLOCKED_BY_DECISION |
| MR-29-013 | 12. Notice periods by employment type and notice-pay treatment. | BLOCKED_BY_DECISION |
| MR-29-014 | 13. Rehire leave/balance treatment. | BLOCKED_BY_DECISION |
| MR-29-015 | 14. Payroll approval roles and bank-payment process. | BLOCKED_BY_DECISION |
| MR-29-016 | 15. Record retention, privacy deletion and legal hold. | BLOCKED_BY_DECISION |
| MR-29-017 | 16. Encryption/key management and rotation/recovery. | BLOCKED_BY_DECISION |
| MR-29-018 | 17. Hostinger topology, private storage, background worker and scheduled-job support. | BLOCKED_BY_DECISION |
| MR-29-019 | 18. RPO/RTO and backup destinations. | BLOCKED_BY_DECISION |
| MR-29-020 | 19. Attendance device brand/model and connector deployment. | BLOCKED_BY_DECISION |
| MR-29-021 | 20. Email/notification provider. | BLOCKED_BY_DECISION |
| MR-29-022 | 21. Official legal company details and final logo assets for letters/exports. | BLOCKED_BY_DECISION |
| MR-29-023 | Until approved, implement configuration structure, validation and safe `PENDING_APPROVAL` behavior; do not activate guessed values. | BLOCKED_BY_DECISION |

### 30. PHASED DELIVERY PLAN

Source: Master §30; profile P30.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-30-001 | Reconcile with completed repository work; do not repeat a verified phase. | NOT_STARTED |

### Phase 0 — Governance and baseline

Source: Master §30, Phase 0; profile P30.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-30-P0-001 | Repository audit, requirements matrix, decisions/conflicts, architecture, threat model, test baseline and migration safety. | COMPLETE_AND_VERIFIED |

### Phase 1 — Foundation verification/completion

Source: Master §30, Phase 1; profile P30.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-30-P1-001 | Tenant/company settings, authentication, sessions, RBAC/scopes, users, employee master, effective-dated employment, documents, approvals, audit/security events and secure seed. | PARTIALLY_COMPLETE |

### Phase 2 — Core HR UI and self-service

Source: Master §30, Phase 2; profile P30.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-30-P2-001 | Organization masters, employee directory/profile/history, onboarding, policy acknowledgement, document workflows, requests and role-scoped dashboards. | NOT_STARTED |

### Phase 3 — Shifts, attendance and devices

Source: Master §30, Phase 3; profile P30.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-30-P3-001 | Shift/roster, raw punches, attendance calculation, exception/correction, locking, mock connector and chosen device integration. | NOT_STARTED |

### Phase 4 — Leave, holidays, overtime and time exceptions

Source: Master §30, Phase 4; profile P30.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-30-P4-001 | Policy engine, balances/ledger, approvals, calendar, sandwich configuration, overtime and payroll-ready locks. | NOT_STARTED |

### Phase 5 — Compensation and payroll

Source: Master §30, Phase 5; profile P30.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-30-P5-001 | Salary structures, pay components, deductions/savings ledgers, loans/advances as approved, calculation snapshots, workflow, payslips, payment/reconciliation and final settlement. | NOT_STARTED |

### Phase 6 — Talent and employee relations

Source: Master §30, Phase 6; profile P30.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-30-P6-001 | Recruitment, training/skills, probation, performance/KPI, promotions, PIP, discipline, grievance/harassment and safety incidents. | NOT_STARTED |

### Phase 7 — Assets, exit and continuity

Source: Master §30, Phase 7; profile P30.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-30-P7-001 | Assets/access, resignation/termination, notice, handover, clearance, exit letters, rehire and critical-role continuity. | NOT_STARTED |

### Phase 8 — Reporting, retention and production operations

Source: Master §30, Phase 8; profile P30.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-30-P8-001 | Reports/exports, notification escalation, retention/legal hold, backup/restore tests, observability, security hardening, performance/accessibility and Hostinger production deployment. | NOT_STARTED |
| MR-30-P8-002 | At each phase implement vertical slices: data model → migration → server authorization/validation → services/API → UI → audit → tests → docs → UAT. | NOT_STARTED |

### 31. TESTING AND QUALITY GATES

Source: Master §31; profile P31.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-31-001 | Required test layers: | NOT_STARTED |
| MR-31-002 | - Unit tests for policy/calculation engines and date boundaries | NOT_STARTED |
| MR-31-003 | - Service/integration tests with real database constraints where feasible | NOT_STARTED |
| MR-31-004 | - Authorization tests for every role, scope and sensitive field | NOT_STARTED |
| MR-31-005 | - Cross-tenant/company isolation tests | NOT_STARTED |
| MR-31-006 | - Migration tests on representative data and rollback/recovery rehearsal | NOT_STARTED |
| MR-31-007 | - API validation, idempotency and concurrency tests | NOT_STARTED |
| MR-31-008 | - File upload/download security tests | NOT_STARTED |
| MR-31-009 | - E2E tests for critical workflows | NOT_STARTED |
| MR-31-010 | - Payroll golden-case tests with approved expected calculations | NOT_STARTED |
| MR-31-011 | - Accessibility and responsive UI checks | NOT_STARTED |
| MR-31-012 | - Backup restoration and disaster-recovery exercise before production | NOT_STARTED |
| MR-31-013 | - UAT sign-off from HR, Finance/Payroll and Management for their modules | NOT_STARTED |
| MR-31-014 | Every implementation batch must report: | NOT_STARTED |
| MR-31-015 | - Scope and requirement IDs | NOT_STARTED |
| MR-31-016 | - Acceptance criteria | NOT_STARTED |
| MR-31-017 | - Files changed | NOT_STARTED |
| MR-31-018 | - Database/migration impact | NOT_STARTED |
| MR-31-019 | - Security/privacy impact | NOT_STARTED |
| MR-31-020 | - Commands/tests run and exact results | NOT_STARTED |
| MR-31-021 | - Manual/UAT checks | NOT_STARTED |
| MR-31-022 | - Known limitations/open decisions | NOT_STARTED |
| MR-31-023 | - Rollback/recovery notes | NOT_STARTED |
| MR-31-024 | - Next safe milestone | NOT_STARTED |

### 32. FINAL DEFINITION OF DONE

Source: Master §32; profile P32.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-32-001 | The system is not “100% complete” merely because every menu exists. A requirement is done only when: | NOT_STARTED |
| MR-32-002 | 1. It is approved or explicitly configured as pending decision. | NOT_STARTED |
| MR-32-003 | 2. Database constraints and effective-dated history are correct. | NOT_STARTED |
| MR-32-004 | 3. Server-side validation and permission/scope checks exist. | NOT_STARTED |
| MR-32-005 | 4. Sensitive data is encrypted/masked and not leaked to audit/logs/exports. | NOT_STARTED |
| MR-32-006 | 5. Workflow, approvals, rejection/cancellation/reopen paths and edge cases work. | NOT_STARTED |
| MR-32-007 | 6. Audit and traceability are complete. | NOT_STARTED |
| MR-32-008 | 7. Automated tests and relevant manual/UAT tests pass. | NOT_STARTED |
| MR-32-009 | 8. UI is responsive, accessible and handles empty/loading/error states. | NOT_STARTED |
| MR-32-010 | 9. Documentation, configuration and operational runbooks are current. | NOT_STARTED |
| MR-32-011 | 10. Migration, backup, restore and rollback risks are addressed. | NOT_STARTED |
| MR-32-012 | 11. Production-required legal/policy decisions are approved. | NOT_STARTED |
| MR-32-013 | 12. No previous valid requirement or historical data has been silently lost. | NOT_STARTED |
| MR-32-014 | The final product must support the complete employee journey: | NOT_STARTED |
| MR-32-015 | Recruitment → Selection → Offer → Joining → Registration → Documents → Onboarding → Training → Probation → Confirmation → Active Employment → Attendance/Leave → Performance/Development → Salary/Payroll → Promotion/Discipline where applicable → Resignation/Termination → Notice → Handover → Exit → Final Settlement → Archive/Rehire | NOT_STARTED |
| MR-32-016 | while protecting: | NOT_STARTED |
| MR-32-017 | **Employees + Company + Payroll + Data + Documents + Access + Knowledge + Operations + Historical Evidence + Business Continuity.** | NOT_STARTED |

### 33. REQUIRED RESPONSE FROM THE CURRENT DEVELOPMENT CHAT

Source: Master §33; profile P33.

| Requirement ID | Exact source wording | Final status |
| --- | --- | --- |
| MR-33-001 | After receiving this document, do not immediately code every module. Respond first with: | COMPLETE_AND_VERIFIED |
| MR-33-002 | 1. Repository evidence summary. | COMPLETE_AND_VERIFIED |
| MR-33-003 | 2. Current completed/partial/missing requirements matrix. | COMPLETE_AND_VERIFIED |
| MR-33-004 | 3. Conflicts between this specification and current implementation. | COMPLETE_AND_VERIFIED |
| MR-33-005 | 4. Database/migration safety assessment. | COMPLETE_AND_VERIFIED |
| MR-33-006 | 5. Security and privacy gap assessment. | COMPLETE_AND_VERIFIED |
| MR-33-007 | 6. Open decisions that genuinely block implementation. | COMPLETE_AND_VERIFIED |
| MR-33-008 | 7. Recommended next smallest safe phase with exact acceptance criteria. | COMPLETE_AND_VERIFIED |
| MR-33-009 | 8. Files/models/routes/tests expected to change. | COMPLETE_AND_VERIFIED |
| MR-33-010 | 9. Verification and rollback plan. | COMPLETE_AND_VERIFIED |
| MR-33-011 | Then implement one approved, coherent phase at a time until all non-blocked requirements are complete. Do not ask repeated questions already answered by this document or repository evidence. Ask only decisions whose answer materially changes policy, legal compliance, architecture or data behavior. | NOT_STARTED |

## Phase 1A design addendum

Date: 2026-09-18. This addendum records the user's documentation-only Phase 1A request under Master §30 Phase 1 and §§1.2, 31–33. It does not close C-01–C-11, approve OD-01–OD-21, or claim tests passed. Existing source wording, all 600 source-clause IDs and their product implementation statuses remain unchanged.

| Design record / purpose | Master and existing requirement references | Design evidence | Acceptance / future test evidence | Migration and rollback | Documentation status |
| --- | --- | --- | --- | --- | --- |
| P1A-01 Foundation technical design; preserve valid work while defining owner/auth/access/identity/history/audit boundaries | §§3–5, 13, 23–24, 29–30; MR-4-002, MR-3/3.1/3.2 groups, MR-5.1/5.4 groups, MR-24-002–007/010–012/015/018, MR-23-001–004 | [PHASE-1-FOUNDATION-DESIGN.md](../architecture/PHASE-1-FOUNDATION-DESIGN.md), D-01–D-10, model/change cards M-01–M-33 | Each proposed change has purpose, relationships, constraints/indexes, owner/privacy/history, migration impact/risk and source references; T1-01–31 planned, none executed | Additive staged design; no schema/data change; compatible fallback required after auth/history cutover | COMPLETE_AND_VERIFIED |
| P1A-02 Forward-only migration/backfill plan; preserve administrator, legacy codes, grants and salary history | §§1.1, 1.4, 5.1, 5.4, 23, 25, 31; MR-1.1-006–009, MR-25 group, MR-31-006 | [PHASE-1-MIGRATION-PLAN.md](../architecture/PHASE-1-MIGRATION-PLAN.md), MP-01–MP-08 | Separate expand/backfill/tighten gates, protected preflight/backup, resumability and repair; T1-32–35 planned, no migration or restore executed | A0–A10 are future batches, no migration files created; documented rollback floors and forward repair | COMPLETE_AND_VERIFIED |
| P1A-03 Automated-test foundation plan; replace unsupported completion claims with behavioral acceptance | §§28, 31–32; MR-28-002–003/015–019/026/029/031; MR-31 group | [PHASE-1-TEST-PLAN.md](../testing/PHASE-1-TEST-PLAN.md), TP-01–TP-05, T1-01–35 | Real-database isolation, mapping, auth lifecycle/hash upgrade, ID concurrency, overlap, archive/audit/revocation and preservation tests specified; all test cases NOT_STARTED | Only documentation now; later isolated fixtures and reviewed test harness, no production resets | COMPLETE_AND_VERIFIED |

For these design records, source precedence is the Master plus the latest explicit Phase 1A scope restriction. Proposed owners are engineering/security with HR/operations review; individual approvals remain unassigned. Dependencies are actual protected DB inventory, owner/grant mapping, approved security policy and relevant §29 decisions before dependent activation. Privacy impact is documented prevention of disclosure/history loss; no personal data was read or copied. Document verification is source/link/coverage/write-scope review only. Rollback of this delivery touches only the three new documents and this addendum. Next milestone remains a separately authorized implementation slice, not an automatic continuation from design.
