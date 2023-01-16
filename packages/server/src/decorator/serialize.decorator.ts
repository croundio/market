import { applyDecorators, Type, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interseptor/serialize.interceptor';

export const Serialize = (target: Type) =>
  applyDecorators(UseInterceptors(new SerializeInterceptor(target)));
