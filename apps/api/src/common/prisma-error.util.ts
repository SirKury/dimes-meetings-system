import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function handlePrismaCreateError(error: unknown, resourceName: string): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      throw new ConflictException(`${resourceName} already exists`);
    }

    if (error.code === 'P2003') {
      throw new BadRequestException(`Invalid related resource reference for ${resourceName}`);
    }
  }

  throw new InternalServerErrorException(`Unexpected error while creating ${resourceName}`);
}
