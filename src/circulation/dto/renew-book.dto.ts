import { IsNotEmpty, IsMongoId } from 'class-validator';

export class RenewBookDto {
  @IsNotEmpty()
  @IsMongoId()
  bookId: string;
}
