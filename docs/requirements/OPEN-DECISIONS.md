# Open decisions — Phase 0

Date: 2026-09-18. Controlling source: [Master §29](FINAL-MASTER-REQUIREMENTS.md), with §§1.4, 2.3 and affected domain sections. No decisions have been approved by this review. Proposed owners are stakeholder functions, not assigned individuals or approvals.

## Section 29 — exact source wording

> Create/update `OPEN-DECISIONS.md` and block only dependent production behavior for:

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

> Until approved, implement configuration structure, validation and safe `PENDING_APPROVAL` behavior; do not activate guessed values.

`PENDING_APPROVAL` is the Master’s intended future application policy state, not an additional requirement status. Phase 0 documents that rule without implementing it.

## Production gates and independent architecture work

Every row blocks only the listed dependent production behavior. None blocks this documentation phase. Neutral work describes work permissible in a future authorized implementation phase; no code is authorized by this register. Provider/device choices are decisions now; actual service, hardware, credentials or capacity may subsequently create `BLOCKED_BY_EXTERNAL_DEPENDENCY` records after selection.

| ID / source | Decision status | Production behavior blocked | Neutral architecture work not blocked | Proposed decision owner |
| --- | --- | --- | --- | --- |
| OD-01 / §29.1 | BLOCKED_BY_DECISION | Production employment and payroll jurisdiction assumptions | Policy approval metadata and jurisdiction configuration | HR/legal |
| OD-02 / §29.2 | BLOCKED_BY_DECISION | Statutory calculations and contributions | Effective-dated rule interfaces and validation | Payroll/legal |
| OD-03 / §29.3 | BLOCKED_BY_DECISION | Leave entitlement and balance activation | Leave policy schema and disabled configuration | HR/legal |
| OD-04 / §29.4 | BLOCKED_BY_DECISION | Overtime calculation/payment | Optional overtime structure and approval contracts | Payroll/HR/legal |
| OD-05 / §29.5 | BLOCKED_BY_DECISION | Production payroll period creation and cutoff | Period validation structure with no selected default | Payroll/management |
| OD-06 / §29.6 | BLOCKED_BY_DECISION | Prorated salary and daily-rate calculation | Calculation strategy interfaces and synthetic test cases | Payroll/HR |
| OD-07 / §29.7 | BLOCKED_BY_DECISION | Repeated lateness deductions | Configurable occurrence/repeat schema, inactive | HR/legal/payroll |
| OD-08 / §29.8 | BLOCKED_BY_DECISION | Break dock-fine calculations | Configurable trigger alternatives, inactive | HR/legal/payroll |
| OD-09 / §29.9 | BLOCKED_BY_DECISION | Automatic half-day/absence deductions | Threshold schema and exception workflow design | HR/payroll |
| OD-10 / §29.10 | BLOCKED_BY_DECISION | Sandwich leave deductions | Versioned policy structure and manual override audit | HR/legal |
| OD-11 / §29.11 | BLOCKED_BY_DECISION | Savings deduction, payout and forfeiture | Immutable ledger/reversal design without active rules | HR/legal/payroll |
| OD-12 / §29.12 | BLOCKED_BY_DECISION | Notice-pay and final settlement treatment | Exit workflow structure and configurable notice fields | HR/legal |
| OD-13 / §29.13 | BLOCKED_BY_DECISION | Rehire balance reinstatement or carryover | Employment-period model preserving history | HR/payroll |
| OD-14 / §29.14 | BLOCKED_BY_DECISION | Financial approval and payment execution | Maker-checker structure and explicit permission design | Payroll/management/security |
| OD-15 / §29.15 | BLOCKED_BY_DECISION | Production retention schedules, deletion and legal hold release | Retention/legal-hold metadata; no destructive processing | Privacy/legal |
| OD-16 / §29.16 | BLOCKED_BY_DECISION | Sensitive field/file encryption activation and recoverable key custody | Data classification, field-access matrix and crypto abstraction | Security/operations |
| OD-17 / §29.17 | BLOCKED_BY_DECISION | Production deployment, private storage and job execution | Provider-independent storage/job contracts | Operations |
| OD-18 / §29.18 | BLOCKED_BY_DECISION | Production recovery commitments and backup rollout | Backup inventory and restore rehearsal design | Operations/management |
| OD-19 / §29.19 | BLOCKED_BY_DECISION | Real-device ingestion and connector rollout | Adapter contract, mock connector and idempotency fixtures | Integration/operations |
| OD-20 / §29.20 | BLOCKED_BY_DECISION | Provider-backed email/notification delivery | In-app notification structure and provider interface | Operations/communications |
| OD-21 / §29.21 | BLOCKED_BY_DECISION | Final official letters and branded exports | Template versioning and clearly non-official previews | Management/legal |

## Approval evidence and precedence

Each decision must record approver/owner, written outcome, scope, legal-review outcome where relevant, effective date, version, acceptance examples, affected requirement IDs and superseded decisions. All are unresolved with no approval evidence supplied. Record future changes append-only; do not silently replace prior policy or recalculate finalized history.

Use the exact legal classification from §2.3: **Company Policy — Legal Review Recommended**. This register records the Master’s legal-review requirement; it offers no legal opinion or invented Pakistan-specific values.

The proposed PKR 500 dock fine (§9.4), three-late/PKR 2,500 rule (§9.5), 5th-to-5th cycle (§14.1), and PKR 2,500 savings/forfeiture rules (§14.5) are not approvals. OD-05, OD-07, OD-08 and OD-11 gate their dependent behavior. Existing enabled Employee booleans are conflict C-05, not evidence that approval occurred.

Argon2id (§24), the seven approved roles (§3), isolation (§24), immutable history (§23), and no public signup (§24) are settled requirements. Implementation conflicts must be corrected in later approved work, not reclassified as unknown business decisions.

OD-16–18 block production security/hosting/recovery choices, but do not prevent threat modeling, owner boundaries, access contracts or test design. OD-19–21 block specific live integrations and official outputs, not all core HR development. See [reconciliation](RECONCILIATION-REPORT.md) and [threat model](../security/THREAT-MODEL.md).
