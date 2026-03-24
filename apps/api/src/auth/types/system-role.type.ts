export const SYSTEM_ROLES = {
  SUPERADMIN: 'SUPERADMIN',
  DIMES_ADMIN: 'DIMES_ADMIN',
  DIMES_USER: 'DIMES_USER'
} as const;

export type SystemRole = (typeof SYSTEM_ROLES)[keyof typeof SYSTEM_ROLES];
