import { Transform } from 'class-transformer';
import { IsDateString, IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { MEETING_STATUS, MeetingStatusValue } from './create-meeting.dto';

export class UpdateMeetingDto {
  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsIn(MEETING_STATUS)
  status?: MeetingStatusValue;

  @IsOptional()
  @IsUUID()
  establishmentId?: string;
}
