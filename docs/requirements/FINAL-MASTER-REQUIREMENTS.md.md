# NEXUSBYTE SOLUTIONS HRM SYSTEM

## Final Consolidated, Gap-Corrected and Implementation-Ready Master Requirements

**Document purpose:** Paste this complete document into the current Nexusbyte HRM development conversation. The development agent must inspect the existing repository, reconcile what is already complete, improve incomplete work safely, and implement all remaining approved requirements without losing prior work, history, security or traceability.

**Company:** Nexusbyte Solutions  
**System:** Nexusbyte Solutions HRM System  
**Short name:** Nexusbyte HRM  
**Tenant slug:** `nexusbyte-solutions`  
**Company code:** `NBSO`  
**Employee number sequence:** counter starts at `NBSE-0000`; first issued ID is `NBSE-0001`  
**Timezone:** `Asia/Karachi`  
**Currency:** `PKR`  
**System type:** Private, administrator-enrolled, single-company deployment initially; architecture may retain tenant/company boundaries for security and future scalability  
**Public registration:** Prohibited  
**Initial workforce:** Approximately 15–20 employees, scalable to 25, 50, 100 and 250+  
**Target hosting:** Hostinger-compatible private deployment  
**Web stack:** Next.js App Router, TypeScript, React, Node.js server/API, Prisma and MySQL/MariaDB-compatible database  
**Future mobile client:** React Native/Expo through the same secured API  
**Private files:** Stored outside MySQL in approved private storage; MySQL stores protected metadata and references  
**Exports:** PDF, XLSX and DOCX where specified  

---

# 1. INSTRUCTIONS TO THE DEVELOPMENT AGENT

Act as a senior HR operations architect, payroll/attendance analyst, security architect, database architect, Next.js/TypeScript engineer, Prisma/MySQL engineer, QA lead and deployment engineer.

Do not treat this document as permission to rewrite the project from scratch. Continue the existing system safely.

## 1.1 Mandatory first action: inspect before changing

Before implementing anything:

1. Read `AGENTS.md` completely and obey it.
2. Inspect repository structure, documentation, requirements, open decisions, migrations, Prisma schema, seed, authentication, RBAC, services, routes, pages, tests and Git status.
3. Identify current framework/library versions from the repository; do not downgrade or replace them without an approved reason.
4. Run safe baseline validation: install status, formatting/lint, type-check, unit/integration tests and production build where available.
5. Inspect the database migration history. Never infer production database state only from `schema.prisma`.
6. Do not run destructive migrations, resets or data deletion.
7. Preserve user changes and unrelated dirty-worktree files.
8. Do not expose secrets, passwords, tokens, personal data or encryption keys in code, logs, tests, commits or documentation.

## 1.2 Produce a requirement reconciliation report first

Create or update a traceability matrix with these statuses:

- `COMPLETE_AND_VERIFIED`
- `COMPLETE_BUT_NEEDS_IMPROVEMENT`
- `PARTIALLY_COMPLETE`
- `NOT_STARTED`
- `BLOCKED_BY_DECISION`
- `BLOCKED_BY_EXTERNAL_DEPENDENCY`
- `DEFERRED_WITH_REASON`
- `CONFLICT_FOUND`

For every requirement record:

- Requirement ID and title
- Business purpose
- Source/decision precedence
- Current implementation evidence: files, routes, models, migrations and tests
- Gap or defect
- Security/data/history impact
- Dependencies
- Acceptance criteria
- Implementation phase
- Test evidence
- Migration and rollback considerations
- Final status

Do not mark an item complete merely because a model, route or screen exists. It is complete only when authorization, validation, history, audit, edge cases and tests pass.

## 1.3 Existing foundation that must be verified and preserved

The latest known development baseline reports:

- Prisma foundation: 42 models and 22 enums.
- Migration: `20260904195227_phase1_foundation`.
- Migration output: 42 tables, 75 foreign keys, 41 unique constraints and 62 indexes.
- Initial seed: tenant and company, `NBSO` settings, policy defaults, 21 permissions, 7 roles, bootstrap administrator using Argon2id, and 7 non-sensitive document categories.
- Environment validation uses Zod and has tests.
- `.gitignore` and `.env.example` are hardened.
- `npm audit` was reported as zero vulnerabilities at that checkpoint.

These are status claims, not a substitute for repository evidence. Verify them. Preserve valid completed work. If the repository differs, document the difference before making changes.

## 1.4 Change-control rules

- Existing approved requirements remain valid unless explicitly superseded.
- The latest explicit approved decision takes precedence over an older proposal.
- Never silently remove a field, workflow, permission, report, history record or validation rule.
- Resolve duplicates into one traceable requirement without losing details.
- Record conflicts and stop only the affected implementation area; continue safe independent work.
- Do not invent HR, payroll, tax, savings, leave, overtime or legal policy values.
- Use configurable policies with effective dates instead of hard-coded business rules.
- Use Prisma migrations for schema changes.
- Use server-side authorization and validation; hiding a UI control is not security.
- Make focused changes only. Avoid unrelated refactoring.
- Every phase must end with lint, type-check, focused tests and build, plus migration validation when applicable.

---

# 2. GOVERNANCE, PRINCIPLES AND DEFINITIONS

## 2.1 Core principles

1. Trust employees; do not secretly monitor or spy on them.
2. Measure responsibilities, outcomes, quality, deadlines, communication and professional conduct.
3. Apply transparent, written and consistently configured policies.
4. Protect both employees and the company through due process and accurate records.
5. Never overwrite material history.
6. Use least privilege: each user receives only the minimum access required for the job.
7. Company accounts, data, documents and work products remain under authorized company control.
8. Critical knowledge must be documented and have an authorized backup person.
9. Sensitive decisions and financial adjustments require evidence, approval and audit history.
10. Policies are versioned and effective-dated; future changes must not rewrite past calculations.
11. Store timestamps in UTC and display/calculations in the applicable company/shift timezone, normally `Asia/Karachi`.
12. Posted, locked, paid or finalized records are immutable. Corrections occur through controlled reversals, superseding records or authorized reopening.

