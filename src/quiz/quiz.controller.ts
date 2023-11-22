import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizDto, QuizUpdateDto } from './dto/quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get()
  getAllQuizzes() {
    return this.quizService.getAllQuizzes();
  }

  @Post()
  addQuiz(@Body() dto: QuizDto) {
    return this.quizService.addQuiz(dto);
  }

  @Delete('/:id')
  deleteQuizById(@Param('id') id: string) {
    return this.quizService.deleteQuizById(id);
  }

  @Put('/:id')
  updateQuizById(@Body() dto: QuizUpdateDto, @Param('id') id: string) {
    return this.quizService.updateQuizById(dto, id);
  }
}
