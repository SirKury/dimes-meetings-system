import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MeetingMinute, Prisma } from '@prisma/client';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { isGlobalRole } from '../common/auth-scope.util';
import { handlePrismaCreateError } from '../common/prisma-error.util';
import { PrismaService } from '../prisma.service';
import { CreateMeetingMinuteDto } from './dto/create-meeting-minute.dto';
import { UpdateMeetingMinuteDto } from './dto/update-meeting-minute.dto';

@Injectable()
export class MeetingMinutesService {
  constructor(private readonly prisma: PrismaService) {}

  async findByMeetingId(meetingId: string, user: AuthenticatedUser): Promise<MeetingMinute | null> {
    await this.ensureMeetingAccess(meetingId, user);
    return this.prisma.meetingMinute.findUnique({ where: { meetingId } });
  }

  async create(dto: CreateMeetingMinuteDto, user: AuthenticatedUser): Promise<MeetingMinute> {
    await this.ensureMeetingAccess(dto.meetingId, user);

    const data: Prisma.MeetingMinuteCreateInput = {
      objective: dto.objective,
      agenda: dto.agenda,
      development: dto.development,
      agreements: dto.agreements,
      observations: dto.observations,
      status: dto.status,
      meeting: { connect: { id: dto.meetingId } },
      createdBy: { connect: { id: user.userId } }
    };

    try {
      return await this.prisma.meetingMinute.create({ data });
    } catch (error) {
      handlePrismaCreateError(error, 'meeting minute');
    }
  }

  async update(id: string, dto: UpdateMeetingMinuteDto, user: AuthenticatedUser): Promise<MeetingMinute> {
    const minute = await this.prisma.meetingMinute.findUnique({ where: { id } });
    if (!minute) {
      throw new NotFoundException('Meeting minute not found');
    }

    await this.ensureMeetingAccess(minute.meetingId, user);
    return this.prisma.meetingMinute.update({ where: { id }, data: dto });
  }

  async remove(id: string, user: AuthenticatedUser): Promise<MeetingMinute> {
    const minute = await this.prisma.meetingMinute.findUnique({ where: { id } });
    if (!minute) {
      throw new NotFoundException('Meeting minute not found');
    }

    await this.ensureMeetingAccess(minute.meetingId, user);
    return this.prisma.meetingMinute.delete({ where: { id } });
  }

  private async ensureMeetingAccess(meetingId: string, user: AuthenticatedUser): Promise<void> {
    const meeting = await this.prisma.meeting.findUnique({ where: { id: meetingId } });
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    if (!isGlobalRole(user) && meeting.establishmentId !== user.establishmentId) {
      throw new ForbiddenException('You are not authorized to access this meeting');
    }
  }
}
