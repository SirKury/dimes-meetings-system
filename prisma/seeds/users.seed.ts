import { randomBytes, scrypt as scryptCallback } from 'node:crypto';
import { promisify } from 'node:util';
import { PrismaClient } from '@prisma/client';

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
}

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

  const passwordHash = await hashPassword(adminPassword);

  await prisma.user.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: {
      firstName,
      lastName,
      passwordHash,
      roleId: role.id,
      establishmentId: establishment.id,
      isActive: true
    },
    create: {
      email: adminEmail.toLowerCase(),
      passwordHash,
      firstName,
      lastName,
      roleId: role.id,
      establishmentId: establishment.id,
      isActive: true
    }
  });
}
