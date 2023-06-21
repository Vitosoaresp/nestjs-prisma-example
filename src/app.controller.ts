import { Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './repositories/user-repository';

@Controller()
export class AppController {
  constructor(private userRepository: UserRepository) {}

  @Post('users')
  async getHello() {
    await this.userRepository.create('Nome', 'email@gmail.com', '123456');
  }

  @Get('users')
  async getAll() {
    const users = await this.userRepository.getAll();
    return { users };
  }
}
