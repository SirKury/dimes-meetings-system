import { BadRequestException, ConflictException } from '@nestjs/common';
import { handlePrismaCreateError } from './prisma-error.util';

describe('handlePrismaCreateError', () => {
  it('throws conflict when prisma error code is P2002', () => {
    const error = { code: 'P2002' };

    expect(() => handlePrismaCreateError(error, 'user')).toThrow(ConflictException);
  });

  it('throws bad request when prisma error code is P2003', () => {
    const error = { code: 'P2003' };

    expect(() => handlePrismaCreateError(error, 'user')).toThrow(BadRequestException);
  });
});
