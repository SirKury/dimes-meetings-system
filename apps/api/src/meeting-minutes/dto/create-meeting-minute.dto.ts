import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export const MEETING_MINUTE_STATUS = ['DRAFT', 'FINAL'] as const;
export type MeetingMinuteStatusValue = (typeof MEETING_MINUTE_STATUS)[number];

export class CreateMeetingMinuteDto {
  @IsUUID()
  meetingId!: string;

  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  objective!: string;

  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  agenda!: string;

  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  development!: string;

  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  agreements!: string;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsIn(MEETING_MINUTE_STATUS)
  status?: MeetingMinuteStatusValue;
}