## 2.2 Requirement lifecycle

Use: Draft → Proposed → Under Review → Approved → In Development → Under QA → UAT → Accepted/Released. Deferred, Rejected and Superseded items remain in history with reasons.

Each requirement must include ID, description, purpose, owner, priority, dependencies, acceptance criteria, decision status, implementation evidence, test evidence, release and change history.

## 2.3 Legal classification

Any rule affecting working hours, deductions, savings forfeiture, leave, overtime, termination, notice, final settlement, tax, statutory contributions, biometric data, privacy or record retention must be labelled:

> **Company Policy — Legal Review Recommended**

The application must not imply that an internal rule overrides applicable law. Pakistan-specific legal/tax values remain configurable and blocked from production activation until approved by qualified HR/legal/payroll stakeholders.

---

# 3. APPROVED ROLES AND ACCESS MODEL

The approved application roles are:

1. **Tenant Administrator** — tenant-level configuration and authorized company access; no automatic access to every sensitive employee field.
2. **Company Administrator** — company configuration and authorized administration.
3. **HR Administrator** — employee lifecycle, HR policy, documents, approvals and HR operations.
4. **HR Officer** — daily HR operations; document verification is allowed as later approved, but role/permission administration, destructive archive operations and highly sensitive functions require separate explicit permissions.
5. **Manager** — scoped team/department visibility, approvals and performance input; no bank, tax, sensitive identity or unrestricted payroll access.
6. **Employee** — self-service and own authorized records only.
7. **Auditor / Read-only** — permission-scoped read and export access without mutation.

Finance/Payroll, IT/Admin, Attendance Operator, Department Head and Team Lead are functional permission bundles or future roles only if approved. Do not silently create high-privilege roles. No user becomes Platform Administrator through a tenant role. Platform-level administration, if retained technically, must be separately controlled and must not automatically grant company-data access.

## 3.1 Permission dimensions

Permissions must distinguish:

- View, create, edit, submit, verify, approve, reject, cancel, reopen, lock, pay, export, archive and configure.
- Self, direct reports, team, department, branch, company and tenant scopes.
- Normal, confidential, sensitive and highly sensitive data.
- Field-level permissions for salary, CNIC/identity, bank, tax, address, emergency contacts, medical/supporting evidence, performance, warnings, grievances and exit records.

## 3.2 Segregation of duties

- The maker of a sensitive financial or attendance correction should not approve the same action where staffing permits.
- Payroll preparer, reviewer, approver and payment confirmer must be distinguishable.
- A user may not approve their own leave, attendance correction, salary change, expense or HR request.
- Emergency override requires explicit permission, reason and post-action review.

---

# 4. ORGANIZATION AND MASTER DATA

Support effective-dated, audited master data for:

- Tenant, company and company settings
- Branches and work locations
- Departments, teams and cost centres
- Designations, job titles, grades and career levels
- Employment types: permanent/full-time, part-time, intern, contractor/freelancer and other approved types
- Work modes: office, remote and hybrid
- Reporting relationships: primary manager, functional manager and team lead where applicable
- Holiday calendars by company/branch/location
- Shifts, rosters and working-week patterns
- Leave types and policies
- Salary/pay components and deduction types
- Document categories and sensitivity
- Asset types and conditions
- Request, warning, grievance, training and exit categories

Rules:

- Codes are unique within their owner boundary.
- Active referenced values cannot be deleted.
- Deactivation is future-only or requires a safe replacement mapping.
- Historical records continue displaying the original label/code even after deactivation.
- Reporting hierarchies must reject self-reporting and circular manager loops.

---

# 5. EMPLOYEE MASTER AND COMPLETE LIFECYCLE

## 5.1 Permanent employee identity

- Generate the permanent business ID only after authorized registration approval.
- Counter starts from `NBSE-0000`; the first real employee ID is `NBSE-0001`.
- Never reuse an employee ID.
- Rehire uses the same person/employee master and a new employment period unless a later approved policy explicitly requires otherwise.
- Original joining date remains historical and is never overwritten.
- Joining and exit effective dates gate attendance, leave eligibility, access and payroll.

## 5.2 Employee profile

Capture with field-level validation and permissions:

- Legal/full name, official English name, father/guardian name where required, preferred name
- Date of birth, profile photo, gender/marital details only when approved and lawful
- CNIC or approved identity type, masked display, issue/expiry dates and verification
- Personal and work phone/email
- Current and permanent addresses
- One or more emergency contacts with relationship and primary marker
- Department, team, designation, grade, branch, location, cost centre
- Manager and reporting lines
- Employment type, work mode and status
- Joining, registration, probation, confirmation and exit information
- Shift/roster and attendance eligibility
- Leave policy assignment
- Salary/payroll eligibility
- Bank/payment and tax profile with encryption and masking
- Skills, education, experience, certifications and languages where required
- Accessibility/workplace accommodation data only with strict access and consent/legal basis

## 5.3 Lifecycle statuses and scenarios

Support Draft, Pending Verification, Pending Approval, Pre-boarding, Probation, Confirmed, Active, On Leave, Suspended, Notice Period, Contract End Pending, Exited, Resigned, Terminated, Probation Discontinued, Retired, Deceased where lawfully required, and Archived.

Every transition requires allowed-from/allowed-to rules, effective date, reason, actor, approval and evidence where needed.

## 5.4 Effective-dated history

Never overwrite history for:

- Employment periods and rehire
- Branch, location, department, team and cost centre
- Designation, grade and job title
- Manager/reporting line
- Employment type/work mode/status
- Shift and leave policy assignment
- Salary/pay components
- Bank/tax/identity records

