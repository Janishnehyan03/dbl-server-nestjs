import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patron, PatronSchema } from './patron.schema';
import { PatronService } from './patron.service';
import { PatronController } from './patron.controller';
import {
  Circulation,
  CirculationSchema,
} from '../circulation/schemas/circulation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Patron.name, schema: PatronSchema },
      {
        name: Circulation.name,
        schema: CirculationSchema,
      },
    ]),
  ],
  controllers: [PatronController],
  providers: [PatronService],
  exports: [PatronService],
})
export class PatronModule {}
