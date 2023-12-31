import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnnouncementDto, AnnouncementUpdateDto } from './dto/announcement.dto';

@Injectable()
export class AnnouncemetService {
  constructor(private prisma: PrismaService) {}

  async getAllAnnouncements() {
    try {
      const announcements = await this.prisma.announcement.findMany();

      if (!announcements) throw new HttpException('Error in database', 500);

      return { announcements };
    } catch (error) {
      if (error.status) {
        const { message, status } = error;
        throw new HttpException(message, status);
      }
      throw new HttpException(error, 500);
    }
  }

  async addAnnouncement(dto: AnnouncementDto) {
    try {
      const { announcement } = dto;

      const newAnn = await this.prisma.announcement.create({
        data: { announcement },
      });

      if (!newAnn) throw new HttpException('Error in database', 500);
      return { msg: 'successfully created', newAnn };
    } catch (error) {
      if (error.status) {
        const { message, status } = error;
        throw new HttpException(message, status);
      }
      throw new HttpException(error, 500);
    }
  }

  async deleteAnnouncementById(id: string) {
    try {
      const deletedAnn = await this.prisma.announcement.delete({
        where: { id },
      });

      if (!deletedAnn) throw new HttpException('Error in database', 500);

      return { msg: 'Announcement deleted successfully' };
    } catch (error) {
      if (error.status) {
        const { message, status } = error;
        throw new HttpException(message, status);
      }
      throw new HttpException(error, 500);
    }
  }

  async updateAnnouncement(dto: AnnouncementUpdateDto, id: string) {
    try {
      const { announcement } = dto;

      const updatedAnn = await this.prisma.announcement.update({
        where: { id },
        data: { announcement },
      });

      if (!updatedAnn)
        throw new HttpException('Error no announcement found', 404);

      return { msg: 'Announcement updated successfully', updatedAnn };
    } catch (error) {
      if (error.status) {
        const { message, status } = error;
        throw new HttpException(message, status);
      }
      throw new HttpException(error, 500);
    }
  }
}
