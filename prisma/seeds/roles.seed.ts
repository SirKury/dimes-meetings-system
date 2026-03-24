import { PrismaClient } from '@prisma/client';

export async function seedRoles(prisma: PrismaClient): Promise<void> {
  const roles = [
    {
      name: 'SUPERADMIN',
      description: 'Control global del sistema DIMES.'
    },
    {
      name: 'DIMES_ADMIN',
      description: 'Administración operativa por ámbito autorizado.'
    },
    {
      name: 'DIMES_USER',
      description: 'Usuario funcional con permisos limitados.'
    }
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: role,
      create: role
    });
  }
}
