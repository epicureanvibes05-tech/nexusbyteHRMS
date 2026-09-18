import { compare } from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MINUTES = 15;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, "Email or username is required.")
    .max(150),
  password: z.string().min(1, "Password is required.").max(200),
});

export type LoginInput = z.infer<typeof loginSchema>;

export async function loginUser(input: unknown) {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false as const,
      message: "Please enter a valid email/username and password.",
    };
  }

  const { identifier, password } = parsed.data;
  const normalizedIdentifier = identifier.trim();
  const now = new Date();

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: normalizedIdentifier.toLowerCase(),
        },
        {
          username: normalizedIdentifier,
        },
      ],
    },
    include: {
      userRoles: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user || !user.isActive) {
    return {
      success: false as const,
      message: "Unable to sign in with those credentials.",
    };
  }

  if (user.lockedUntil && user.lockedUntil > now) {
    return {
      success: false as const,
      message: "Account is temporarily locked. Please try again later.",
    };
  }

  const passwordMatches = await compare(password, user.passwordHash);

  if (!passwordMatches) {
    const previousLockExpired =
      user.lockedUntil !== null && user.lockedUntil <= now;

    const failedAttempts = previousLockExpired
      ? 1
      : user.failedLoginAttempts + 1;

    const shouldLock = failedAttempts >= MAX_FAILED_ATTEMPTS;

    const lockedUntil = shouldLock
      ? new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000)
      : null;

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        failedLoginAttempts: failedAttempts,
        lockedUntil,
      },
    });

    return {
      success: false as const,
      message: shouldLock
        ? "Account is temporarily locked. Please try again later."
        : "Unable to sign in with those credentials.",
    };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: now,
    },
  });

  const roles = [
    ...new Set(user.userRoles.map((userRole) => userRole.role.code)),
  ];

  const permissions = [
    ...new Set(
      user.userRoles.flatMap((userRole) =>
        userRole.role.permissions.map(
          (rolePermission) => rolePermission.permission.key,
        ),
      ),
    ),
  ];

  await createSession(user.id);

  return {
    success: true as const,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      roles,
      permissions,
    },
  };
}
