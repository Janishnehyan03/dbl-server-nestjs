import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';
import { RecentActivitiesDto } from './dto/recent-activity.dto';
import { OverdueReminderDto } from './dto/overdue-reminder.dto';
import { TopBorrowedBookDto } from './dto/top-borrowed-book.dto';
import { MonthlyStatsDto } from './dto/monthly-stats.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<DashboardStatsDto>;
    getRecentActivities(limit?: number): Promise<RecentActivitiesDto>;
    getTopBorrowedBooks(): Promise<TopBorrowedBookDto[]>;
    getOverdueReminders(): Promise<OverdueReminderDto[]>;
    getMonthlyStats(year: number, month: number): Promise<MonthlyStatsDto>;
}
