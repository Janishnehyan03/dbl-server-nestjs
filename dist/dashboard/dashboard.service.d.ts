import { Model } from 'mongoose';
import { BookDocument } from 'src/books/book.schema';
import { PatronDocument } from 'src/patron/patron.schema';
import { CirculationDocument } from 'src/circulation/schemas/circulation.schema';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';
import { RecentActivityItemDto } from './dto/recent-activity.dto';
import { OverdueReminderDto } from './dto/overdue-reminder.dto';
import { TopBorrowedBookDto } from './dto/top-borrowed-book.dto';
import { MonthlyStatsDto } from './dto/monthly-stats.dto';
export declare class DashboardService {
    private readonly bookModel;
    private readonly patronModel;
    private readonly circulationModel;
    constructor(bookModel: Model<BookDocument>, patronModel: Model<PatronDocument>, circulationModel: Model<CirculationDocument>);
    getStats(): Promise<DashboardStatsDto>;
    private getBooksIssuedTodayCount;
    getRecentActivities(limit: any): Promise<RecentActivityItemDto[]>;
    getTopBorrowedBooks(): Promise<TopBorrowedBookDto[]>;
    getOverdueReminders(): Promise<OverdueReminderDto[]>;
    getMonthlyStats(year: number, month: number): Promise<MonthlyStatsDto>;
}
