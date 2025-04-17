import { IsNotEmpty, IsMongoId } from 'class-validator';

export class IssueBookDto {
  @IsNotEmpty()
  @IsMongoId()
  bookId: string;

  @IsNotEmpty()
  @IsMongoId()
  patronId: string;
}
