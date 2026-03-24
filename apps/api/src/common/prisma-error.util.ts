import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';

type PrismaLikeError = {
  code?: string;
};

export function handlePrismaCreateError(error: unknown, resourceName: string): never {
  const prismaError = error as PrismaLikeError;

  if (prismaError?.code === 'P2002') {
    throw new ConflictException(`${resourceName} already exists`);
  }

  if (prismaError?.code === 'P2003') {
    throw new BadRequestException(`Invalid related resource reference for ${resourceName}`);
  }

  throw new InternalServerErrorException(`Unexpected error while creating ${resourceName}`);
}
