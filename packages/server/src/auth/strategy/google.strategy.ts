import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';
import { Env } from '../../config/env';
import { GG_REDIRECT } from '../../config/constants';
import { GoogleProfile } from '../dto/google.profile';
import { RegisterGoogleUserDto } from '../../user/dto/register-google-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: Env.GG_ID,
      clientSecret: Env.GG_SECRET,
      callbackURL: GG_REDIRECT,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
  ): Promise<RegisterGoogleUserDto> {
    return {
      email: profile.email,
      googleId: profile.id,
      name: profile.name.givenName,
    };
  }
}
