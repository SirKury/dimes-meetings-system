import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { MeetingStatus } from '@prisma/client';

export class QueryMeetingsDto {
  @IsOptional()
  @IsEnum(MeetingStatus)
  status?: MeetingStatus;

  @IsOptional()
  @IsUUID()
  establishmentId?: string;
}
