import { LogoutButton } from "@/components/logout-button";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/session";

export default async function DashboardPage() {
  const userId = await getSessionUserId();

  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user?.isActive) {
    redirect("/login");
  }

  const [
    totalEmployees,
    activeEmployees,
    probationEmployees,
    noticePeriodEmployees,
  ] = await Promise.all([
    prisma.employee.count(),

    prisma.employee.count({
      where: {
        employmentStatus: "ACTIVE",
      },
    }),

    prisma.employee.count({
      where: {
        employmentStatus: "PROBATION",
      },
    }),

    prisma.employee.count({
      where: {
        employmentStatus: "NOTICE_PERIOD",
      },
    }),
  ]);

  const roles = user.userRoles.map((userRole) => userRole.role.name);

  const stats = [
    {
      label: "Total Employees",
      value: totalEmployees,
    },
    {
      label: "Active Employees",
      value: activeEmployees,
    },
    {
      label: "Probation",
      value: probationEmployees,
    },
    {
      label: "Notice Period",
      value: noticePeriodEmployees,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
              NexusByte Solutions
            </p>

            <h1 className="mt-1 text-xl font-bold">
              HR, Attendance & Payroll Management System
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user.name}</p>

              <p className="text-sm text-slate-400">{roles.join(", ")}</p>
            </div>

            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>

          <p className="mt-2 text-slate-400">Welcome back, {user.name}.</p>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <p className="text-sm text-slate-400">{stat.label}</p>

              <p className="mt-3 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">System Foundation</h3>

          <p className="mt-2 text-sm text-slate-400">
            Employee, attendance, payroll and HR modules will appear here as
            development continues.
          </p>
        </section>
      </div>
    </main>
  );
}
