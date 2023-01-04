import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guard/google.guard';
import { User } from './decorator/user.decorator';
import { RegisterGoogleUserDto } from '../user/dto/register-google-user.dto';
import { LoginSerialize } from './serialize/login.serialize';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('/google')
  @UseGuards(GoogleGuard)
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(GoogleGuard)
  async googleRedirect(
    @User() user: RegisterGoogleUserDto,
  ): Promise<LoginSerialize> {
    return this.service.loginOrRegister(user);
  }
}
