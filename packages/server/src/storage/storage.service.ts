import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import crypto from 'crypto';
import { Env } from '../config/env';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class StorageService {
  private bucket = Env.MINIO_BUCKET;

  constructor(private readonly minio: MinioService) {}

  get client() {
    return this.minio.client;
  }

  async upload(file: any) {
    console.log('file', file);
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new BadRequestException('Error uploading file');
    }
    const hashedFileName = crypto
      .createHash('md5')
      .update(Date.now().toString())
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const fileName: string = hashedFileName + ext;
    const fileBuffer = file.buffer;
    this.client.putObject(
      this.bucket,
      fileName,
      fileBuffer,
      metaData,
      function (err) {
        if (err)
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
      },
    );

    return {
      url: `${Env.MINIO_ENDPOINT}:${Env.MINIO_PORT}/${Env.MINIO_BUCKET}/${fileName}`,
    };
  }
}
