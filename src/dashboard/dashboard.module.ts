import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { BookSchema } from 'src/books/book.schema';
import { PatronSchema } from 'src/patron/patron.schema';
import { CirculationSchema } from 'src/circulation/schemas/circulation.schema';

@Module({
  imports: [
    // Make the models available for injection in this module's services
    MongooseModule.forFeature([
      { name: 'Book', schema: BookSchema },
      { name: 'Patron', schema: PatronSchema },
      { name: 'Circulation', schema: CirculationSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}