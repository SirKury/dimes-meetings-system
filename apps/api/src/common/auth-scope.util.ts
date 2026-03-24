import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { SYSTEM_ROLES } from '../auth/types/system-role.type';

export function isGlobalRole(user: AuthenticatedUser): boolean {
  return user.role === SYSTEM_ROLES.SUPERADMIN;
}

export function isAdminRole(user: AuthenticatedUser): boolean {
  return user.role === SYSTEM_ROLES.SUPERADMIN || user.role === SYSTEM_ROLES.DIMES_ADMIN;
}

export function isOperationalRole(user: AuthenticatedUser): boolean {
  return (
    user.role === SYSTEM_ROLES.SUPERADMIN ||
    user.role === SYSTEM_ROLES.DIMES_ADMIN ||
    user.role === SYSTEM_ROLES.DIMES_USER
  );
}

export function establishmentScope(user: AuthenticatedUser): { establishmentId?: string } {
  if (isGlobalRole(user)) {
    return {};
  }

  return { establishmentId: user.establishmentId };
}