Reject overlapping effective-date ranges unless the domain explicitly supports them.

## 5.5 Employee registration workflow

Draft → HR data entry → employee/self completion where allowed → document collection → HR verification → manager/HR approval → Employee ID issuance → account/access provisioning → attendance/leave/payroll enrollment by effective date.

Missing mandatory information must block only the dependent activation steps and be displayed clearly. Never create fake placeholder personal data.

## 5.6 Transfers and changes

Support promotion, demotion where approved, department/branch/team transfer, manager change, designation/grade change, work-mode change, shift change, temporary assignment, secondment where applicable, suspension and reinstatement. Each creates history and triggers relevant access, attendance, leave and payroll impact review.

---

# 6. RECRUITMENT AND HIRING

Implement:

Manpower Request → Budget/Headcount Approval → Job Description → Vacancy → Candidate Application → Screening → Interview Stages → Evaluation → Reference/Background Checks where approved → Selection → Offer → Negotiation/Revision → Acceptance/Decline → Pre-boarding → Joining/No-show.

Required capabilities:

- Vacancy ID, department, location, employment type, headcount, reason, budget range and target date
- Versioned job description and approval
- Candidate source, CV, contact, consent, status and communication history
- Duplicate-candidate detection without unsafe merging
- Interview scheduling, panel, structured scorecard and conflict-of-interest declaration
- Final decision and approval trail
- Offer versions, expiry, acceptance/rejection and joining date
- Talent-pool retention based on approved retention/consent rules
- Convert selected candidate to employee without copying irrelevant recruitment notes
- Record withdrawal, rejection, offer decline, no-show and vacancy cancellation reasons
- Candidate data access, retention and secure deletion/legal hold rules

Templates: manpower request, JD, interview evaluation, selection approval, offer letter and joining confirmation.

---

# 7. ONBOARDING, PRE-BOARDING AND PROBATION

## 7.1 Onboarding plans

Create reusable plans by role/department and individual assignments:

- Pre-joining tasks
- Day 1
- First week
- 30, 60 and 90 days where applicable
- Two-month default probation evaluation checkpoint
- Manager, HR, IT/Admin, trainer and employee tasks
- Dependencies, due dates, reminders, evidence and completion approval

Cover company orientation, policies, job responsibilities, working hours, leave, payroll cycle, security, confidentiality, communication, tools, system access, assets, training and initial goals.

## 7.2 Probation

Default probation is two months but configurable by employment type/individual policy.

Track start/end, attendance, punctuality, learning, behaviour, communication, job knowledge, work quality, task completion, manager feedback and training progress.

Outcomes:

- Confirmed
- Extended with new end date, reason and improvement plan
- Employment discontinued with due process

No automatic confirmation, extension or termination. Notify stakeholders before due date; late decisions remain visible and auditable.

---

# 8. DOCUMENT AND POLICY MANAGEMENT

## 8.1 Employee and company documents

Support CNIC/ID, CV, employee form, appointment/contract letter, confirmation, promotion, salary revision, evaluation, warning, PIP, resignation, experience, education/certification, bank/tax and other approved categories.

For each category configure:

- Mandatory/optional by employment type/status
- Sensitivity
- Submission deadline
- Verification permission
- Expiry and reminder schedule
- Allowed MIME types/extensions and maximum size
- Retention and archive rule
- Whether employee may view/download/update

## 8.2 Storage and versions

- Files stay in private storage; never public URLs.
- Use server-authorized, time-limited download/preview.
- Validate extension, MIME signature and size; malware scan when infrastructure supports it.
- Encrypt sensitive storage references and data where designed.
- Document versions are append-only; replacement creates a new version.
- Log upload, verification, rejection, view, download, export and archive.
- Missing mandatory documents appear on dashboards and onboarding/exit checklists.

## 8.3 Policy management

Policies require version, effective date, owner, approval, audience, legal-review flag, superseded version and acknowledgement requirements. Employees must be able to view the applicable version and acknowledge it. Later policy changes must not rewrite old payroll/attendance outcomes.

Include attendance, leave, working hours, overtime, remote/hybrid work, salary/payroll, savings, performance, promotion, discipline, anti-harassment/grievance, confidentiality, data protection, acceptable use, assets, health/safety, document retention, communication, training, exit and handover policies.

---

# 9. SHIFTS, ROSTERS, ATTENDANCE AND TIME

## 9.1 Configurable defaults

- Default shift: 5:30 PM–2:30 AM
- Alternative shift: 4:30 PM–2:30 AM
- Default weekly off: Saturday and Sunday
- Default break window: 9:30 PM–10:30 PM
- Default 5:30 PM shift grace period: 10 minutes; 5:30–5:40 on time and 5:41 onward late

These are configuration defaults, not hard-coded universal rules.

## 9.2 Shift engine

Support fixed, night/cross-midnight, rotating, flexible, split where approved, temporary, department and employee-specific shifts. Preserve shift assignment history and effective dates. Handle work date versus calendar date correctly for overnight shifts.

Support roster publication, shift swaps, rest-day changes and temporary shift approvals without retroactively changing processed periods.

## 9.3 Raw punches and calculated attendance

Store raw device/manual import events append-only and separately from calculated attendance. Preserve source, external ID, device ID, event timestamp, received timestamp, timezone, direction/type, sequence and deduplication key.

Calculated daily attendance supports:

- Present, Late, Early Departure, Half Day, Absent
- Paid/Unpaid Leave
- Holiday, Weekly Off, Optional/Substitute Holiday
- Remote Work, Field Duty, Business Travel, Training
- Missing Check-in, Missing Check-out, Missing/Invalid Punch
- System/Device Failure and Authorized Override
- Overtime where enabled

## 9.4 Break management

Configure per employee/policy:

- Break allowed
- Paid/unpaid
- Start/end window
- Maximum duration
- Multiple breaks if approved
- Late start, late return and excessive-duration treatment
- Dock fine enabled and amount

