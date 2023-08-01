import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../database/prisma.service';
import { CreateUserBody } from './dtos/create-user-body';
import { LoginBody } from './dtos/login';
import { LoginResponse } from './user.interfaces';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getAll(): Promise<User[]> {
    // const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      // skip,
      // take,
      // cursor,
      // where,
      // orderBy,
    });
  }

  async create(data: CreateUserBody): Promise<User> {
    const user = await this.getByEmail(data.email);
    if (user) {
      throw new HttpException(
        { message: 'This email is already registered' },
        400,
      );
    }
    return this.prisma.user.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  public generateJWT(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );
  }

  async login(data: LoginBody): Promise<LoginResponse> {
    const { email, password } = data;
    const user = await this.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    const token = this.generateJWT(user);
    return { email: user.email, token, name: user.name };
  }
}
