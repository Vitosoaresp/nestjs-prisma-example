import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserBody } from './dtos/create-user-body';
import { LoginBody } from './dtos/login';
import { LoginResponse } from './user.interfaces';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @Post('users')
  async create(@Body() body: CreateUserBody) {
    await this.service.create(body);
  }

  @Get('users')
  async getAll() {
    const users = await this.service.getAll();
    return { users };
  }

  @Post('users/login')
  async login(@Body() body: LoginBody): Promise<LoginResponse> {
    const response = await this.service.login(body);
    return response;
  }
}
