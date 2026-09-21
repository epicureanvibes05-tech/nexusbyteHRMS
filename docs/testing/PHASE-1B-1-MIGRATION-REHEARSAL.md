# Phase 1B.1 — Migration rehearsal evidence

Recorded: 2026-09-22. Evidence source: the user's report of a completed rehearsal; commands and database checks below were not rerun by the documentation agent. Exact execution timestamps, exit codes and raw transcripts were not supplied. This task records evidence only and makes no database changes.

Controlling source: [Final Master Requirements](../requirements/FINAL-MASTER-REQUIREMENTS.md) §§1.1, 1.4, 4, 25, 31–32. Related records: [implementation](../architecture/PHASE-1B-1-TENANT-COMPANY-IMPLEMENTATION.md), [traceability](../requirements/TRACEABILITY-MATRIX.md#phase-1b1-rehearsal-evidence), and [test plan](PHASE-1-TEST-PLAN.md), especially T1-32 and T1-35. This is limited supporting evidence for those broader cases, not their full completion.

## Target and recovery evidence

- Disposable clone: `nexusbyte_hrms_phase1_test`.
- Real development database: `nexusbyte_hrms`.
- Source backup: `E:\NexusbyteHRMS\db-backups\nexusbyte_hrms-before-phase1b-20260918-233902.sql` (outside the repository).
- The backup was successfully restored into the disposable clone before rehearsal. No backup contents, credentials or connection strings are reproduced here.
- Migration under review: `20260921180023_phase1_tenant_company_foundation`, at `prisma/migrations/20260921180023_phase1_tenant_company_foundation/migration.sql`.

Before deployment, the repository contained three migrations. The restored clone had the first two applied: `20260914205402_init_core_hr` and `20260914221924_add_auth_rbac`. Only the foundation migration was pending.

## Reported commands and checks

| Command or operation performed | Target | Reported result |
| --- | --- | --- |
| Restore the source SQL backup; exact restore command not supplied | `nexusbyte_hrms_phase1_test` | Restore successful |
| Temporary PowerShell `DATABASE_URL` override; assignment syntax/value omitted | Disposable clone | Prisma rehearsal targeted the test database |
| `npx prisma migrate deploy` | `nexusbyte_hrms_phase1_test` | Foundation migration applied successfully |
| `npx prisma migrate status` | `nexusbyte_hrms_phase1_test` | `Database schema is up to date` |
| Inspect `_prisma_migrations`; exact SQL not supplied | Disposable clone | Three applied migrations |
| Verify table presence and counts; exact SQL not supplied | Clone, compared with real development | Results below |
| Inspect foreign keys in `information_schema`; exact SQL not supplied | Disposable clone | Three new relationships have RESTRICT actions, below |
| Remove temporary PowerShell `DATABASE_URL` override; exact removal command not supplied | Operator's PowerShell session | Override removed afterward |
| `npx prisma migrate status` | `nexusbyte_hrms` | Three migrations found; foundation migration still NOT applied |

Only the two Prisma command strings were supplied verbatim. Restore/inspection/override commands are described as operations rather than reconstructed as an execution transcript.

## Existing-data count comparison

Table labels and counts reproduce the supplied evidence.

| Table | `nexusbyte_hrms` | `nexusbyte_hrms_phase1_test` | Result |
| --- | ---: | ---: | --- |
| user | 1 | 1 | PASS |
| role | 4 | 4 | PASS |
| permission | 38 | 38 | PASS |
| employee | 0 | 0 | PASS |
| salaryhistory | 0 | 0 | PASS |

No existing data loss was observed in the reported comparison. Equal counts do not establish byte-for-byte preservation of row values, credentials or join-table assignments. No row-content digests or comparisons of other existing tables were supplied. The empty employee/salaryhistory tables do not exercise preservation of populated HR history.

## Foundation tables and foreign keys

| New table verified present | Count after migration | Result |
| --- | ---: | --- |
| Tenant | 0 | PASS |
| Company | 0 | PASS |
| CompanySettings | 0 | PASS |

These empty tables are expected: the migration adds structure only and does not insert tenant/company/settings rows or backfill existing records.

| Relationship verified in `information_schema` | DELETE rule | UPDATE rule | Result |
| --- | --- | --- | --- |
| Company → Tenant | RESTRICT | RESTRICT | PASS |
| Company current settings → CompanySettings | RESTRICT | RESTRICT | PASS |
| CompanySettings → Company | RESTRICT | RESTRICT | PASS |

This verifies recorded FK definitions in the clone. It does not claim that prohibited deletes, owner mismatches, duplicate keys or invalid current-settings pointers were attempted and rejected.

## Result and limits

**Rehearsal result: PASS for migration compatibility with the current development snapshot, based on user-provided evidence.** Restore, deployment, migration status, new-table presence, expected empty counts and restrictive FK metadata checks succeeded. This does not prove production compatibility or production readiness.

No automated suite exists or is claimed to have passed. This record does not complete T1-32's fixture/value-preservation/resumability scenarios or T1-35's full DB/files/configuration/key recovery and measured recovery-objective checks. Production engine/configuration, data volume, populated employee/history cases, lock duration, failure recovery, application behavior, authorization/isolation and backfill remain outside this evidence. No RPO/RTO, coordinated private-file restore or production approval is inferred.

**The real development database `nexusbyte_hrms` has not yet been migrated.** The reported final status still lists `20260921180023_phase1_tenant_company_foundation` as pending after removal of the temporary override.

## Next gate and recovery boundary

Next gate: reviewed deployment to `nexusbyte_hrms`, followed by post-deploy verification. Before that separately authorized action, confirm the actual target, backup availability and pending migration inventory. After deployment, verify migration history/status, table presence, empty foundation counts, restrictive FK definitions and existing-data preservation. Identity/settings backfill remains a separate reviewed step; deployment alone must not populate those tables.

The migration is now reported applied in the disposable clone, so preserve its SQL and migration history; repairs require reviewed forward changes. No recovery action on real development is needed for this documentation task. The successful clone restore is evidence that this SQL backup was restorable in that environment, not a guarantee of complete production recovery. Do not restore over live development data or infer permission to deploy from this evidence record.
