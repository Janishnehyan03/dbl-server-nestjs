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
const circulation_schema_1 = require("./schemas/circulation.schema");
let CirculationService = class CirculationService {
    circulationModel;
    bookModel;
    patronModel;
    constructor(circulationModel, bookModel, patronModel) {
        this.circulationModel = circulationModel;
        this.bookModel = bookModel;
        this.patronModel = patronModel;
    }
    async issueBook(issueBookDto, staffId) {
        const { bookId, patronId } = issueBookDto;
        const [book, patron] = await Promise.all([
            this.bookModel.findById(bookId),
            this.patronModel.findById(patronId),
        ]);
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${bookId} not found`);
        }
        if (!patron) {
            throw new common_1.NotFoundException(`Patron with ID ${patronId} not found`);
        }
        if (book.status !== 'available') {
            throw new common_1.ConflictException(`Book "${book.title}" is not available for issue`);
        }
        const issueDate = new Date();
        const dueDate = new Date(issueDate);
        dueDate.setDate(dueDate.getDate() + 14);
        const circulation = new this.circulationModel({
            book: new mongoose_2.Types.ObjectId(bookId),
            patron: new mongoose_2.Types.ObjectId(patronId),
            issueDate,
            dueDate,
            status: 'issued',
            createdBy: new mongoose_2.Types.ObjectId(staffId),
        });
        book.status = 'issued';
        book.currentHolder = patronId;
        book.lastIssueDate = issueDate;
        book.totalIssues = (book.totalIssues || 0) + 1;
        patron.currentBooksIssued = (patron.currentBooksIssued || 0) + 1;
        patron.totalBooksIssued = (patron.totalBooksIssued || 0) + 1;
        await Promise.all([circulation.save(), book.save(), patron.save()]);
        return {
            message: `Book "${book.title}" successfully issued to ${patron.name}`,
            circulationId: circulation._id,
            dueDate: circulation.dueDate,
        };
    }
    async returnBook(returnBookDto, staffId) {
        const { bookId } = returnBookDto;
        const transaction = await this.circulationModel.findOne({
            book: new mongoose_2.Types.ObjectId(bookId),
            status: 'issued',
        });
        if (!transaction) {
            throw new common_1.NotFoundException('No active issue found for this book');
        }
        const book = await this.bookModel.findById(bookId);
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${bookId} not found`);
        }
        const patron = await this.patronModel.findById(transaction.patron);
        if (!patron) {
            throw new common_1.NotFoundException(`Patron with ID ${transaction.patron} not found`);
        }
        let fine = 0;
        if (transaction.dueDate < new Date()) {
            const daysOverdue = Math.ceil((new Date().getTime() - transaction.dueDate.getTime()) /
                (1000 * 60 * 60 * 24));
            fine = daysOverdue * 2;
        }
        book.status = 'available';
        patron.currentBooksIssued -= 1;
        transaction.status = 'returned';
        transaction.returnDate = new Date();
        transaction.fine = fine;
        transaction.notes = `Returned by ${staffId}`;
        await Promise.all([book.save(), patron.save(), transaction.save()]);
        return {
            message: `Book "${book.title}" successfully returned by ${patron.name}`,
            fine,
            transactionId: transaction._id,
        };
    }
    async renewBook(renewBookDto, staffId) {
        const { bookId } = renewBookDto;
        const transaction = await this.circulationModel.findOne({
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
        return this.circulationModel
            .find({
            status: 'issued',
            dueDate: { $lt: new Date() },
        })
            .populate('book patron');
    }
    async getPatronBooks(patronId) {
        return this.circulationModel
            .find({
            patron: patronId,
            status: 'issued',
        })
            .populate('book');
    }
    async calculatePatronFines(patronId) {
        const transactions = await this.circulationModel.find({
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
    __param(0, (0, mongoose_1.InjectModel)(circulation_schema_1.Circulation.name)),
    __param(1, (0, mongoose_1.InjectModel)('Book')),
    __param(2, (0, mongoose_1.InjectModel)('Patron')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CirculationService);
//# sourceMappingURL=circulation.service.js.map