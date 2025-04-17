import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patron, PatronSchema } from './patron.schema';
import { PatronService } from './patron.service';
import { PatronController } from './patron.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Patron.name, schema: PatronSchema }])],
  controllers: [PatronController],
  providers: [PatronService],
  exports: [PatronService],
})
export class PatronModule {}
