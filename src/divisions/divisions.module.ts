import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Division, DivisionSchema } from './division.schema';
import { DivisionService } from './divisions.service';
import { DivisionController } from './divisions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Division.name, schema: DivisionSchema },
    ]),
  ],
  controllers: [DivisionController],
  providers: [DivisionService],
  exports: [DivisionService], // If needed elsewhere
})
export class DivisionsModule {}
