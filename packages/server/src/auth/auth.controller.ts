import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guard/google.guard';

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
  async googleRedirect(@Res() res, @Req() req) {
    const result = await this.service.loginOrRegister(req.user);

    return res.redirect(
      `http://localhost:3000/login/google?access_token=${result.access_token}`,
    );
  }
}
