import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { establishmentScope, isGlobalRole } from '../common/auth-scope.util';
import { handlePrismaCreateError } from '../common/prisma-error.util';
import { PrismaService } from '../prisma.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(user: AuthenticatedUser): Promise<unknown[]> {
    return this.prisma.meeting.findMany({
      where: establishmentScope(user),
      orderBy: { scheduledAt: 'desc' }
    });
  }

  async findOne(id: string, user: AuthenticatedUser): Promise<any> {
    const meeting = await this.prisma.meeting.findUnique({ where: { id } });
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    if (!isGlobalRole(user) && meeting.establishmentId !== user.establishmentId) {
      throw new ForbiddenException('You are not authorized to view this meeting');
    }

    return meeting;
  }

  async create(dto: CreateMeetingDto, user: AuthenticatedUser): Promise<unknown> {
    const establishmentId = isGlobalRole(user)
      ? (dto.establishmentId ?? user.establishmentId)
      : user.establishmentId;

    const data = {
      title: dto.title,
      description: dto.description,
      scheduledAt: new Date(dto.scheduledAt),
      status: dto.status,
      establishment: { connect: { id: establishmentId } },
      createdBy: { connect: { id: user.userId } }
    };

    try {
      return await this.prisma.meeting.create({ data });
    } catch (error) {
      handlePrismaCreateError(error, 'meeting');
    }
  }

  async update(id: string, dto: UpdateMeetingDto, user: AuthenticatedUser): Promise<unknown> {
    await this.findOne(id, user);

    if (dto.establishmentId && !isGlobalRole(user)) {
      throw new ForbiddenException('Only SUPERADMIN can reassign establishment ownership');
    }

    const data = {
      title: dto.title,
      description: dto.description,
      scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
      status: dto.status,
      establishment: dto.establishmentId ? { connect: { id: dto.establishmentId } } : undefined
    };

    return this.prisma.meeting.update({ where: { id }, data });
  }

  async remove(id: string, user: AuthenticatedUser): Promise<unknown> {
    await this.findOne(id, user);
    return this.prisma.meeting.delete({ where: { id } });
  }
}
