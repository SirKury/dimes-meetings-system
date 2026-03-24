import { IsOptional, IsUUID } from 'class-validator';

export class QueryParticipantsDto {
  @IsOptional()
  @IsUUID()
  establishmentId?: string;
}
