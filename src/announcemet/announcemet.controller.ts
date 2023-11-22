import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnnouncemetService } from './announcemet.service';
import { AnnouncementDto, AnnouncementUpdateDto } from './dto/announcement.dto';

@Controller('announcement')
export class AnnouncemetController {
  constructor(private announcemetService: AnnouncemetService) {}

  @Get()
  getAllAnnouncements() {
    return this.announcemetService.getAllAnnouncements();
  }

  @Post()
  addAnnouncement(@Body() dto: AnnouncementDto) {
    return this.announcemetService.addAnnouncement(dto);
  }
  @Delete('/:id')
  deleteAnnouncementById(@Param('id') id: string) {
    return this.announcemetService.deleteAnnouncementById(id);
  }
  @Put('/:id')
  updateAnnouncement(
    @Body() dto: AnnouncementUpdateDto,
    @Param('id') id: string,
  ) {
    return this.announcemetService.updateAnnouncement(dto, id);
  }
}
