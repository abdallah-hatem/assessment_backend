import { HttpException, Injectable } from '@nestjs/common';
import { SignupDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    try {
      const { name, email, password } = dto;

      // hash the password
      const hash = await bcrypt.hash(password, 10);

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
      });

      if (!user) throw new HttpException('credentials taken', 401);

      return { msg: 'successfully signed up', user };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return { error };
    }
  }

  async login(dto: LoginDto) {
    try {
      const { email, password } = dto;

      // check if user already exists
      const user = await this.userService.getUserByEmail(email);

      if (!user.user) {
        throw new HttpException('No user found please signup!', 404);
      }

      const userPass = user.user.password;

      // compare passwords
      const validPass = await bcrypt.compare(password, userPass);

      if (!validPass) throw new HttpException('Password is incorrect!', 401);

      const jwt = await this.signToken(user.user.id, user.user.email);

      return { msg: 'successfully logged in', jwt };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return { error };
    }
  }

  signToken(id: string, email: string): Promise<string> {
    const payload = {
      id,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET,
    });
  }
}
