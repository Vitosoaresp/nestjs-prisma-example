import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserBody } from './dtos/create-user-body';
import { UserRepository } from './repositories/user-repository';

@Controller()
export class AppController {
  constructor(private userRepository: UserRepository) {}
  @Get()
  getHello() {
    return 'Hello World!';
  }

  @Post('users')
  async create(@Body() body: CreateUserBody) {
    const { email, name, password } = body;

    await this.userRepository.create(name, email, password);
  }

  @Get('users')
  async getAll() {
    const users = await this.userRepository.getAll();
    return { users };
  }
}
