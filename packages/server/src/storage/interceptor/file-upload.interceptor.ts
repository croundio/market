import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  constructor(private storageService: StorageService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<string>> {
    const { body } = context.switchToHttp().getRequest();
    const { files } = body;

    if (files?.length) {
      for await (const file of files) {
        const url = await this.storageService.upload(file);
      }
    }

    return next.handle();
  }
}
