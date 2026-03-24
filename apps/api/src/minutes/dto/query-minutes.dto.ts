import { IsOptional, IsUUID } from 'class-validator';

export class QueryMinutesDto {
  @IsOptional()
  @IsUUID()
  meetingId?: string;
}
