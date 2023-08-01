import { IsNotEmpty } from 'class-validator';

export class LoginBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
