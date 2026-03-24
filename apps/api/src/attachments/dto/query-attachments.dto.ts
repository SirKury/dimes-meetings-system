import { IsOptional, IsUUID } from 'class-validator';

export class QueryAttachmentsDto {
  @IsOptional()
  @IsUUID()
  meetingId?: string;

  @IsOptional()
  @IsUUID()
  minuteId?: string;

  @IsOptional()
  @IsUUID()
  commitmentId?: string;

  @IsOptional()
  @IsUUID()
  establishmentId?: string;
}
