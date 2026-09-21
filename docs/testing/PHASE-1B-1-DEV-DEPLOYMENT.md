# Phase 1B.1 — Development database deployment

Recorded: 2026-09-22. Evidence source: the user's report of completed deployment and validation. This documentation task did not rerun deployment, database queries, lint, TypeScript or build commands. Exact execution timestamps, numeric exit codes and raw command transcripts were not supplied.

Authority: [Final Master Requirements](../requirements/FINAL-MASTER-REQUIREMENTS.md) §§1.1, 1.4, 4, 25, 30–32. Related evidence: [implementation record](../architecture/PHASE-1B-1-TENANT-COMPANY-IMPLEMENTATION.md), [earlier disposable-clone rehearsal](PHASE-1B-1-MIGRATION-REHEARSAL.md), and [traceability](../requirements/TRACEABILITY-MATRIX.md#phase-1b1-development-deployment-evidence).

## Deployment outcome

**PASS — migration `20260921180023_phase1_tenant_company_foundation` was successfully deployed to real development database `nexusbyte_hrms`, based on user-provided evidence. This was development deployment, not production.** The earlier records showing this migration pending describe historical checkpoints and are superseded for current development status by this record.

| Command or operation | Reported result |
| --- | --- |
| Fresh pre-deploy SQL backup; exact backup command not supplied | Completed successfully outside the repository |
| `npx prisma migrate deploy` | Succeeded against `nexusbyte_hrms` |
| `npx prisma migrate status` | Three migrations found; database schema up to date |
| Verify Tenant, Company and CompanySettings table presence; exact SQL not supplied | All three tables exist |
| `npm run lint` | Passed |
| `npx tsc --noEmit` | Passed |
| `npm run build` | Passed |
| Post-deployment working-tree check; exact command not supplied | User reports clean working tree; documentation agent also observed empty `git status --short` at task entry |

No destructive migration, reset or `prisma db push` was used, as reported for this deployment. No Tenant/Company/CompanySettings business rows have been backfilled yet. No automated-suite pass is claimed; no suite currently exists.

## Backup and recovery evidence

Fresh pre-deploy backup: `E:\NexusbyteHRMS\db-backups\nexusbyte_hrms-before-phase1b-deploy-20260922-011727.sql`. Backup creation completed successfully. The file remains outside the repository; its contents, credentials and connection strings are not included here.

The earlier disposable-clone rehearsal successfully restored a different backup, `nexusbyte_hrms-before-phase1b-20260918-233902.sql`, before applying this migration. That supports current-snapshot rehearsal evidence but does not establish that the fresh pre-deploy backup was independently restored. No production restore, coordinated DB/files/configuration recovery or RPO/RTO result is inferred.

The migration is now applied to development as well as the rehearsal clone. Preserve its SQL and migration history; any correction requires reviewed forward repair. Recovery planning must account for partial DDL effects and post-backup writes. No database rollback or restore was performed by this documentation task.

## Manual row-count and foreign-key evidence

The latest supplied numerical comparison predates development deployment: `nexusbyte_hrms` had user 1, role 4, permission 38, employee 0 and salaryhistory 0. The earlier three RESTRICT/RESTRICT FK checks and empty foundation-table counts were explicitly on the disposable clone. Confirmation of the latest post-deployment manual counts and FK rules on real development has been requested; these earlier observations are not relabelled as post-deployment verification.

The user confirms that no foundation business rows have been backfilled. Exact post-deployment count/FK verification details will be recorded when supplied. Matching counts alone do not prove row-content, credential or relationship preservation; FK metadata does not prove behavioral rejection of invalid operations.

## Next phase and limits

**Phase 1B.2 will handle controlled, idempotent NexusByte tenant/company/settings backfill.** Use the Master's approved values: Tenant slug `nexusbyte-solutions`, Company display name `Nexusbyte Solutions`, Company code `NBSO`, timezone `Asia/Karachi` and currency `PKR`. Resolve owners by natural keys rather than assuming ID 1. The separately authorized backfill must validate existing values, avoid overwriting conflicting records, use reviewed version/effective-date values and publish only a same-company settings pointer. No backfill or guessed HR/payroll/legal policy is authorized by this documentation task.

Development deployment and static/build passes do not complete the broader foundation requirements. Production compatibility/readiness, scoped application access, settings publication/audit, immutable history, behavioral constraints, concurrency and full recovery tests remain outstanding. The [test plan](PHASE-1-TEST-PLAN.md) is not marked fully passed. Requirement status remains PARTIALLY_COMPLETE for the affected foundation and recovery requirements.