Default proposed dock fine is PKR 500 after 10:30 PM, but the precise trigger—late break start, late return or over-duration—remains a required policy decision. Employees without break allowance must not receive dock-fine calculations.

## 9.5 Lateness and punctuality

Default proposed rule: three qualifying lates in a payroll period produce PKR 2,500 punctuality deduction. The system must configure occurrence threshold, amount, repeat behavior (for example 3, 6, 9), reset period, exclusions, manual adjustment and approval. Repeat behavior is not approved until explicitly decided.

## 9.6 Half day, absence and early departure

Configure thresholds and sources. Half-day accumulation supports 0.5 day units. Two half days equal one day for payroll impact, but source records remain separate. Do not automatically infer half day/absence without an approved formula.

## 9.7 Corrections and exceptions

No punch on a scheduled workday defaults to Absent only after evaluating approved leave, holiday, weekly off, work mode/duty, joining/exit date and authorized exception.

Attendance correction workflow:

Employee/HR request → original record preserved → reason/evidence → manager/HR review → approval/rejection → recalculation → dependent payroll impact flag → audit.

Cover forgotten punches, emergency, internet/device outage, field duty, remote work, overnight pairing, duplicate/out-of-order events, clock drift and unknown device user IDs.

## 9.8 Locking

Attendance period: Open → Under Review → Approved → Locked. Reopening requires permission, reason and audit; if payroll depends on it, payroll must be marked stale and reviewed/recalculated rather than silently changing.

---

# 10. ATTENDANCE DEVICE INTEGRATION

- Brand-independent adapter architecture.
- Future support for ZKTeco, eSSL, Suprema, Anviz and compatible devices, subject to selected device/provider.
- Methods: API, webhook, ADMS/push, TCP/IP SDK, cloud API, scheduled polling and CSV/XLSX fallback.
- A secure separate Windows connector for LAN/SDK-only devices.
- Multiple device mappings per employee; prevent duplicate active mapping on the same device.
- Setup wizard, connectivity test, device timezone/clock test, mapping, test punch and activation.
- Idempotency, duplicate detection, queued retry, dead-letter/review queue and no silent loss.
- Device states: online, offline, syncing, auth failure, configuration error, connector stopped and never connected.
- Alert on clock drift, offline state, unknown IDs, failed sync and expiring credentials.
- Signed/authenticated ingestion, rate limiting, replay protection, secret rotation and optional IP allowlisting.
- Do not store biometric templates in the HRM by default. Store enrollment state/mapping and attendance events only.
- Provide a mock device/connector for automated tests, including night shifts, delayed/out-of-order events, duplicates, outages and invalid timestamps.

---

# 11. LEAVE, HOLIDAYS AND ABSENCE

## 11.1 Leave policy engine

Support configurable leave types, including annual, casual, sick, emergency, unpaid, maternity/paternity and other approved categories. Do not activate unapproved balances or legal entitlements.

Each policy can define:

- Eligibility by employment type, grade, branch, gender/legal rule where lawful, probation and service length
- Annual entitlement and grant/accrual method
- Calendar-year, anniversary-year or custom cycle
- Joining-year and exit-year proration
- Carry forward, expiry and maximum accumulation
- Encashment where approved
- Paid/unpaid status
- Full/half-day and hourly/short leave if approved
- Minimum/maximum request duration
- Advance notice and backdated/emergency request rules
- Attachment requirement
- Consecutive-day and blackout limits
- Negative balance behavior
- Approval levels and delegated approver
- Cancellation/recall and balance restoration

## 11.2 Workflow and conflicts

Request → validation → approver(s) → approved/rejected/cancelled/withdrawn → attendance integration → payroll integration.

Prevent overlapping requests, attendance conflicts and double deductions. Handle approver absence, self-approval prohibition, emergency retrospective approval and partial approval.

## 11.3 Leave reasons

Initial valid reasons may include Family Reason, Emergency and Accident. Selecting Other requires remarks. Reasons and evidence access must be privacy-controlled.

## 11.4 Sandwich policy

Implement only through a versioned configurable policy. Preserve original calculated result, override, reason, approver and timestamp. Exact qualifying combinations, holiday/weekend treatment and exceptions require explicit approval and legal review.

## 11.5 Holiday calendar

Support official, company, branch/location, optional and substitute holidays. Holiday changes after attendance/payroll processing require impact analysis and controlled recalculation.

---

# 12. OVERTIME, TIMESHEETS AND DUTY RECORDS

Overtime must be optional and policy-controlled:

- Employee eligibility
- Pre-approval/post-approval
- Minimum threshold, rounding and daily/monthly caps
- Working day, rest day and holiday treatment
- Rate multiplier or time-off-in-lieu
- Raw, calculated, approved and payable hours stored separately
- Cross-midnight overtime
- Payroll integration and rejection reasons

Timesheets/project allocation are a separate optional module from attendance. They may track project/client/task hours without invasive monitoring. Attendance must not be silently replaced by timesheets.

---

# 13. SALARY, COMPENSATION AND BENEFITS

## 13.1 Effective-dated salary structure

Maintain basic salary and approved components such as allowances, bonuses, commissions, benefits, reimbursements and deductions. Classify gross, taxable/non-taxable, employee deduction, employer contribution and net-pay impact.

Every change creates a new effective-dated record with previous value, new value, reason, creator, approver and timestamp. Never overwrite salary history.

## 13.2 Salary review and revision

Support annual, semi-annual, promotion, performance, market adjustment, correction and role-change reviews. Workflow: recommendation → budget/management review → approval → effective date → letter → payroll impact.

## 13.3 Loans, advances and reimbursements

Where approved, support request, approval, amount, installment schedule, outstanding balance, early settlement, pause/adjustment, payroll recovery and ledger. Expense reimbursement requires category, date, evidence, approval, paid status and must not be confused with salary.

