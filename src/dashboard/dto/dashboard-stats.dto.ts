import { ApiProperty } from '@nestjs/swagger'; // Optional, but great for API docs

export class DashboardStatsDto {
  @ApiProperty({
    example: 12500,
    description: 'Total number of unique book titles in the library.',
  })
  totalBooks: number;

  @ApiProperty({
    example: 3200,
    description: 'Total number of registered patrons.',
  })
  totalPatrons: number;

  @ApiProperty({
    example: 245.75,
    description: 'Sum of all outstanding fines across all circulations.',
  })
  totalFines: number;

  @ApiProperty({
    example: 47,
    description: 'Number of books currently checked out past their due date.',
  })
  overdueBooks: number;

  @ApiProperty({
    example: 23,
    description: 'Number of books issued to patrons today.',
  })
  booksIssuedToday: number;
}
