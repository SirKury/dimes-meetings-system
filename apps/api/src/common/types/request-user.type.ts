export type RequestUser = {
  sub: string;
  email: string;
  role: 'SUPERADMIN' | 'DIMES_ADMIN' | 'DIMES_USER';
  establishmentId: string;
};
