import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AnnouncemetModule } from './announcemet/announcemet.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    AnnouncemetModule,
    QuizModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
