import { ApiProperty } from '@nestjs/swagger';

class DailyStat {
  @ApiProperty({ example: '2025-03-23' })
  date: string;

  @ApiProperty({ example: 23 })
  issued: number;

  @ApiProperty({ example: 21 })
  returned: number;
}

export class MonthlyStatsDto {
  @ApiProperty({ example: 'March 2025' })
  month: string;

  @ApiProperty({ example: 450 })
  totalBooksIssued: number;

  @ApiProperty({ example: 420 })
  totalBooksReturned: number;

  @ApiProperty({ type: [DailyStat] })
  dailyStats: DailyStat[];
}