---

# 14. PAYROLL AND FINANCIAL CONTROL

## 14.1 Payroll period

Support calendar month, 5th-to-5th, 10th-to-10th, 15th-to-15th and custom cycles. Prevent overlap and gaps. The current proposed default is 5th of current month to 5th of next month, but inclusive/exclusive boundary and payment date must be explicitly approved before activation.

## 14.2 Payroll inputs

Use effective-dated salary, approved attendance, leave, overtime, late/half-day/absence rules, savings, loans/advances, bonuses, allowances, reimbursements, manual adjustments, taxes and statutory contributions.

Take an auditable input snapshot per calculation so later master-data changes do not silently alter a finalized result.

## 14.3 Proration and daily rate

Support calendar-day, working-day, fixed-divisor and payroll-cycle methods. Configure rounding precision and treatment of join, exit, unpaid leave and salary changes mid-period. No method becomes production default without approval.

## 14.4 Central deduction register

Types may include savings, punctuality, unpaid leave, half day, dock fine, absence, loan installment, tax/statutory, recovery and approved manual adjustment.

Every deduction stores source, formula/version, quantity, rate, amount, reason, period, creator, approver, status and reversal link. Never create an unexplained lump sum.

## 14.5 Employee savings

Proposed default: PKR 2,500 monthly, only when basic salary exists and savings is enabled for the employee.

Maintain a separate immutable savings ledger for deduction, adjustment, refund/payout, forfeiture decision, reversal and running balance. Never use only a mutable total.

Urgent resignation forfeiture, notice-completed payout and probation-exit non-payment are proposed company rules and must remain disabled or clearly pending until legal/policy approval and employee agreement requirements are satisfied.

## 14.6 Payroll workflow

Period Open → Inputs Prepared → Attendance/Leave Locked → Draft → Calculated → Exception Review → Reviewed → Approved → Locked → Payslips Generated → Payment Prepared → Paid/Reconciled.

Required controls:

- Pre-calculation validation and blocking exceptions
- Preview and employee-level breakdown
- Variance versus previous period
- Negative/zero net-pay review
- Duplicate payroll prevention
- Maker-checker approvals
- Fixed decimal precision and controlled rounding
- Recalculation before lock
- Authorized reopen after lock with reason/version history
- Off-cycle payroll and arrears/retroactive adjustments
- Payment reference, date, method and reconciliation
- Failed/returned payment handling
- Locked/paid values never silently edited

## 14.7 Payslip

Include company details, employee ID/name, department/designation, period, pay days, basic salary, componentized earnings, overtime/bonus, savings, each deduction, gross, total deductions, net pay, payment status/reference where allowed and generation metadata. Employee sees only own payslips unless wider access is explicitly granted.

## 14.8 Final settlement

Calculate through a reviewed workflow:

- Salary through final eligible date
- Unpaid attendance/leave adjustments
- Approved overtime/bonus/reimbursement
- Leave encashment where approved
- Notice pay/recovery
- Loan/advance/asset recoveries
- Savings payout/forfeiture according to approved policy
- Tax/statutory effects
- Other approved adjustments
- Net settlement, payment and acknowledgement

Preserve a component breakdown, approval, payment status and settlement version. Do not release experience/clearance artifacts solely based on an unverified automatic calculation.

---

# 15. PERFORMANCE, GOALS, KPI AND DEVELOPMENT

- Role-specific job responsibilities and competency frameworks
- Goal periods and weighted objectives without forced ranking
- Daily work updates only where operationally needed
- Weekly/monthly/quarterly reviews
- Self-review, manager review, employee acknowledgement/comments and appeal/clarification
- Evidence, feedback, achievements, support needs and development actions
- Calibration permission and audit where used
- KPI definitions by role, versioned and effective-dated
- Avoid vanity metrics or targets that encourage unhealthy/artificial behaviour

Examples:

- Designer: quality, revision rate, deadline, brand consistency
- Developer: delivery, quality, defects, maintainability, documentation and collaboration
- Sales: qualified activity, conversion, revenue and quality/compliance
- HR: hiring, document completion, attendance/payroll coordination accuracy and issue resolution

Performance outcomes may inform confirmation, development, salary review and promotion but must not automatically cause disciplinary or termination action.

## 15.1 Training and skills

Maintain skill catalogue, current/target level, gap, training plan, session, trainer, materials, attendance, practice tasks, evaluation, certification/expiry, manager feedback and effectiveness review.

Career path: Training → Practice → Evaluation → Independent Work → Advanced Responsibility.

## 15.2 Expert/junior continuity

For critical roles maintain expert, trained backup, SOP, video/material reference, practice date, readiness status and review. Use PASS / FAIL / ACTION REQUIRED, not employee ranking.

---

# 16. DISCIPLINE, GRIEVANCE AND EMPLOYEE RELATIONS

## 16.1 Fair disciplinary workflow

Issue → preliminary review → evidence → confidential discussion → employee response → informal/verbal action where appropriate → written warning → corrective action/PIP → final warning where appropriate → decision/appeal → closure.

No automatic punishment from attendance/performance data. Record allegation separately from substantiated findings. Control confidentiality and conflicts of interest.

## 16.2 PIP

Include issue, expected standard, gap, measurable target, support/training, review dates, employee/manager comments, evidence and final outcome. Purpose is improvement and clarity.

## 16.3 Grievance, harassment and whistleblowing

Add confidential case management for grievance, harassment complaint, discrimination concern, retaliation concern, ethics/whistleblowing and workplace conflict:

- Restricted intake and case permissions
- Safe alternative approver if the normal manager is implicated
- Evidence and interview records
- Investigation assignment and conflict check
- Interim protection actions
- Findings, decision, appeal and closure
- Anti-retaliation reminders
- Retention/legal-hold configuration

Do not expose confidential case details in general employee timelines or ordinary manager reports.

