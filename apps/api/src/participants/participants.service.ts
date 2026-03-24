import { ForbiddenException, Injectable } from '@nestjs/common';
import { Participant, Prisma } from '@prisma/client';
import { RequestUser } from '../common/types/request-user.type';
import { PrismaService } from '../prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { QueryParticipantsDto } from './dto/query-participants.dto';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(user: RequestUser, query: QueryParticipantsDto): Promise<Participant[]> {
    const where: Prisma.ParticipantWhereInput = {
      establishmentId:
        user.role === 'SUPERADMIN' ? (query.establishmentId ?? undefined) : user.establishmentId
    };

    return this.prisma.participant.findMany({ where, orderBy: { fullName: 'asc' } });
  }

  async create(user: RequestUser, dto: CreateParticipantDto): Promise<Participant> {
    const establishmentId = dto.establishmentId ?? user.establishmentId;

    if (user.role !== 'SUPERADMIN' && establishmentId !== user.establishmentId) {
      throw new ForbiddenException('Cannot create participants outside your establishment scope');
    }

    return this.prisma.participant.create({
      data: {
        fullName: dto.fullName,
        email: dto.email?.toLowerCase(),
        isInternal: dto.isInternal ?? true,
        establishmentId,
        createdById: user.sub
      }
    });
  }
}
