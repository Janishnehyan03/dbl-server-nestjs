import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/books/book.schema';
import { Patron, PatronDocument } from 'src/patron/patron.schema';
import { CirculationDocument } from 'src/circulation/schemas/circulation.schema';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';
import { FINES } from 'src/lib/const';
import { RecentActivityItemDto } from './dto/recent-activity.dto';
import { OverdueReminderDto } from './dto/overdue-reminder.dto';
import { TopBorrowedBookDto } from './dto/top-borrowed-book.dto';
import { MonthlyStatsDto } from './dto/monthly-stats.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<BookDocument>,
    @InjectModel('Patron') private readonly patronModel: Model<PatronDocument>,
    @InjectModel('Circulation')
    private readonly circulationModel: Model<CirculationDocument>,
  ) {}

  async getStats(): Promise<DashboardStatsDto> {
    const [
      totalBooks,
      totalPatrons,
      totalOutstandingFines, // Renamed for clarity
      overdueBooks,
      booksIssuedToday,
    ] = await Promise.all([
      // 1. Total books
      this.bookModel.countDocuments().exec(),

      // 2. Total patrons
      this.patronModel.countDocuments().exec(),

      // 3. Total outstanding fines (calculated for overdue, unreturned books)
      (async () => {
        const finePerDay = FINES.STUDENT_LATE;
        const today = new Date();

        const overdueUnreturned = await this.circulationModel
          .find({
            status: 'issued',
            dueDate: { $lt: today },
            returnDate: { $exists: false },
          })
          // NOTE: If 'book' is a reference, you might want to .populate('book', 'title')
          // to get more book details if you ever need them.
          .select('dueDate book') // Using 'book' as per your provided code
          .lean();

        // Use .map to calculate fine for each book
        const finesPerBook = overdueUnreturned
          .map((doc) => {
            const due = new Date(doc.dueDate);
            const daysOverdue = Math.floor(
              (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24),
            );

            if (daysOverdue <= 0) {
              return null;
            }

            return {
              // You can keep this structure if you want to log it, but the key is the 'fine'
              fine: daysOverdue * finePerDay,
            };
          })
          .filter(Boolean);

        // FIX: Use .reduce() to sum up the fines from the array into a single total
        const total = finesPerBook.reduce(
          (accumulator, current) => accumulator + (current ? current.fine : 0),
          0, // The initial value for the accumulator is 0
        );

        return total;
      })(), // This IIFE now correctly returns a single number

      // 4. Count overdue books
      this.circulationModel
        .countDocuments({
          status: 'issued',
          dueDate: { $lt: new Date() },
          returnDate: { $exists: false },
        })
        .exec(),

      // 5. Books issued today
      this.getBooksIssuedTodayCount(),
    ]);

    // FIX: Directly use the result, as it's now a number
    const totalFines = totalOutstandingFines;

    return {
      totalBooks,
      totalPatrons,
      totalFines, // This will be the calculated sum
      overdueBooks,
      booksIssuedToday,
    };
  }

  /**
   * Helper function to get the count of books issued today.
   * This logic is separated for clarity.
   */
  private getBooksIssuedTodayCount(): Promise<number> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    return this.circulationModel
      .countDocuments({
        issueDate: {
          $gte: startOfToday,
          $lte: endOfToday,
        },
      })
      .exec();
  }

  async getRecentActivities(limit): Promise<RecentActivityItemDto[]> {
    const activityLimit = 10; // How many of each type to fetch initially
    const finalLimit = parseInt(limit) ? limit : 5; // Get from query if provided, else default to 5

    // 1. Fetch latest book issues
    const latestIssues = await this.circulationModel
      .find()
      .sort({ issueDate: -1 })
      .limit(activityLimit)
      .populate('patron', 'name')
      .populate('book', 'title')
      .lean()
      .exec();

    // 2. Fetch latest book returns
    const latestReturns = await this.circulationModel
      .find({ status: 'returned' })
      .sort({ returnDate: -1 })
      .limit(activityLimit)
      .populate({ path: 'patron', select: 'name' })
      .populate({ path: 'book', select: 'title' })
      .lean<
        {
          book: { title?: string } | string;
          patron: { name?: string } | string;
          returnDate: Date;
        }[]
      >()
      .exec();

    // 3. Fetch latest fine payments
    const latestFinesPaid = await this.circulationModel
      .find({ status: 'fine_paid' }) // Assuming 'fine_paid' is a status for paid fines
      .sort({ paymentDate: -1 }) // Assuming 'paymentDate' is the date
      .limit(activityLimit)
      .populate({ path: 'patron', select: 'name' })
      .populate({ path: 'book', select: 'title' })
      .lean<
        {
          patron: { name?: string } | string;
          book: { title?: string } | string;
          amount?: number;
          paymentDate?: Date;
        }[]
      >()
      .exec();

    // 4. Standardize and combine all activities into one list
    const allActivities: RecentActivityItemDto[] = [];

    latestIssues.forEach((item) => {
      allActivities.push({
        type: 'Book Issued',
        description: `${typeof item.book === 'object' && 'title' in item.book ? (item.book as any).title : 'Unknown Book'} issued to ${typeof item.patron === 'object' && item.patron && 'name' in item.patron ? (item.patron as any).name : 'Unknown Patron'}`,
        timestamp: item.issueDate,
      });
    });

    latestReturns.forEach((item) => {
      const bookTitle =
        typeof item.book === 'object' && item.book && 'title' in item.book
          ? (item.book as any).title
          : 'Unknown Book';
      const patronName =
        typeof item.patron === 'object' && item.patron && 'name' in item.patron
          ? (item.patron as any).name
          : 'Unknown Patron';
      allActivities.push({
        type: 'Book Returned',
        description: `${bookTitle} returned by ${patronName}`,
        timestamp: item.returnDate,
      });
    });

    latestFinesPaid.forEach((item) => {
      const bookTitle =
        typeof item.book === 'object' && item.book && 'title' in item.book
          ? (item.book as any).title
          : 'a book';
      const patronName =
        typeof item.patron === 'object' && item.patron && 'name' in item.patron
          ? (item.patron as any).name
          : 'Unknown Patron';
      const amount = typeof item.amount === 'number' ? item.amount : 0;
      allActivities.push({
        type: 'Fine Paid',
        description: `${patronName} paid $${amount.toFixed(2)} for ${bookTitle}`,
        timestamp: item.paymentDate ?? new Date(),
      });
    });

    // 5. Sort all activities by date descending and take the top N
    return allActivities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, finalLimit);
  }

   async getTopBorrowedBooks(): Promise<TopBorrowedBookDto[]> {
    const topBooks = await this.circulationModel.aggregate([
      // Stage 1: Group by the 'book' field and count each occurrence
      {
        $group: {
          _id: '$book',
          borrowCount: { $sum: 1 },
        },
      },
      // Stage 2: Sort by the count in descending order
      { $sort: { borrowCount: -1 } },
      // Stage 3: Limit to the top 5
      { $limit: 5 },
      // Stage 4: Join with the 'books' collection to get book details
      {
        $lookup: {
          from: 'books', // The name of the books collection
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      // Stage 5: Deconstruct the bookDetails array
      { $unwind: '$bookDetails' },
      // Stage 6: Project the final shape
      {
        $project: {
          _id: 0, // Exclude the default _id
          bookId: '$_id',
          title: '$bookDetails.title',
          borrowCount: '$borrowCount',
        },
      },
    ]);

    return topBooks;
  }

  /**
   * Gets a list of currently overdue books with patron and book info.
   */
  async getOverdueReminders(): Promise<OverdueReminderDto[]> {
    const overdueCirculations = await this.circulationModel
      .find({
        status: 'issued',
        dueDate: { $lt: new Date() },
      })
      .sort({ dueDate: 1 }) // Show the most overdue first
      .limit(5)
      .populate<{ book: Book; patron: Patron }>('book', 'title') // Populate book title
      .populate<{ patron: Patron }>('patron', 'name') // Populate patron name
      .lean()
      .exec();

    // Map the results to our DTO shape
    return overdueCirculations.map((circ) => ({
      patronName: circ.patron?.name || 'Unknown Patron',
      bookTitle: circ.book?.title || 'Unknown Book',
      dueDate: circ.dueDate,
    }));
  }

  async getMonthlyStats(
    year: number,
    month: number,
  ): Promise<MonthlyStatsDto> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // End of the last day of the month

    // 1. Aggregate daily issue counts
    const issuedStatsPromise = this.circulationModel.aggregate([
      { $match: { issueDate: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$issueDate' } },
          count: { $sum: 1 },
        },
      },
    ]);

    // 2. Aggregate daily return counts
    const returnedStatsPromise = this.circulationModel.aggregate([
      { $match: { returnDate: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$returnDate' } },
          count: { $sum: 1 },
        },
      },
    ]);

    const [issuedStats, returnedStats] = await Promise.all([
      issuedStatsPromise,
      returnedStatsPromise,
    ]);

    // 3. Merge the results
    const statsMap = new Map<string, { issued: number; returned: number }>();
    
    // Initialize map with all days of the month to ensure no gaps in the chart
    for (let d = 1; d <= endDate.getDate(); d++) {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        statsMap.set(dateStr, { issued: 0, returned: 0 });
    }

    issuedStats.forEach(stat => {
        const entry = statsMap.get(stat._id);
        if(entry) entry.issued = stat.count;
    });

    returnedStats.forEach(stat => {
        const entry = statsMap.get(stat._id);
        if(entry) entry.returned = stat.count;
    });

    const dailyStats = Array.from(statsMap.entries()).map(([date, counts]) => ({
      date,
      ...counts,
    }));

    // 4. Calculate totals
    const totalBooksIssued = dailyStats.reduce((sum, s) => sum + s.issued, 0);
    const totalBooksReturned = dailyStats.reduce((sum, s) => sum + s.returned, 0);

    return {
      month: startDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
      totalBooksIssued,
      totalBooksReturned,
      dailyStats,
    };
  }
}
