import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
