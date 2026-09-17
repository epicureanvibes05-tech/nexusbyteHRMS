import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured.");
}

const url = new URL(databaseUrl);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port || 3306),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ""),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const name = process.env.SUPER_ADMIN_NAME;
  const email = process.env.SUPER_ADMIN_EMAIL;
  const username = process.env.SUPER_ADMIN_USERNAME;
  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!name || !email || !username || !password) {
    throw new Error(
      "SUPER_ADMIN_NAME, SUPER_ADMIN_EMAIL, SUPER_ADMIN_USERNAME and SUPER_ADMIN_PASSWORD are required.",
    );
  }

  if (password.length < 12) {
    throw new Error("Super Admin password must be at least 12 characters.");
  }

  const superAdminRole = await prisma.role.findUnique({
    where: {
      code: "SUPER_ADMIN",
    },
  });

  if (!superAdminRole) {
    throw new Error(
      "SUPER_ADMIN role does not exist. Run the Prisma seed first.",
    );
  }

  const passwordHash = await hash(password, 12);

  const normalizedEmail = email.toLowerCase().trim();
  const normalizedUsername = username.trim();

  const user = await prisma.user.upsert({
    where: {
      email: normalizedEmail,
    },
    update: {
      name: name.trim(),
      username: normalizedUsername,
      passwordHash,
      isActive: true,
      passwordChangedAt: new Date(),
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
    create: {
      name: name.trim(),
      email: normalizedEmail,
      username: normalizedUsername,
      passwordHash,
      isActive: true,
      passwordChangedAt: new Date(),
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: user.id,
        roleId: superAdminRole.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      roleId: superAdminRole.id,
    },
  });

  console.log(`Super Admin created successfully: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });