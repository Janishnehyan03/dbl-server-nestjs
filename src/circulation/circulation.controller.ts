import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CirculationService } from './circulation.service';
import { IssueBookDto } from './dto/issue-book.dto';
import { RenewBookDto } from './dto/renew-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Controller('circulations')
@UseGuards(JwtAuthGuard)
export class CirculationController {
  constructor(private readonly circulationService: CirculationService) {}

  @Post('issue')
  async issueBook(@Body() issueBookDto: IssueBookDto, @GetUser() user: any) {
    return this.circulationService.issueBook(issueBookDto, user._id);
  }

  @Post('return')
  async returnBook(@Body() returnBookDto: ReturnBookDto, @GetUser() user: any) {
    return this.circulationService.returnBook(returnBookDto, user._id);
  }

  @Post('renew')
  async renewBook(@Body() renewBookDto: RenewBookDto, @GetUser() user: any) {
    return this.circulationService.renewBook(renewBookDto, user._id);
  }

  @Get('overdue')
  async getOverdueBooks() {
    return this.circulationService.getOverdueBooks();
  }

  @Get('patron/:id')
  async getPatronBooks(@Param('id') patronId: string) {
    return this.circulationService.getPatronBooks(patronId);
  }

  @Get('fines/:id')
  async calculatePatronFines(@Param('id') patronId: string) {
    return {
      fines: await this.circulationService.calculatePatronFines(patronId),
    };
  }
}
