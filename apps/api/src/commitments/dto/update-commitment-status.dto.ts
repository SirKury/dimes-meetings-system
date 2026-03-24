import { CommitmentStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateCommitmentStatusDto {
  @IsEnum(CommitmentStatus)
  status!: CommitmentStatus;
}
