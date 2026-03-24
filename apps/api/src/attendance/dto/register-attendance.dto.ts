import { AttendanceStatus } from '@prisma/client';
import { IsEnum, IsUUID } from 'class-validator';

export class RegisterAttendanceDto {
  @IsUUID()
  meetingId!: string;

  @IsUUID()
  participantId!: string;

  @IsEnum(AttendanceStatus)
  status!: AttendanceStatus;
}
