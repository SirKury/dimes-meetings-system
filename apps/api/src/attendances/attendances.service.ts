import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { isGlobalRole } from '../common/auth-scope.util';
import { handlePrismaCreateError } from '../common/prisma-error.util';
import { PrismaService } from '../prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendancesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(meetingId: string, user: AuthenticatedUser): Promise<unknown[]> {
    await this.ensureMeetingAccess(meetingId, user);
    return this.prisma.attendance.findMany({ where: { meetingId }, orderBy: { createdAt: 'asc' } });
  }

  async create(dto: CreateAttendanceDto, user: AuthenticatedUser): Promise<unknown> {
    await this.ensureMeetingAccess(dto.meetingId, user);
    await this.ensureParticipantBelongsToMeeting(dto.participantId, dto.meetingId);

    const data = {
      status: dto.status,
      notes: dto.notes,
      meeting: { connect: { id: dto.meetingId } },
      participant: { connect: { id: dto.participantId } }
    };

    try {
      return await this.prisma.attendance.create({ data });
    } catch (error) {
      handlePrismaCreateError(error, 'attendance');
    }
  }

  async update(id: string, dto: UpdateAttendanceDto, user: AuthenticatedUser): Promise<unknown> {
    const attendance = await this.prisma.attendance.findUnique({ where: { id } });
    if (!attendance) {
      throw new NotFoundException('Attendance not found');
    }

    await this.ensureMeetingAccess(attendance.meetingId, user);

    return this.prisma.attendance.update({ where: { id }, data: dto });
  }

  async remove(id: string, user: AuthenticatedUser): Promise<unknown> {
    const attendance = await this.prisma.attendance.findUnique({ where: { id } });
    if (!attendance) {
      throw new NotFoundException('Attendance not found');
    }

    await this.ensureMeetingAccess(attendance.meetingId, user);
    return this.prisma.attendance.delete({ where: { id } });
  }

  private async ensureParticipantBelongsToMeeting(participantId: string, meetingId: string): Promise<void> {
    const participant = await this.prisma.participant.findUnique({ where: { id: participantId } });
    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    if (participant.meetingId !== meetingId) {
      throw new BadRequestException('Participant does not belong to the provided meeting');
    }
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
