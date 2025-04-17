import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 5) // Language codes like 'EN', 'FR', 'ES', 'ZH-CN'
  code: string;
}
