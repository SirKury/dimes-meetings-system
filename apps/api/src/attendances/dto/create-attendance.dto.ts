import { AttendanceStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateAttendanceDto {
  @IsUUID()
  meetingId!: string;

  @IsUUID()
  participantId!: string;

  @IsEnum(AttendanceStatus)
  status!: AttendanceStatus;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
