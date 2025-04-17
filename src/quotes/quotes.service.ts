import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote, QuoteDocument } from  './quotes.schema'
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(@InjectModel(Quote.name) private quoteModel: Model<QuoteDocument>) {}

  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const newQuote = new this.quoteModel(createQuoteDto);
    return newQuote.save();
  }

  async findAll(): Promise<Quote[]> {
    return this.quoteModel.find().exec();
  }

  async findOne(id: string): Promise<Quote> {
    const quote = await this.quoteModel.findById(id).exec();
    if (!quote) throw new NotFoundException(`Quote with ID ${id} not found`);
    return quote;
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    const updatedQuote = await this.quoteModel.findByIdAndUpdate(id, updateQuoteDto, { new: true });
    if (!updatedQuote) throw new NotFoundException(`Quote with ID ${id} not found`);
    return updatedQuote;
  }

  async remove(id: string): Promise<void> {
    const result = await this.quoteModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Quote with ID ${id} not found`);
  }
}
