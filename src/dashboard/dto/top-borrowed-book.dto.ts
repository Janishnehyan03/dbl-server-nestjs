import { ApiProperty } from '@nestjs/swagger';

export class TopBorrowedBookDto {
  @ApiProperty({ example: '638dd2e7ab05b63434b17a12' })
  bookId: string;

  @ApiProperty({ example: 'To Kill a Mockingbird' })
  title: string;

  @ApiProperty({ example: 120 })
  borrowCount: number;
}
