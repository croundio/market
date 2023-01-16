import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';
import { Env } from '../../config/env';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    try {
      return jwt.verify(token, Env.JWT_SECRET);
    } catch (e) {
      return;
    }
  },
);
