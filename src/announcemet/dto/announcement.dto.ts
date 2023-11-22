/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';

export class AnnouncementDto {
  @IsString()
  @IsNotEmpty()
  announcement: string;
}

export class AnnouncementUpdateDto {
  @IsString()
  @IsNotEmpty()
  announcement: string;
}
