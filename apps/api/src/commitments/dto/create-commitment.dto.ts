import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { CommitmentStatus } from '@prisma/client';

export class CreateCommitmentDto {
  @IsUUID()
  minuteId!: string;

  @IsString()
  @MaxLength(1000)
  description!: string;

  @IsDateString()
  dueDate!: string;

  @IsOptional()
  @IsEnum(CommitmentStatus)
  status?: CommitmentStatus;

  @IsOptional()
  @IsUUID()
  responsibleId?: string;
}
