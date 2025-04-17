import { IsNotEmpty, IsMongoId, IsOptional, IsString } from 'class-validator';

export class ReturnBookDto {
  @IsNotEmpty()
  @IsMongoId()
  bookId: string;

  @IsOptional()
  @IsString()
  condition?: string;
}