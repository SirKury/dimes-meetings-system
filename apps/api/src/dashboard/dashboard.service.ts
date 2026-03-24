import { Injectable } from '@nestjs/common';
import { CommitmentStatus, MeetingStatus, MinuteStatus, Prisma } from '@prisma/client';
import { RequestUser } from '../common/types/request-user.type';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(user: RequestUser): Promise<{
    meetingsByStatus: Record<MeetingStatus, number>;
    commitmentsByStatus: Record<CommitmentStatus, number>;
    minutesByStatus: Record<MinuteStatus, number>;
    attendanceTotal: number;
    attachmentsTotal: number;
  }> {
    const meetingWhere: Prisma.MeetingWhereInput =
      user.role === 'SUPERADMIN' ? {} : { establishmentId: user.establishmentId };
    const commitmentWhere: Prisma.CommitmentWhereInput =
      user.role === 'SUPERADMIN' ? {} : { establishmentId: user.establishmentId };
    const minuteWhere: Prisma.MinuteWhereInput =
      user.role === 'SUPERADMIN'
        ? {}
        : {
            meeting: { establishmentId: user.establishmentId }
          };
    const attendanceWhere: Prisma.AttendanceWhereInput =
      user.role === 'SUPERADMIN'
        ? {}
        : {
            meetingParticipant: { meeting: { establishmentId: user.establishmentId } }
          };
    const attachmentWhere: Prisma.AttachmentWhereInput =
      user.role === 'SUPERADMIN' ? {} : { establishmentId: user.establishmentId };

    const [meetings, commitments, minutes, attendanceTotal, attachmentsTotal] = await Promise.all([
      this.prisma.meeting.groupBy({ by: ['status'], _count: true, where: meetingWhere }),
      this.prisma.commitment.groupBy({ by: ['status'], _count: true, where: commitmentWhere }),
      this.prisma.minute.groupBy({ by: ['status'], _count: true, where: minuteWhere }),
      this.prisma.attendance.count({ where: attendanceWhere }),
      this.prisma.attachment.count({ where: attachmentWhere })
    ]);

    return {
      meetingsByStatus: this.toStatusMap(meetings, ['SCHEDULED', 'COMPLETED', 'CANCELED']),
      commitmentsByStatus: this.toStatusMap(commitments, ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE']),
      minutesByStatus: this.toStatusMap(minutes, ['DRAFT', 'FINAL']),
      attendanceTotal,
      attachmentsTotal
    };
  }

  private toStatusMap<TStatus extends string>(
    rows: Array<{ status: TStatus; _count: number }>,
    statuses: TStatus[]
  ): Record<TStatus, number> {
    const map = Object.fromEntries(statuses.map((status) => [status, 0])) as Record<TStatus, number>;

    for (const row of rows) {
      map[row.status] = row._count;
    }

    return map;
  }
}
