import { IsString, IsEmail, IsArray, IsNumber, IsBoolean } from 'class-validator';

export class CreateConfigurationDto {
  @IsString()
  libraryTitle: string;

  @IsString()
  description: string;

  @IsEmail()
  email: string;

  @IsString()
  contactNumber: string;

  @IsArray()
  openingDays: string[];

  @IsString()
  openingTime: string;

  @IsString()
  closingTime: string;

  @IsNumber()
  maxBooksPerUser: number;

  @IsNumber()
  borrowDurationDays: number;

  @IsNumber()
  finePerDay: number;

  @IsBoolean()
  isActive: boolean;
}

export class UpdateConfigurationDto extends CreateConfigurationDto {}
