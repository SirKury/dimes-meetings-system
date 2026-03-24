import { PrismaClient } from '@prisma/client';

export async function seedInitialAdmin(prisma: PrismaClient): Promise<void> {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@dimes.local';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!';
  const firstName = process.env.SEED_ADMIN_FIRST_NAME ?? 'DIMES';
  const lastName = process.env.SEED_ADMIN_LAST_NAME ?? 'Superadmin';

  const role = await prisma.role.findUnique({ where: { name: 'SUPERADMIN' } });
  const establishment = await prisma.establishment.findFirst({
    where: { code: 'DIMES-CEN' }
  });

  if (!role || !establishment) {
    throw new Error('Roles y establecimientos deben existir antes de crear el admin inicial.');
  }

  await prisma.user.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: {
      firstName,
      lastName,
      passwordHash: adminPassword,
      roleId: role.id,
      establishmentId: establishment.id,
      isActive: true
    },
    create: {
      email: adminEmail.toLowerCase(),
      passwordHash: adminPassword,
      firstName,
      lastName,
      roleId: role.id,
      establishmentId: establishment.id,
      isActive: true
    }
  });
}
