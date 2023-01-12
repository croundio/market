import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { MinioModule } from 'nestjs-minio-client';
import { Env } from '../config/env';
import { StorageController } from './storage.controller';

@Module({
  imports: [
    MinioModule.register({
      endPoint: Env.MINIO_ENDPOINT,
      port: Env.MINIO_PORT,
      useSSL: false,
      accessKey: Env.MINIO_ACCESS_KEY,
      secretKey: Env.MINIO_SECRET_KEY,
    }),
  ],
  providers: [StorageService],
  exports: [StorageService],
  controllers: [StorageController],
})
export class StorageModule {}