## 16.4 Health, safety and incidents

Support workplace accident/incident reporting, emergency contact process, immediate action, investigation, corrective action and closure where applicable. Medical data must be minimized and highly restricted.

---

# 17. EMPLOYEE SELF-SERVICE AND HR REQUESTS

Employees can view their authorized profile, attendance, leave, payslips, documents, policies, training, performance feedback, assets and request history.

Requests include leave, attendance correction, profile/document update, shift change, remote work, short permission, salary/employment certificate, experience letter, advance/loan where approved, grievance and other HR requests.

Each request has ID, type, details, attachments, submitted date, status, workflow version, current approver, decisions, remarks, timestamps, SLA/due date, escalation and cancellation/withdrawal rules.

Support proxy submission by authorized HR with clear `submittedFor` and `submittedBy` records. Prevent self-approval.

---

# 18. COMMUNICATION, NOTIFICATIONS AND ESCALATIONS

- In-app and approved email notifications; SMS/other channels only after provider approval.
- Templates are versioned and support company branding.
- Notify only users authorized to see the subject.
- Reminders for probation, documents, contracts, leave, attendance exceptions, payroll deadlines, training, assets, notice/exit and approvals.
- Escalation for overdue approvals with configurable SLA.
- Delegation/substitute approver with effective dates; no permanent privilege inheritance.
- Notification delivery status, retry and failure log.
- Sensitive information must not appear unnecessarily in email subject/push previews.
- Important HR decisions require an in-system written record even if discussed verbally.

---

# 19. ASSET, ACCOUNT AND ACCESS MANAGEMENT

Track asset category, asset ID/tag, serial, model, ownership, condition, location, issue/return dates, accessories, acknowledgement, damage/loss, repair, recovery amount, evidence and lifecycle status.

Support issuance, transfer, temporary loan, return, damage review, lost/stolen and disposal with authorization.

Maintain access checklist for company email, source control, cloud, project tools, client systems, VPN, licenses and physical access. Store references/ownership status—not plaintext passwords. Use an approved password manager for secrets.

Joining, transfer, suspension and exit trigger access review tasks. Access removal must be confirmed, not merely requested.

---

# 20. RESIGNATION, TERMINATION, EXIT AND REHIRE

## 20.1 Exit types

Resignation, termination, probation discontinuation, contract completion, retirement, absconding/unauthorized absence subject to due process, death where required and other approved exit.

## 20.2 Exit workflow

Notice/decision → HR validation → manager/management approval where required → notice tracking → handover/knowledge transfer → asset return → access removal → attendance/leave finalization → payroll/final settlement → exit interview → letters → record closure/archive.

Track resignation date, reason, notice requirement, start, expected/approved exit date, early release, waived/recovered notice, absence during notice, final working day and clearance statuses.

## 20.3 Handover

Track active projects, tasks, deadlines, client communication, files, SOPs, risks, outstanding issues, authorized account/access transfer and receiving employee acceptance. Never put plaintext credentials in handover forms.

## 20.4 Rehire

Rehire preserves the employee/person identity, previous employment, exit and settlement history. Create a new employment period, new onboarding/eligibility assignments and conflict checks. Do not reactivate old access, salary, shift or leave balances automatically.

---

# 21. BUSINESS CONTINUITY

For every critical role maintain:

- Critical responsibilities and systems
- Central file/SOP locations
- Authorized company-account ownership
- Primary and backup employee
- Backup training/practice date
- Active projects, clients, deadlines and risks
- Emergency absence plan
- Readiness: PASS / FAIL / ACTION REQUIRED

Emergency unavailability playbook must define actions for first hour, 24 hours, 3 days, 7 days and 30 days, covering safety/welfare contact, access security, task ownership, client continuity, documentation, replacement/support and HR/payroll handling.

---

# 22. REPORTS, DASHBOARDS AND EXPORTS

## 22.1 Dashboard

Permission-scoped cards/alerts for total headcount, active/probation/notice employees, remote/office/hybrid, joiners/exits, attendance, late/absent/on leave, missing documents, HR requests, probation/contract/document expiry, payroll status, training and continuity readiness.

## 22.2 Reports

Daily: attendance, late, absent, leave and exceptions.  
Weekly: attendance summary, recruitment, onboarding, documents, training and requests.  
Monthly: headcount, joiners/exits, attendance, leave, overtime, payroll, salary changes, performance, warnings, documents and department metrics.  
Quarterly/annual: turnover, retention, workforce trends, skills, succession/backup readiness and critical dependencies.

Also support employee history, login/session, audit, export, device/raw-log, asset, grievance-restricted, payroll variance and final settlement reports.

## 22.3 Export control

- PDF, XLSX and DOCX as applicable.
- Official logo/company name, report title, filters/period, generated time and generated-by identity.
- Permission-aware columns and masking.
- Large exports generated asynchronously with expiry.
- Export activity logged with type, filters summary, row count, requester and status.
- Prevent formula injection in spreadsheet exports.
- Optional watermark/classification for sensitive exports.

---

# 23. AUDIT, HISTORY AND DATA INTEGRITY

Audit sensitive actions: authentication, permissions, employee status, documents, attendance, leave, salary, payroll, savings, assets, performance, discipline, grievance, exports, access and exit.

Audit stores actor, authorized context, action, entity, timestamp, request/correlation ID, reason and safe old/new metadata. Never store plaintext passwords, tokens, CNIC, bank/tax data, full sensitive documents or medical/grievance content in generic audit payloads.

Audit records are append-only. Application behavior must prevent ordinary update/delete. Use idempotency for imports, payroll runs, device events and retried commands. Use transactions for multi-record financial/lifecycle changes.

Soft archive is not deletion. Retention expiry, privacy deletion and legal hold require separate approved workflows.

---

# 24. SECURITY AND PRIVACY

