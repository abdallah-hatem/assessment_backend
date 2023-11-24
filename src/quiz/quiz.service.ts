import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizDto, QuizUpdateDto } from './dto/quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async getAllQuizzes() {
    try {
      const quiz = await this.prisma.quiz.findMany();

      if (!quiz) throw new HttpException('Error in database', 500);

      return { quiz };
    } catch (error) {
      if (error.status) {
        const { message, status } = error;
        throw new HttpException(message, status);
      }
      throw new HttpException(error, 500);
    }
  }

  async addQuiz(dto: QuizDto) {
    try {
      const { courseName, endDate, startDate } = dto;

      const newQuiz = await this.prisma.quiz.create({
        data: { courseName, endDate, startDate },
      });

      if (!newQuiz) throw new HttpException('Error in database', 500);
      return { msg: 'successfully created', newQuiz };
    } catch (error) {
      if (error.status) {
        const { message, status } = error;
        throw new HttpException(message, status);
      }
      throw new HttpException(error, 500);
    }
  }

  async deleteQuizById(id: string) {
    try {
      const deletedQuiz = await this.prisma.quiz.delete({
        where: { id },
      });

      if (!deletedQuiz) throw new HttpException('Error in database', 500);

      return { msg: 'Quiz deleted successfully' };
    } catch (error) {
      if (error.status) {
        const { message, status } = error;
        throw new HttpException(message, status);
      }
      throw new HttpException(error, 500);
    }
  }

  async updateQuizById(dto: QuizUpdateDto, id: string) {
    try {
      const { courseName, endDate, startDate } = dto;

      const updatedQuiz = await this.prisma.quiz.update({
        where: { id },
        data: { courseName, endDate, startDate },
      });

      if (!updatedQuiz) throw new HttpException('Error in database', 500);

      return { msg: 'Quiz updated successfully', updatedQuiz };
    } catch (error) {
      if (error.status) {
        const { message, status } = error;
        throw new HttpException(message, status);
      }
      throw new HttpException(error, 500);
    }
  }
}
