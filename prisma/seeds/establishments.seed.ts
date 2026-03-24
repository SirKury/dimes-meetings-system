import { PrismaClient } from '@prisma/client';

export async function seedEstablishments(prisma: PrismaClient): Promise<void> {
  const establishments = [
    {
      name: 'DIMES - Sede Central',
      code: 'DIMES-CEN',
      address: 'Sede institucional principal'
    },
    {
      name: 'Hospital Regional Norte',
      code: 'HRN',
      address: 'Zona Norte'
    },
    {
      name: 'Hospital Regional Sur',
      code: 'HRS',
      address: 'Zona Sur'
    }
  ];

  for (const establishment of establishments) {
    await prisma.establishment.upsert({
      where: { code: establishment.code },
      update: establishment,
      create: establishment
    });
  }
}
