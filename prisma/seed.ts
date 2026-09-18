import "dotenv/config";
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

const permissions = [
  // Users & access
  ["users.view", "View Users", "users"],
  ["users.manage", "Manage Users", "users"],
  ["roles.view", "View Roles", "roles"],
  ["roles.manage", "Manage Roles & Permissions", "roles"],

  // Employees
  ["employees.view", "View Employees", "employees"],
  ["employees.create", "Create Employees", "employees"],
  ["employees.edit", "Edit Employees", "employees"],
  ["employees.delete", "Delete/Deactivate Employees", "employees"],

  // Salary
  ["salary.view", "View Salary Information", "salary"],
  ["salary.manage", "Manage Salary Information", "salary"],

  // Attendance
  ["attendance.view", "View Attendance", "attendance"],
  ["attendance.create", "Create Attendance", "attendance"],
  ["attendance.edit", "Edit Attendance", "attendance"],
  ["attendance.correct", "Correct Attendance", "attendance"],

  // Leave
  ["leave.view", "View Leave", "leave"],
  ["leave.manage", "Manage Leave", "leave"],
  ["leave.approve", "Approve/Reject Leave", "leave"],

  // Fines / deductions
  ["fines.view", "View Fines & Deductions", "fines"],
  ["fines.manage", "Manage Fines & Deductions", "fines"],

  // Savings
  ["savings.view", "View Savings", "savings"],
  ["savings.manage", "Manage Savings", "savings"],

  // Payroll
  ["payroll.view", "View Payroll", "payroll"],
  ["payroll.manage", "Manage Payroll", "payroll"],
  ["payroll.finalize", "Finalize Payroll", "payroll"],
  ["payroll.reopen", "Reopen Payroll", "payroll"],

  // Payslips
  ["payslips.view", "View Payslips", "payslips"],
  ["payslips.download", "Download Payslips", "payslips"],

  // Documents
  ["documents.view", "View Employee Documents", "documents"],
  ["documents.upload", "Upload Employee Documents", "documents"],
  ["documents.download", "Download Employee Documents", "documents"],

  // Resignation / exit
  ["exit.view", "View Resignation & Exit", "exit"],
  ["exit.manage", "Manage Resignation & Exit", "exit"],
  ["settlement.manage", "Manage Final Settlement", "exit"],

  // Reports
  ["reports.view", "View Reports", "reports"],
  ["reports.export", "Export Reports", "reports"],

  // Settings
  ["settings.view", "View Settings", "settings"],
  ["settings.manage", "Manage System Settings", "settings"],

  // Audit
  ["audit.view", "View Audit Logs", "audit"],
] as const;

const roleDefinitions = [
  {
    code: "SUPER_ADMIN",
    name: "Super Admin / Owner",
    description: "Full system access.",
    allPermissions: true,
  },
  {
    code: "HR",
    name: "HR",
    description: "Employee, attendance, leave, documents and HR operations.",
    permissions: [
      "employees.view",
      "employees.create",
      "employees.edit",
      "salary.view",
      "attendance.view",
      "attendance.create",
      "attendance.edit",
      "attendance.correct",
      "leave.view",
      "leave.manage",
      "leave.approve",
      "fines.view",
      "fines.manage",
      "documents.view",
      "documents.upload",
      "documents.download",
      "exit.view",
      "exit.manage",
      "reports.view",
      "reports.export",
    ],
  },
  {
    code: "FINANCE_PAYROLL",
    name: "Finance / Payroll",
    description: "Payroll, salary, savings, payslips and financial settlement.",
    permissions: [
      "employees.view",
      "salary.view",
      "salary.manage",
      "fines.view",
      "savings.view",
      "savings.manage",
      "payroll.view",
      "payroll.manage",
      "payroll.finalize",
      "payslips.view",
      "payslips.download",
      "exit.view",
      "settlement.manage",
      "reports.view",
      "reports.export",
    ],
  },
  {
    code: "ATTENDANCE_OPERATOR",
    name: "Attendance Operator",
    description: "Restricted attendance and leave marking access.",
    permissions: [
      "employees.view",
      "attendance.view",
      "attendance.create",
      "attendance.edit",
      "attendance.correct",
      "leave.view",
      "leave.manage",
    ],
  },
];

async function main() {
  for (const [key, name, module] of permissions) {
    await prisma.permission.upsert({
      where: { key },
      update: {
        name,
        module,
      },
      create: {
        key,
        name,
        module,
      },
    });
  }

  const allPermissions = await prisma.permission.findMany();

  for (const roleDefinition of roleDefinitions) {
    const role = await prisma.role.upsert({
      where: { code: roleDefinition.code },
      update: {
        name: roleDefinition.name,
        description: roleDefinition.description,
        isSystem: true,
        isActive: true,
      },
      create: {
        code: roleDefinition.code,
        name: roleDefinition.name,
        description: roleDefinition.description,
        isSystem: true,
        isActive: true,
      },
    });

    let permissionKeys: readonly string[] = [];

    if ("allPermissions" in roleDefinition && roleDefinition.allPermissions) {
      permissionKeys = allPermissions.map((permission) => permission.key);
    } else if ("permissions" in roleDefinition) {
      permissionKeys = roleDefinition.permissions ?? [];
    }

    for (const permissionKey of permissionKeys) {
      const permission = allPermissions.find(
        (item) => item.key === permissionKey,
      );

      if (!permission) continue;

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });
    }
  }

  console.log("Default roles and permissions seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
