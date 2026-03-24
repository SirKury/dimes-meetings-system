import { ForbiddenException, Injectable } from '@nestjs/common';
import { Meeting, Prisma } from '@prisma/client';
import { RequestUser } from '../common/types/request-user.type';
import { PrismaService } from '../prisma.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { QueryMeetingsDto } from './dto/query-meetings.dto';

@Injectable()
export class MeetingsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(user: RequestUser, query: QueryMeetingsDto): Promise<Meeting[]> {
    const where: Prisma.MeetingWhereInput = {
      status: query.status,
      establishmentId:
        user.role === 'SUPERADMIN' ? (query.establishmentId ?? undefined) : user.establishmentId
    };

    return this.prisma.meeting.findMany({
      where,
      include: {
        establishment: true,
        createdBy: { select: { id: true, firstName: true, lastName: true } }
      },
      orderBy: { scheduledAt: 'desc' }
    });
  }

  async create(user: RequestUser, dto: CreateMeetingDto): Promise<Meeting> {
    if (user.role !== 'SUPERADMIN' && dto.establishmentId !== user.establishmentId) {
      throw new ForbiddenException('Cannot create meetings outside your establishment scope');
    }

    return this.prisma.meeting.create({
      data: {
        title: dto.title,
        description: dto.description,
        scheduledAt: new Date(dto.scheduledAt),
        status: dto.status,
        establishmentId: dto.establishmentId,
        createdById: user.sub
      }
    });
  }
}
