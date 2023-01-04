import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializeInterceptor<T extends Type> implements NestInterceptor {
  constructor(private dto: T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.serialize(context, data)));
  }

  protected transform(data: any): any {
    if (!data || typeof data !== 'object') {
      return data;
    }

    if (Array.isArray(data.data)) {
      return { ...data, data: this.transform(data.data) };
    }

    return plainToInstance(this.dto, data);
  }

  protected serialize(context: ExecutionContext, data: any): T | T[] {
    if (Array.isArray(data)) {
      return data.map((value) => this.transform(value));
    }
    return this.transform(data);
  }
}
