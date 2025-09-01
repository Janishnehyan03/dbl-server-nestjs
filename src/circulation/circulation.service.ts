import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Circulation } from './schemas/circulation.schema';
import { Book } from 'src/books/book.schema';
import { Patron } from 'src/patron/patron.schema';
import { IssueBookDto } from './dto/issue-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
import { RenewBookDto } from './dto/renew-book.dto';
import { FINE } from 'src/common';

// ==================== CONFIG CONSTANTS ====================
const ISSUE_PERIOD_DAYS = FINE.ISSUE_PERIOD_DAYS;
const RENEWAL_PERIOD_DAYS = FINE.RENEWAL_PERIOD_DAYS;
const MAX_RENEWALS = FINE.MAX_RENEWALS;
const FINE_PER_DAY = FINE.FINE_PER_DAY;
// ==========================================================

@Injectable()
export class CirculationService {
  constructor(
    @InjectModel(Circulation.name) private circulationModel: Model<Circulation>,
    @InjectModel('Book') private bookModel: Model<Book>,
    @InjectModel('Patron') private patronModel: Model<Patron>,
  ) {}

  async issueBook(issueBookDto: IssueBookDto, staffId: string) {
    const { bookId, patronId } = issueBookDto;

    const [book, patron] = await Promise.all([
      this.bookModel.findById(bookId),
      this.patronModel.findById(patronId),
    ]);

    if (!book) throw new NotFoundException(`Book with ID ${bookId} not found`);
    if (!patron)
      throw new NotFoundException(`Patron with ID ${patronId} not found`);
    if (book.status !== 'available') {
      throw new ConflictException(
        `Book "${book.title}" is not available for issue`,
      );
    }

    const issueDate = new Date();
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + ISSUE_PERIOD_DAYS);

    const circulation = new this.circulationModel({
      book: new Types.ObjectId(bookId),
      patron: new Types.ObjectId(patronId),
      issueDate,
      dueDate,
      status: 'issued',
      createdBy: new Types.ObjectId(staffId),
    });

    // Update book
    book.status = 'issued';
    book.currentHolder = patronId;
    book.lastIssueDate = issueDate;
    book.totalIssues = (book.totalIssues || 0) + 1;

    // Update patron
    patron.currentBooksIssued = (patron.currentBooksIssued || 0) + 1;
    patron.totalBooksIssued = (patron.totalBooksIssued || 0) + 1;

    await Promise.all([circulation.save(), book.save(), patron.save()]);

    return {
      message: `Book "${book.title}" successfully issued to ${patron.name}`,
      circulationId: circulation._id,
      dueDate: circulation.dueDate,
    };
  }

  async returnBook(returnBookDto: ReturnBookDto, staffId: string) {
    const { bookId } = returnBookDto;

    const transaction = await this.circulationModel.findOne({
      book: new Types.ObjectId(bookId) as any,
      status: 'issued',
    });

    if (!transaction) {
      throw new NotFoundException('No active issue found for this book');
    }

    const book = await this.bookModel.findById(bookId);
    if (!book) throw new NotFoundException(`Book with ID ${bookId} not found`);

    const patron = await this.patronModel.findById(transaction.patron);
    if (!patron) {
      throw new NotFoundException(
        `Patron with ID ${transaction.patron} not found`,
      );
    }

    // Calculate fines if overdue
    let fine = 0;
    if (transaction.dueDate < new Date()) {
      const daysOverdue = Math.ceil(
        (Date.now() - transaction.dueDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      fine = daysOverdue * FINE_PER_DAY;
    }

    // Update book & patron
    book.status = 'available';
    patron.currentBooksIssued = Math.max(0, patron.currentBooksIssued - 1);

    // Update circulation transaction
    transaction.status = 'returned';
    transaction.returnDate = new Date();
    transaction.notes = `Returned by ${staffId}`;

    await Promise.all([book.save(), patron.save(), transaction.save()]);

    return {
      message: `Book "${book.title}" successfully returned by ${patron.name}`,
      fine,
      transactionId: transaction._id,
    };
  }

  async renewBook(renewBookDto: RenewBookDto, staffId: string) {
    const { bookId } = renewBookDto;

    const transaction = await this.circulationModel.findOne({
      book: bookId,
      status: 'issued',
    });

    if (!transaction)
      throw new NotFoundException('No active issue found for this book');
    if (transaction.renewals >= MAX_RENEWALS) {
      throw new ForbiddenException('Maximum renewals reached');
    }

    const newDueDate = new Date(transaction.dueDate);
    newDueDate.setDate(newDueDate.getDate() + RENEWAL_PERIOD_DAYS);

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

  async getPatronBooks(patronId: string) {
    return this.circulationModel
      .find({
        patron: patronId,
        status: 'issued',
      })
      .populate('book');
  }

  async calculatePatronFines(patronId: string) {
    const transactions = await this.circulationModel.find({
      patron: patronId,
      status: 'issued',
      dueDate: { $lt: new Date() },
    });

    return transactions.reduce((total, txn) => {
      const daysOverdue = Math.ceil(
        (Date.now() - txn.dueDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      return total + daysOverdue * FINE_PER_DAY;
    }, 0);
  }
}
