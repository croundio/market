import { IsEmail, IsString } from 'class-validator';

export class RegisterGoogleUserDto {
  @IsString()
  googleId: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  name: string;
}
