import "dotenv/config";

import { prisma } from "../src/lib/prisma";

const TENANT_SLUG = "nexusbyte-solutions";
const TENANT_NAME = "Nexusbyte Solutions";

const COMPANY_CODE = "NBSO";
const COMPANY_NAME = "Nexusbyte Solutions";

const SETTINGS_VERSION = 1;
const TIMEZONE = "Asia/Karachi";
const CURRENCY = "PKR";

function getDatabaseName() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing.");
  }

  const url = new URL(databaseUrl);

  return decodeURIComponent(url.pathname.replace(/^\//, ""));
}

async function main() {
  const expectedDatabase = process.env.PHASE1B2_TARGET_DB;
  const confirmation = process.env.CONFIRM_PHASE1B2_BACKFILL;

  if (!expectedDatabase) {
    throw new Error(
      "PHASE1B2_TARGET_DB is required. Refusing to run without an explicit target database.",
    );
  }

  if (confirmation !== "YES") {
    throw new Error(
      'Set CONFIRM_PHASE1B2_BACKFILL="YES" before running this backfill.',
    );
  }

  const actualDatabase = getDatabaseName();

  if (actualDatabase !== expectedDatabase) {
    throw new Error(
      `Database safety check failed. Expected "${expectedDatabase}" but DATABASE_URL targets "${actualDatabase}".`,
    );
  }

  console.log(`Running Phase 1B.2 backfill against: ${actualDatabase}`);

  const result = await prisma.$transaction(async (tx) => {
    let tenant = await tx.tenant.findUnique({
      where: {
        slug: TENANT_SLUG,
      },
    });

    if (tenant) {
      if (tenant.name !== TENANT_NAME) {
        throw new Error(
          `Tenant conflict: slug "${TENANT_SLUG}" already exists with name "${tenant.name}".`,
        );
      }
    } else {
      tenant = await tx.tenant.create({
        data: {
          slug: TENANT_SLUG,
          name: TENANT_NAME,
          isActive: true,
        },
      });
    }

    let company = await tx.company.findFirst({
      where: {
        tenantId: tenant.id,
        code: COMPANY_CODE,
      },
    });

    if (company) {
      if (company.name !== COMPANY_NAME) {
        throw new Error(
          `Company conflict: code "${COMPANY_CODE}" already exists with name "${company.name}".`,
        );
      }
    } else {
      const sameNameCompany = await tx.company.findFirst({
        where: {
          tenantId: tenant.id,
          name: COMPANY_NAME,
        },
      });

      if (sameNameCompany) {
        throw new Error(
          `Company conflict: "${COMPANY_NAME}" already exists with code "${sameNameCompany.code}".`,
        );
      }

      company = await tx.company.create({
        data: {
          tenantId: tenant.id,
          code: COMPANY_CODE,
          name: COMPANY_NAME,
          isActive: true,
        },
      });
    }

    let settings = await tx.companySettings.findFirst({
      where: {
        tenantId: tenant.id,
        companyId: company.id,
        version: SETTINGS_VERSION,
      },
    });

    if (settings) {
      if (
        settings.timezone !== TIMEZONE ||
        settings.currency !== CURRENCY
      ) {
        throw new Error(
          `CompanySettings conflict: version ${SETTINGS_VERSION} exists with different timezone/currency.`,
        );
      }
    } else {
      settings = await tx.companySettings.create({
        data: {
          tenantId: tenant.id,
          companyId: company.id,
          version: SETTINGS_VERSION,
          timezone: TIMEZONE,
          currency: CURRENCY,
          validFrom: new Date(),
        },
      });
    }

    if (company.currentSettingsId === null) {
      company = await tx.company.update({
        where: {
          id: company.id,
        },
        data: {
          currentSettingsId: settings.id,
        },
      });
    } else if (company.currentSettingsId !== settings.id) {
      throw new Error(
        `Company conflict: currentSettingsId points to ${company.currentSettingsId}, expected ${settings.id}.`,
      );
    }

    return {
      tenantId: tenant.id,
      companyId: company.id,
      companySettingsId: settings.id,
    };
  });

  console.log("Phase 1B.2 backfill completed successfully.");
  console.log(result);
}

main()
  .catch((error: unknown) => {
    console.error("Phase 1B.2 backfill failed.");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });