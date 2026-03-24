import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

export function isGlobalRole(user: AuthenticatedUser): boolean {
  return user.role === 'SUPERADMIN';
}

export function establishmentScope(user: AuthenticatedUser): { establishmentId?: string } {
  if (isGlobalRole(user)) {
    return {};
  }

  return { establishmentId: user.establishmentId };
}
