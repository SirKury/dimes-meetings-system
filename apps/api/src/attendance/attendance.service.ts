import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Attendance } from '@prisma/client';
import { RequestUser } from '../common/types/request-user.type';
import { PrismaService } from '../prisma.service';
import { QueryAttendanceDto } from './dto/query-attendance.dto';
import { RegisterAttendanceDto } from './dto/register-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async listByMeeting(user: RequestUser, query: QueryAttendanceDto): Promise<Attendance[]> {
    await this.assertMeetingScope(user, query.meetingId);

    return this.prisma.attendance.findMany({
      where: { meetingParticipant: { meetingId: query.meetingId } },
      include: {
        meetingParticipant: { include: { participant: true } },
        registeredBy: { select: { id: true, firstName: true, lastName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async register(user: RequestUser, dto: RegisterAttendanceDto): Promise<Attendance> {
    await this.assertMeetingScope(user, dto.meetingId);

    const meetingParticipant = await this.prisma.meetingParticipant.upsert({
      where: {
        meetingId_participantId: {
          meetingId: dto.meetingId,
          participantId: dto.participantId
        }
      },
      update: {},
      create: {
        meetingId: dto.meetingId,
        participantId: dto.participantId
      }
    });

    return this.prisma.attendance.upsert({
      where: { meetingParticipantId: meetingParticipant.id },
      update: {
        status: dto.status,
        registeredById: user.sub
      },
      create: {
        meetingParticipantId: meetingParticipant.id,
        status: dto.status,
        registeredById: user.sub
      }
    });
  }

  private async assertMeetingScope(user: RequestUser, meetingId: string): Promise<void> {
    const meeting = await this.prisma.meeting.findUnique({ where: { id: meetingId } });

    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    if (user.role !== 'SUPERADMIN' && meeting.establishmentId !== user.establishmentId) {
      throw new ForbiddenException('Meeting is outside your establishment scope');
    }
  }
}
