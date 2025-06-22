import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CirculationController } from './circulation.controller';
import { CirculationService } from './circulation.service';
import { Circulation, CirculationSchema } from './schemas/circulation.schema';
import { BooksModule } from '../books/books.module';
import { PatronModule } from 'src/patron/patron.module';
import { Book, BookSchema } from 'src/books/book.schema';
import { Patron, PatronSchema } from 'src/patron/patron.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Circulation.name, schema: CirculationSchema },
      {
        name: Book.name,
        schema: BookSchema,
      },
      {
        name: Patron.name,
        schema: PatronSchema,
      },
    ]),
    BooksModule,
    PatronModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // Replace with your JWT secret
      signOptions: { expiresIn: '60m' }, // Optional: Configure token expiration
    }),
  ],
  controllers: [CirculationController],
  providers: [CirculationService],
  exports: [CirculationService],
})
export class CirculationModule {}
