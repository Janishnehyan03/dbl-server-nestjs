"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const const_1 = require("../lib/const");
let DashboardService = class DashboardService {
    bookModel;
    patronModel;
    circulationModel;
    constructor(bookModel, patronModel, circulationModel) {
        this.bookModel = bookModel;
        this.patronModel = patronModel;
        this.circulationModel = circulationModel;
    }
    async getStats() {
        const [totalBooks, totalPatrons, totalOutstandingFines, overdueBooks, booksIssuedToday,] = await Promise.all([
            this.bookModel.countDocuments().exec(),
            this.patronModel.countDocuments().exec(),
            (async () => {
                const finePerDay = const_1.FINES.STUDENT_LATE;
                const today = new Date();
                const overdueUnreturned = await this.circulationModel
                    .find({
                    status: 'issued',
                    dueDate: { $lt: today },
                    returnDate: { $exists: false },
                })
                    .select('dueDate book')
                    .lean();
                const finesPerBook = overdueUnreturned
                    .map((doc) => {
                    const due = new Date(doc.dueDate);
                    const daysOverdue = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
                    if (daysOverdue <= 0) {
                        return null;
                    }
                    return {
                        fine: daysOverdue * finePerDay,
                    };
                })
                    .filter(Boolean);
                const total = finesPerBook.reduce((accumulator, current) => accumulator + (current ? current.fine : 0), 0);
                return total;
            })(),
            this.circulationModel
                .countDocuments({
                status: 'issued',
                dueDate: { $lt: new Date() },
                returnDate: { $exists: false },
            })
                .exec(),
            this.getBooksIssuedTodayCount(),
        ]);
        const totalFines = totalOutstandingFines;
        return {
            totalBooks,
            totalPatrons,
            totalFines,
            overdueBooks,
            booksIssuedToday,
        };
    }
    getBooksIssuedTodayCount() {
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
    async getRecentActivities(limit) {
        const activityLimit = 10;
        const finalLimit = parseInt(limit) ? limit : 5;
        const latestIssues = await this.circulationModel
            .find()
            .sort({ issueDate: -1 })
            .limit(activityLimit)
            .populate('patron', 'name')
            .populate('book', 'title')
            .lean()
            .exec();
        const latestReturns = await this.circulationModel
            .find({ status: 'returned' })
            .sort({ returnDate: -1 })
            .limit(activityLimit)
            .populate({ path: 'patron', select: 'name' })
            .populate({ path: 'book', select: 'title' })
            .lean()
            .exec();
        const latestFinesPaid = await this.circulationModel
            .find({ status: 'fine_paid' })
            .sort({ paymentDate: -1 })
            .limit(activityLimit)
            .populate({ path: 'patron', select: 'name' })
            .populate({ path: 'book', select: 'title' })
            .lean()
            .exec();
        const allActivities = [];
        latestIssues.forEach((item) => {
            allActivities.push({
                type: 'Book Issued',
                description: `${typeof item.book === 'object' && 'title' in item.book ? item.book.title : 'Unknown Book'} issued to ${typeof item.patron === 'object' && item.patron && 'name' in item.patron ? item.patron.name : 'Unknown Patron'}`,
                timestamp: item.issueDate,
            });
        });
        latestReturns.forEach((item) => {
            const bookTitle = typeof item.book === 'object' && item.book && 'title' in item.book
                ? item.book.title
                : 'Unknown Book';
            const patronName = typeof item.patron === 'object' && item.patron && 'name' in item.patron
                ? item.patron.name
                : 'Unknown Patron';
            allActivities.push({
                type: 'Book Returned',
                description: `${bookTitle} returned by ${patronName}`,
                timestamp: item.returnDate,
            });
        });
        latestFinesPaid.forEach((item) => {
            const bookTitle = typeof item.book === 'object' && item.book && 'title' in item.book
                ? item.book.title
                : 'a book';
            const patronName = typeof item.patron === 'object' && item.patron && 'name' in item.patron
                ? item.patron.name
                : 'Unknown Patron';
            const amount = typeof item.amount === 'number' ? item.amount : 0;
            allActivities.push({
                type: 'Fine Paid',
                description: `${patronName} paid $${amount.toFixed(2)} for ${bookTitle}`,
                timestamp: item.paymentDate ?? new Date(),
            });
        });
        return allActivities
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, finalLimit);
    }
    async getTopBorrowedBooks() {
        const topBooks = await this.circulationModel.aggregate([
            {
                $group: {
                    _id: '$book',
                    borrowCount: { $sum: 1 },
                },
            },
            { $sort: { borrowCount: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookDetails',
                },
            },
            { $unwind: '$bookDetails' },
            {
                $project: {
                    _id: 0,
                    bookId: '$_id',
                    title: '$bookDetails.title',
                    borrowCount: '$borrowCount',
                },
            },
        ]);
        return topBooks;
    }
    async getOverdueReminders() {
        const overdueCirculations = await this.circulationModel
            .find({
            status: 'issued',
            dueDate: { $lt: new Date() },
        })
            .sort({ dueDate: 1 })
            .limit(5)
            .populate('book', 'title')
            .populate('patron', 'name')
            .lean()
            .exec();
        return overdueCirculations.map((circ) => ({
            patronName: circ.patron?.name || 'Unknown Patron',
            bookTitle: circ.book?.title || 'Unknown Book',
            dueDate: circ.dueDate,
        }));
    }
    async getMonthlyStats(year, month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);
        const issuedStatsPromise = this.circulationModel.aggregate([
            { $match: { issueDate: { $gte: startDate, $lte: endDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$issueDate' } },
                    count: { $sum: 1 },
                },
            },
        ]);
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
        const statsMap = new Map();
        for (let d = 1; d <= endDate.getDate(); d++) {
            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            statsMap.set(dateStr, { issued: 0, returned: 0 });
        }
        issuedStats.forEach(stat => {
            const entry = statsMap.get(stat._id);
            if (entry)
                entry.issued = stat.count;
        });
        returnedStats.forEach(stat => {
            const entry = statsMap.get(stat._id);
            if (entry)
                entry.returned = stat.count;
        });
        const dailyStats = Array.from(statsMap.entries()).map(([date, counts]) => ({
            date,
            ...counts,
        }));
        const totalBooksIssued = dailyStats.reduce((sum, s) => sum + s.issued, 0);
        const totalBooksReturned = dailyStats.reduce((sum, s) => sum + s.returned, 0);
        return {
            month: startDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
            totalBooksIssued,
            totalBooksReturned,
            dailyStats,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Book')),
    __param(1, (0, mongoose_1.InjectModel)('Patron')),
    __param(2, (0, mongoose_1.InjectModel)('Circulation')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map