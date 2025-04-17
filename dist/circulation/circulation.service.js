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
exports.CirculationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_schema_1 = require("./schemas/transaction.schema");
let CirculationService = class CirculationService {
    transactionModel;
    bookModel;
    patronModel;
    constructor(transactionModel, bookModel, patronModel) {
        this.transactionModel = transactionModel;
        this.bookModel = bookModel;
        this.patronModel = patronModel;
    }
    async issueBook(issueBookDto, staffId) {
        const { bookId, patronId } = issueBookDto;
        const [book, patron] = await Promise.all([
            this.bookModel.findById(bookId),
            this.patronModel.findById(patronId),
        ]);
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        if (!patron)
            throw new common_1.NotFoundException('Patron not found');
        if (book.status !== 'available') {
            throw new common_1.ConflictException('Book is not available for issue');
        }
        const issueDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        const transaction = new this.transactionModel({
            book: bookId,
            patron: patronId,
            issueDate,
            dueDate,
            status: 'issued',
            createdBy: new mongoose_2.Types.ObjectId(staffId),
        });
        book.status = 'issued';
        book.currentHolder = patronId;
        book.lastIssueDate = issueDate;
        book.totalIssues += 1;
        patron.currentBooksIssued += 1;
        patron.totalBooksIssued += 1;
        await Promise.all([transaction.save(), book.save(), patron.save()]);
        return transaction;
    }
    async returnBook(returnBookDto, staffId) {
        const { bookId, condition = 'good' } = returnBookDto;
        const transaction = await this.transactionModel
            .findOne({
            book: bookId,
            status: 'issued',
        })
            .populate('book patron');
        if (!transaction)
            throw new common_1.NotFoundException('No active issue found for this book');
        const returnDate = new Date();
        let fine = 0;
        if (returnDate > transaction.dueDate) {
            const daysOverdue = Math.ceil((returnDate.getTime() - transaction.dueDate.getTime()) /
                (1000 * 60 * 60 * 24));
            fine = daysOverdue * 2;
        }
        transaction.returnDate = returnDate;
        transaction.status = 'returned';
        transaction.fine = fine;
        transaction.notes = `Returned in ${condition} condition by ${staffId}`;
        const book = transaction.book;
        book.status = 'available';
        book.currentHolder = null;
        const patron = transaction.patron;
        patron.currentBooksIssued -= 1;
        if (fine > 0)
            patron.finesDue += fine;
        await Promise.all([transaction.save(), book.save(), patron.save()]);
        return transaction;
    }
    async renewBook(renewBookDto, staffId) {
        const { bookId } = renewBookDto;
        const transaction = await this.transactionModel.findOne({
            book: bookId,
            status: 'issued',
        });
        if (!transaction)
            throw new common_1.NotFoundException('No active issue found for this book');
        if (transaction.renewals >= 2)
            throw new common_1.ForbiddenException('Maximum renewals reached');
        const newDueDate = new Date(transaction.dueDate);
        newDueDate.setDate(newDueDate.getDate() + 14);
        transaction.dueDate = newDueDate;
        transaction.renewals += 1;
        transaction.notes = `Renewed ${transaction.renewals} time(s) by ${staffId}`;
        await transaction.save();
        return transaction;
    }
    async getOverdueBooks() {
        return this.transactionModel
            .find({
            status: 'issued',
            dueDate: { $lt: new Date() },
        })
            .populate('book patron');
    }
    async getPatronBooks(patronId) {
        return this.transactionModel
            .find({
            patron: patronId,
            status: 'issued',
        })
            .populate('book');
    }
    async calculatePatronFines(patronId) {
        const transactions = await this.transactionModel.find({
            patron: patronId,
            status: 'issued',
            dueDate: { $lt: new Date() },
        });
        return transactions.reduce((total, txn) => {
            const daysOverdue = Math.ceil((new Date().getTime() - txn.dueDate.getTime()) / (1000 * 60 * 60 * 24));
            return total + daysOverdue * 2;
        }, 0);
    }
};
exports.CirculationService = CirculationService;
exports.CirculationService = CirculationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __param(1, (0, mongoose_1.InjectModel)('Book')),
    __param(2, (0, mongoose_1.InjectModel)('Patron')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CirculationService);
//# sourceMappingURL=circulation.service.js.map