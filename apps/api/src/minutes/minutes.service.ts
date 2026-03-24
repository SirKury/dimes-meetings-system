import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Minute, Prisma } from '@prisma/client';
import { RequestUser } from '../common/types/request-user.type';
import { PrismaService } from '../prisma.service';
import { QueryMinutesDto } from './dto/query-minutes.dto';
import { UpsertMinuteDto } from './dto/upsert-minute.dto';

@Injectable()
export class MinutesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(user: RequestUser, query: QueryMinutesDto): Promise<Minute[]> {
    const where: Prisma.MinuteWhereInput = {
      meetingId: query.meetingId,
      meeting: {
        establishmentId: user.role === 'SUPERADMIN' ? undefined : user.establishmentId
      }
    };

    return this.prisma.minute.findMany({
      where,
      include: {
        meeting: true,
        createdBy: { select: { id: true, firstName: true, lastName: true } }
      },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async upsert(user: RequestUser, dto: UpsertMinuteDto): Promise<Minute> {
    const meeting = await this.prisma.meeting.findUnique({ where: { id: dto.meetingId } });

    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    if (user.role !== 'SUPERADMIN' && meeting.establishmentId !== user.establishmentId) {
      throw new ForbiddenException('Meeting is outside your establishment scope');
    }

    const status = dto.status ?? 'DRAFT';

    return this.prisma.minute.upsert({
      where: { meetingId: dto.meetingId },
      update: {
        objective: dto.objective,
        agenda: dto.agenda,
        development: dto.development,
        agreements: dto.agreements,
        observations: dto.observations,
        status,
        finalizedAt: status === 'FINAL' ? new Date() : null,
        createdById: user.sub
      },
      create: {
        meetingId: dto.meetingId,
        objective: dto.objective,
        agenda: dto.agenda,
        development: dto.development,
        agreements: dto.agreements,
        observations: dto.observations,
        status,
        finalizedAt: status === 'FINAL' ? new Date() : null,
        createdById: user.sub
      }
    });
  }
}
