// src/library-settings/library-settings.module.ts
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {
  LibrarySettings,
  LibrarySettingsSchema,
} from './schemas/library-settings.schema';
import { LibrarySettingsService } from './library-settings.service';
import { LibrarySettingsController } from './library-settings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LibrarySettings.name, schema: LibrarySettingsSchema },
    ]),
  ],
  providers: [LibrarySettingsService],
  controllers: [LibrarySettingsController],
  exports: [LibrarySettingsService],
})
export class LibrarySettingsModule {}
