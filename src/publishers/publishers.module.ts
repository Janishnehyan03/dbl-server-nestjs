import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Publisher, PublisherSchema } from './publisher.schema';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Publisher.name, schema: PublisherSchema }]),
  ],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}
