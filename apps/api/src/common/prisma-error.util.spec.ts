import { BadRequestException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { handlePrismaCreateError } from './prisma-error.util';

describe('handlePrismaCreateError', () => {
  it('throws conflict when prisma error code is P2002', () => {
    const error = new Prisma.PrismaClientKnownRequestError('duplicated', {
      code: 'P2002',
      clientVersion: 'test',
      meta: { target: ['email'] }
    });

    expect(() => handlePrismaCreateError(error, 'user')).toThrow(ConflictException);
  });

  it('throws bad request when prisma error code is P2003', () => {
    const error = new Prisma.PrismaClientKnownRequestError('fk', {
      code: 'P2003',
      clientVersion: 'test',
      meta: { field_name: 'roleId' }
    });

    expect(() => handlePrismaCreateError(error, 'user')).toThrow(BadRequestException);
  });
});