- Administrator-enrolled users only; no public sign-up.
- Argon2id password hashing where local credentials are used.
- Strong password policy, rate limiting, lockout and secure reset.
- MFA capability, mandatory for privileged roles when approved/configured.
- Secure HttpOnly/SameSite cookies; session rotation and revocation.
- Accurate session states: active, logged out, expired, revoked/forced and abandoned where exact logout is unknown.
- CSRF protection for cookie-authenticated mutations.
- Input validation with schemas on the server.
- Output encoding, parameterized ORM access and safe file handling.
- RBAC plus organization scope on every server operation.
- Field encryption/masking for identity, bank, tax, emergency-contact and sensitive file references according to the approved key-management design.
- Secrets only in protected environment/configuration stores; rotation and recovery procedures.
- TLS in transit and encryption at rest where available.
- Security headers, dependency scanning, logging/monitoring and incident response.
- Account termination/revocation on exit.
- Data minimization, purpose limitation, consent/legal basis where required, retention and legal hold.
- Do not collect invasive screenshots, webcam, keystrokes, private browsing or raw biometric templates.

Cross-company/tenant access attempts must be tested explicitly even though the initial deployment is one company.

---

# 25. BACKUP, RECOVERY AND OPERATIONS

Define and approve before production:

- Backup frequency and encryption
- Database plus private files plus configuration coverage
- Off-host/off-site copy
- Retention schedule
- Access to backups
- Restore runbook
- Regular restoration tests
- RPO (maximum acceptable data loss) and RTO (maximum acceptable recovery time)
- Disaster recovery responsibilities
- Monitoring for application, jobs, database, storage, device connector, email and backups
- Log retention and alerting
- Deployment rollback and database migration recovery

Backups are not complete until restoration is successfully tested.

---

# 26. NON-FUNCTIONAL REQUIREMENTS

- Responsive desktop/tablet/mobile web interface.
- Light and dark themes; print/export theme remains professional and stable.
- WCAG-oriented keyboard navigation, labels, focus visibility, contrast and error messages.
- Pagination/virtualization for large tables; indexed common filters.
- Define measurable response-time and concurrency targets after hosting capacity review.
- Background jobs for notifications, reports, imports and device sync with retries and observability.
- Localization-ready date/time/number/currency formatting; initial English UI.
- UTC persistence with explicit business timezone conversion.
- No floating-point arithmetic for money; use fixed decimals and controlled rounding.
- Reliable validation and user-friendly error states without leaking internal data.
- Search, filters, saved views and stable sorting.
- Import preview, validation report, duplicate strategy and rollback for bulk employee/attendance/master-data imports.
- API versioning/authentication/rate limits for connector/mobile integrations.

---

# 27. REQUIRED TEMPLATES AND LETTERS

Provide configurable, versioned templates with approval and generated-document history for:

1. Manpower request
2. Job description
3. Interview evaluation
4. Offer and offer revision
5. Employee registration
6. Joining confirmation
7. Onboarding/document checklists
8. Probation evaluation
9. Confirmation/extension/discontinuation
10. Leave and attendance correction
11. Remote/shift/HR requests
12. Salary/employment certificate
13. Warning, employee response, investigation and PIP
14. Performance review and promotion recommendation
15. Salary revision
16. Training plan/evaluation
17. Asset issuance/transfer/return
18. Resignation acknowledgement and notice checklist
19. Handover/knowledge transfer
20. Exit clearance/interview
21. Final settlement statement
22. Experience/service letter

Generated letters must retain the template version and data snapshot used.

---

# 28. CRITICAL EDGE-CASE ACCEPTANCE SCENARIOS

At minimum, test these scenarios:

1. First employee ID is `NBSE-0001`; concurrent creation never duplicates an ID.
2. Rehire preserves old joining/exit/payroll history and does not restore old access automatically.
3. Employee joins or exits mid-payroll period and proration follows the approved method.
4. Salary changes mid-period; calculation splits correctly without overwriting history.
5. Night shift begins one day and ends next day; punches attach to the correct work date.
6. Delayed/out-of-order/duplicate biometric events do not create duplicate attendance.
7. Device is offline and later syncs; retries are idempotent and visible.
8. Missing check-out creates an exception, not a fabricated time.
9. Approved leave replaces absence but never duplicates pay/deduction.
10. Leave overlaps a holiday/weekly off and follows the versioned policy.
11. Employee with no break allowance never receives dock-fine logic.
12. Late threshold boundary at 5:40/5:41 behaves as configured.
13. Attendance correction after payroll lock does not silently change paid payroll.
14. Approver cannot approve their own request or correction.
15. Manager cannot view CNIC, bank, tax or unrestricted salary.
16. HR Officer can verify permitted documents but cannot administer roles without explicit permission.
17. Employee cannot retrieve another employee’s payslip/document by changing an ID/URL.
18. Cross-tenant/company IDs are rejected server-side.
19. Uploaded file with forged extension/MIME is rejected.
20. Expired/superseded policy remains linked to historical calculations.
21. Payroll rerun/retry does not create duplicate rows or deductions.
22. Reopened payroll keeps original approved version and complete audit history.
23. Savings reversal/refund preserves ledger integrity.
24. Negative/zero net pay is flagged for review.
25. Exit effective date stops future attendance/payroll/access but permits authorized final settlement.
26. Contract/document/probation expiries trigger alerts without exposing sensitive data.
27. Delegated approver works only in approved effective dates and scope.
28. Suspended/deactivated user sessions are revoked.
29. Export masks unauthorized fields and logs the export.
30. Backup restoration recreates database-to-file consistency.

---

# 29. OPEN DECISIONS — DO NOT INVENT OR HARD-CODE

Create/update `OPEN-DECISIONS.md` and block only dependent production behavior for:

