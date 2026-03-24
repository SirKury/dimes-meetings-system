import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEstablishmentDto {
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @Transform(({ value }: { value: string | undefined }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(20)
  code?: string;

  @Transform(({ value }: { value: string | undefined }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;
}
