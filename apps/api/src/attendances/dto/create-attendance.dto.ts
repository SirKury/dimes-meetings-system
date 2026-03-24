import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export const ATTENDANCE_STATUS = ['ATTENDED', 'ABSENT', 'EXCUSED'] as const;
export type AttendanceStatusValue = (typeof ATTENDANCE_STATUS)[number];

export class CreateAttendanceDto {
  @IsUUID()
  meetingId!: string;

  @IsUUID()
  participantId!: string;

  @IsIn(ATTENDANCE_STATUS)
  status!: AttendanceStatusValue;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
