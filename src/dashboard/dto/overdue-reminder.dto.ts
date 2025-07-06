import { ApiProperty } from '@nestjs/swagger';

export class OverdueReminderDto {
  @ApiProperty({ example: 'Mike Ross' })
  patronName: string;

  @ApiProperty({ example: 'Chemistry 101' })
  bookTitle: string;

  @ApiProperty({ example: '2025-03-20T23:59:59.000Z' })
  dueDate: Date;
}