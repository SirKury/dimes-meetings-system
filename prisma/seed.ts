import { PrismaClient } from '@prisma/client';
import { seedEstablishments } from './seeds/establishments.seed';
import { seedRoles } from './seeds/roles.seed';
import { seedInitialAdmin } from './seeds/users.seed';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await seedRoles(prisma);
  await seedEstablishments(prisma);
  await seedInitialAdmin(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error('Seed execution failed', error);
    await prisma.$disconnect();
    process.exit(1);
  });
