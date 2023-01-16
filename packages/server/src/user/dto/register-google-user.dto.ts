import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterGoogleUserDto {
  @IsString()
  googleId: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image?: string;
}
