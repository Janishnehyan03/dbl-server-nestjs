import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecentActivitiesDto } from './dto/recent-activity.dto';
import { OverdueReminderDto } from './dto/overdue-reminder.dto';
import { TopBorrowedBookDto } from './dto/top-borrowed-book.dto';
import { MonthlyStatsDto } from './dto/monthly-stats.dto';

@ApiTags('Dashboard') // Group this endpoint in Swagger UI
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get key library statistics' })
  @ApiOkResponse({
    description: 'Successfully retrieved library statistics.',
    type: DashboardStatsDto,
  })
  async getStats(): Promise<DashboardStatsDto> {
    return this.dashboardService.getStats();
  }

  // NEW ENDPOINT:
  @Get('recent-activities')
  @ApiOperation({ summary: 'Get a timeline of recent library activities' })
  @ApiOkResponse({
    description: 'Successfully retrieved recent activities.',
    type: RecentActivitiesDto, // Use the DTO for Swagger documentation
  })
  async getRecentActivities(
    @Query('limit') limit?: number,
  ): Promise<RecentActivitiesDto> {
    return this.dashboardService.getRecentActivities(limit);
  }

  @Get('top-borrowed-books')
  @ApiOperation({ summary: 'Get a list of the most borrowed books' })
  @ApiOkResponse({
    description: 'Successfully retrieved top borrowed books.',
    type: [TopBorrowedBookDto],
  })
  async getTopBorrowedBooks(): Promise<TopBorrowedBookDto[]> {
    return this.dashboardService.getTopBorrowedBooks();
  }

  @Get('overdue-reminders')
  @ApiOperation({ summary: 'Get a list of overdue books' })
  @ApiOkResponse({
    description: 'Successfully retrieved overdue book reminders.',
    type: [OverdueReminderDto],
  })
  async getOverdueReminders(): Promise<OverdueReminderDto[]> {
    return this.dashboardService.getOverdueReminders();
  }

  @Get('monthly-stats')
  @ApiOperation({
    summary: 'Get monthly statistics for book issues and returns',
  })
  @ApiOkResponse({ type: MonthlyStatsDto })
  async getMonthlyStats(
    @Query('year', new DefaultValuePipe(new Date().getFullYear()), ParseIntPipe)
    year: number,
    @Query(
      'month',
      new DefaultValuePipe(new Date().getMonth() + 1),
      ParseIntPipe,
    )
    month: number,
  ): Promise<MonthlyStatsDto> {
    return this.dashboardService.getMonthlyStats(year, month);
  }
}
