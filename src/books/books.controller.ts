import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }
  
  @Get('total')
  getTotalBooks() {
    return this.booksService.totalBooks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }
  @Get('new-arrivals/data')
  getNewArrivals() {
    return this.booksService.getNewArrivals();
  }
  @Get('search/data')
  searchBooks(@Query('search') searchText: string) {
    return this.booksService.searchBooks(searchText);
  }

  @Get(':categoryId/data')
  getBooksByCategory(@Param('categoryId') categoryId: string) {
    return this.booksService.getBooksByCategory(categoryId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: Partial<CreateBookDto>,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
