/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class QuizDto {
  @IsString()
  @IsNotEmpty()
  courseName: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}

export class QuizUpdateDto {
  @IsString()
  @IsNotEmpty()
  courseName: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}
