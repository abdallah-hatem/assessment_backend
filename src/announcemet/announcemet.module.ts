import { Module } from '@nestjs/common';
import { AnnouncemetService } from './announcemet.service';
import { AnnouncemetController } from './announcemet.controller';

@Module({
  providers: [AnnouncemetService],
  controllers: [AnnouncemetController]
})
export class AnnouncemetModule {}