1. Pakistan employment-law review and payroll jurisdiction.
2. Tax, EOBI/social-security or other statutory rules and effective dates.
3. Leave types, balances, accrual, carry-forward, encashment and probation eligibility.
4. Overtime eligibility, thresholds, rates and approval.
5. Payroll cycle boundary semantics, payment date and cutoff.
6. Salary proration and daily-rate divisor.
7. Exact late repeat rule and deduction legality.
8. Exact break dock-fine trigger and deduction legality.
9. Half-day/early-departure/absence thresholds.
10. Sandwich-rule combinations and exceptions.
11. Savings deduction, payout and forfeiture legal/policy approval.
12. Notice periods by employment type and notice-pay treatment.
13. Rehire leave/balance treatment.
14. Payroll approval roles and bank-payment process.
15. Record retention, privacy deletion and legal hold.
16. Encryption/key management and rotation/recovery.
17. Hostinger topology, private storage, background worker and scheduled-job support.
18. RPO/RTO and backup destinations.
19. Attendance device brand/model and connector deployment.
20. Email/notification provider.
21. Official legal company details and final logo assets for letters/exports.

Until approved, implement configuration structure, validation and safe `PENDING_APPROVAL` behavior; do not activate guessed values.

---

# 30. PHASED DELIVERY PLAN

Reconcile with completed repository work; do not repeat a verified phase.

## Phase 0 — Governance and baseline

Repository audit, requirements matrix, decisions/conflicts, architecture, threat model, test baseline and migration safety.

## Phase 1 — Foundation verification/completion

Tenant/company settings, authentication, sessions, RBAC/scopes, users, employee master, effective-dated employment, documents, approvals, audit/security events and secure seed.

## Phase 2 — Core HR UI and self-service

Organization masters, employee directory/profile/history, onboarding, policy acknowledgement, document workflows, requests and role-scoped dashboards.

## Phase 3 — Shifts, attendance and devices

Shift/roster, raw punches, attendance calculation, exception/correction, locking, mock connector and chosen device integration.

## Phase 4 — Leave, holidays, overtime and time exceptions

Policy engine, balances/ledger, approvals, calendar, sandwich configuration, overtime and payroll-ready locks.

## Phase 5 — Compensation and payroll

Salary structures, pay components, deductions/savings ledgers, loans/advances as approved, calculation snapshots, workflow, payslips, payment/reconciliation and final settlement.

## Phase 6 — Talent and employee relations

Recruitment, training/skills, probation, performance/KPI, promotions, PIP, discipline, grievance/harassment and safety incidents.

## Phase 7 — Assets, exit and continuity

Assets/access, resignation/termination, notice, handover, clearance, exit letters, rehire and critical-role continuity.

## Phase 8 — Reporting, retention and production operations

Reports/exports, notification escalation, retention/legal hold, backup/restore tests, observability, security hardening, performance/accessibility and Hostinger production deployment.

At each phase implement vertical slices: data model → migration → server authorization/validation → services/API → UI → audit → tests → docs → UAT.

---

# 31. TESTING AND QUALITY GATES

Required test layers:

- Unit tests for policy/calculation engines and date boundaries
- Service/integration tests with real database constraints where feasible
- Authorization tests for every role, scope and sensitive field
- Cross-tenant/company isolation tests
- Migration tests on representative data and rollback/recovery rehearsal
- API validation, idempotency and concurrency tests
- File upload/download security tests
- E2E tests for critical workflows
- Payroll golden-case tests with approved expected calculations
- Accessibility and responsive UI checks
- Backup restoration and disaster-recovery exercise before production
- UAT sign-off from HR, Finance/Payroll and Management for their modules

Every implementation batch must report:

- Scope and requirement IDs
- Acceptance criteria
- Files changed
- Database/migration impact
- Security/privacy impact
- Commands/tests run and exact results
- Manual/UAT checks
- Known limitations/open decisions
- Rollback/recovery notes
- Next safe milestone

---

# 32. FINAL DEFINITION OF DONE

The system is not “100% complete” merely because every menu exists. A requirement is done only when:

1. It is approved or explicitly configured as pending decision.
2. Database constraints and effective-dated history are correct.
3. Server-side validation and permission/scope checks exist.
4. Sensitive data is encrypted/masked and not leaked to audit/logs/exports.
5. Workflow, approvals, rejection/cancellation/reopen paths and edge cases work.
6. Audit and traceability are complete.
7. Automated tests and relevant manual/UAT tests pass.
8. UI is responsive, accessible and handles empty/loading/error states.
9. Documentation, configuration and operational runbooks are current.
10. Migration, backup, restore and rollback risks are addressed.
11. Production-required legal/policy decisions are approved.
12. No previous valid requirement or historical data has been silently lost.

The final product must support the complete employee journey:

Recruitment → Selection → Offer → Joining → Registration → Documents → Onboarding → Training → Probation → Confirmation → Active Employment → Attendance/Leave → Performance/Development → Salary/Payroll → Promotion/Discipline where applicable → Resignation/Termination → Notice → Handover → Exit → Final Settlement → Archive/Rehire

while protecting:

**Employees + Company + Payroll + Data + Documents + Access + Knowledge + Operations + Historical Evidence + Business Continuity.**

---

# 33. REQUIRED RESPONSE FROM THE CURRENT DEVELOPMENT CHAT

After receiving this document, do not immediately code every module. Respond first with:

1. Repository evidence summary.
2. Current completed/partial/missing requirements matrix.
3. Conflicts between this specification and current implementation.
4. Database/migration safety assessment.
5. Security and privacy gap assessment.
6. Open decisions that genuinely block implementation.
7. Recommended next smallest safe phase with exact acceptance criteria.
8. Files/models/routes/tests expected to change.
9. Verification and rollback plan.

Then implement one approved, coherent phase at a time until all non-blocked requirements are complete. Do not ask repeated questions already answered by this document or repository evidence. Ask only decisions whose answer materially changes policy, legal compliance, architecture or data behavior.
