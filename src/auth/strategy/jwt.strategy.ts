import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Env } from '../../config/env';
import { PayloadDto } from '../dto/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadDto): Promise<PayloadDto> {
    try {
      if (!(await this.authService.isActive(payload))) {
        throw new UnauthorizedException();
      }
      return payload;
    } catch (e) {
      throw new UnauthorizedException(
        e instanceof UnauthorizedException && e.message,
      );
    }
  }
}
