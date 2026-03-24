import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { MEETING_MINUTE_STATUS, MeetingMinuteStatusValue } from './create-meeting-minute.dto';

export class UpdateMeetingMinuteDto {
  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  objective?: string;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  agenda?: string;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  development?: string;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  agreements?: string;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsIn(MEETING_MINUTE_STATUS)
  status?: MeetingMinuteStatusValue;
}
