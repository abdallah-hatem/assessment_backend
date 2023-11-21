import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      if (!users) throw new HttpException('Error in database', 500);

      return { users };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  ////// Helpers //////
  async getUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      // if (!user) throw new HttpException('No user found', 404);

      return { user };
    } catch (error) {
      // if (error) {
      //   const { message, statusCode } = error;
      //   throw new HttpException(message, statusCode);
      // }
      console.log(error);
    }
  }
}
