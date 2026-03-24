import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Array<'SUPERADMIN' | 'DIMES_ADMIN' | 'DIMES_USER'>): ReturnType<typeof SetMetadata> =>
  SetMetadata(ROLES_KEY, roles);
