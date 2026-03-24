import { MinuteStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

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
  @IsEnum(MinuteStatus)
  status?: MinuteStatus;
}
