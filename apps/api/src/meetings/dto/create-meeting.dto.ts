import { Transform } from 'class-transformer';
import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export const MEETING_STATUS = ['SCHEDULED', 'COMPLETED', 'CANCELED'] as const;
export type MeetingStatusValue = (typeof MEETING_STATUS)[number];

export class CreateMeetingDto {
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsDateString()
  scheduledAt!: string;

  @IsOptional()
  @IsIn(MEETING_STATUS)
  status?: MeetingStatusValue;

  @IsOptional()
  @IsUUID()
  establishmentId?: string;
}
