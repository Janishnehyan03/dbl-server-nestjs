import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Section, SectionSchema } from './section.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]), // ✅ Ensure this is added
  ],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService], // ✅ Export if used in other modules
})
export class SectionsModule {}
