import { SystemRole } from './system-role.type';

export type AuthenticatedUser = {
  userId: string;
  email: string;
  role: SystemRole;
  establishmentId: string;
};
