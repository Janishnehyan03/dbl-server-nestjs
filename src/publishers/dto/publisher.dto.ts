import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreatePublisherDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class UpdatePublisherDto extends CreatePublisherDto {}
