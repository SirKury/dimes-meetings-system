import { IsOptional, IsString, IsUUID } from 'class-validator';

export class QueryAuditLogsDto {
  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  entity?: string;

  @IsOptional()
  @IsUUID()
  establishmentId?: string;
}
