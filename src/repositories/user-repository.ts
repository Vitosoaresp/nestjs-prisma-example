import { User } from '@prisma/client';

export abstract class UserRepository {
  abstract create(name: string, email: string, password: string): Promise<void>;
  abstract getAll(): Promise<User[]>;
}
