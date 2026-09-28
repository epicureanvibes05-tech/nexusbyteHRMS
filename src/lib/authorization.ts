import "server-only";

import { prisma } from "@/lib/prisma";

export class PermissionDeniedError extends Error {
  readonly code = "PERMISSION_DENIED";
  readonly status = 403;

  constructor() {
    super("You do not have permission to perform this action.");
    this.name = "PermissionDeniedError";
  }
}

export class AuthorizationUnavailableError extends Error {
  readonly code = "AUTHORIZATION_UNAVAILABLE";
  readonly status = 503;

  constructor() {
    super("Unable to verify permissions right now.");
    this.name = "AuthorizationUnavailableError";
  }
}

/**
 * Load current permission keys from active roles belonging to an active user.
 * Callers must obtain userId from a verified server session, never request data.
 * No cross-request cache is used, so later calls reload database grants.
 */
export async function getUserPermissions(userId: number): Promise<string[]> {
  if (!Number.isSafeInteger(userId) || userId <= 0 || userId > 2_147_483_647) {
    return [];
  }

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId, isActive: true },
      select: {
        userRoles: {
          where: { role: { isActive: true } },
          select: {
            role: {
              select: {
                permissions: {
                  select: { permission: { select: { key: true } } },
                },
              },
            },
          },
        },
      },
    });

    if (!user) return [];

    return [
      ...new Set(
        user.userRoles.flatMap(({ role }) =>
          role.permissions.map(({ permission }) => permission.key),
        ),
      ),
    ];
  } catch {
    // Fail closed without exposing database errors or connection details.
    throw new AuthorizationUnavailableError();
  }
}

/** Database failures throw; they must never be treated as permission grants. */
export async function hasPermission(
  userId: number,
  permissionKey: string,
): Promise<boolean> {
  if (
    typeof permissionKey !== "string" ||
    permissionKey.length === 0 ||
    permissionKey.length > 150 ||
    permissionKey.trim() !== permissionKey
  ) {
    return false;
  }

  const permissions = await getUserPermissions(userId);
  return permissions.includes(permissionKey);
}

/** Throws PermissionDeniedError on denial or AuthorizationUnavailableError on lookup failure. */
export async function requirePermission(
  userId: number,
  permissionKey: string,
): Promise<void> {
  if (!(await hasPermission(userId, permissionKey))) {
    throw new PermissionDeniedError();
  }
}
