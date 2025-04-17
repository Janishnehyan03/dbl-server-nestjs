import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { Book } from 'src/books/book.schema';
import { Patron } from 'src/patron/patron.schema';
import { IssueBookDto } from './dto/issue-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
import { RenewBookDto } from './dto/renew-book.dto';

@Injectable()
export class CirculationService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel('Book') private bookModel: Model<Book>,
    @InjectModel('Patron') private patronModel: Model<Patron>,
  ) {}

  async issueBook(issueBookDto: IssueBookDto, staffId: string) {
    const { bookId, patronId } = issueBookDto;

    const [book, patron] = await Promise.all([
      this.bookModel.findById(bookId),
      this.patronModel.findById(patronId),
    ]);

    if (!book) throw new NotFoundException('Book not found');
    if (!patron) throw new NotFoundException('Patron not found');
    // if (patron.isBlacklisted) throw new ForbiddenException('Patron is blacklisted');
    // if (patron.currentBooksIssued >= patron.maxBooksAllowed) {
    //   throw new ForbiddenException('Patron has reached book limit');
    // }
    if (book.status !== 'available') {
      throw new ConflictException('Book is not available for issue');
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
      createdBy: new Types.ObjectId(staffId),
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

  async returnBook(returnBookDto: ReturnBookDto, staffId: string) {
    const { bookId, condition = 'good' } = returnBookDto;

    const transaction = await this.transactionModel
      .findOne({
        book: bookId,
        status: 'issued',
      })
      .populate('book patron');

    if (!transaction)
      throw new NotFoundException('No active issue found for this book');

    const returnDate = new Date();
    let fine = 0;

    if (returnDate > transaction.dueDate) {
      const daysOverdue = Math.ceil(
        (returnDate.getTime() - transaction.dueDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      fine = daysOverdue * 2;
    }

    transaction.returnDate = returnDate;
    transaction.status = 'returned';
    transaction.fine = fine;
    transaction.notes = `Returned in ${condition} condition by ${staffId}`;

    const book = transaction.book as any;
    book.status = 'available';
    book.currentHolder = null;

    const patron = transaction.patron as any;
    patron.currentBooksIssued -= 1;
    if (fine > 0) patron.finesDue += fine;

    await Promise.all([transaction.save(), book.save(), patron.save()]);

    return transaction;
  }

  async renewBook(renewBookDto: RenewBookDto, staffId: string) {
    const { bookId } = renewBookDto;

    const transaction = await this.transactionModel.findOne({
      book: bookId,
      status: 'issued',
    });

    if (!transaction)
      throw new NotFoundException('No active issue found for this book');
    if (transaction.renewals >= 2)
      throw new ForbiddenException('Maximum renewals reached');

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

  async getPatronBooks(patronId: string) {
    return this.transactionModel
      .find({
        patron: patronId,
        status: 'issued',
      })
      .populate('book');
  }

  async calculatePatronFines(patronId: string) {
    const transactions = await this.transactionModel.find({
      patron: patronId,
      status: 'issued',
      dueDate: { $lt: new Date() },
    });

    return transactions.reduce((total, txn) => {
      const daysOverdue = Math.ceil(
        (new Date().getTime() - txn.dueDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      return total + daysOverdue * 2;
    }, 0);
  }
}
