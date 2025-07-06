import { ApiProperty } from '@nestjs/swagger';

export class RecentActivityItemDto {
  @ApiProperty({
    description: 'The type of the activity.',
    example: 'Book Issued',
  })
  type: string;

  @ApiProperty({
    description: 'A human-readable description of the event.',
    example: 'The Great Gatsby issued to John Doe',
  })
  description: string;

  @ApiProperty({
    description: 'The timestamp of when the event occurred.',
    example: '2023-11-30T09:15:00.000Z',
  })
  timestamp: Date;
}

// This allows Swagger to correctly document an array response
export class RecentActivitiesDto extends Array<RecentActivityItemDto> {}