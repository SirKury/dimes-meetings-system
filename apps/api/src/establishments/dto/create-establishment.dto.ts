import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEstablishmentDto {
  @IsString()
  @MaxLength(150)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;
}
