import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { Env } from '../config/env';
import { MinioClient, MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './type';

@Injectable()
export class StorageService {
  private bucket = Env.MINIO_BUCKET;

  constructor(private readonly minio: MinioService) {
    this.initBucket();
  }

  get client(): MinioClient {
    return this.minio.client;
  }

  async upload(file: BufferedFile) {
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

    try {
      await this.client.putObject(this.bucket, fileName, fileBuffer, metaData);
    } catch (e) {
      console.log(e);
      throw new HttpException('Error  uploading file', HttpStatus.BAD_REQUEST);
    }

    return `${Env.MINIO_ENDPOINT === 'localhost' ? 'http://' : ''}${
      Env.MINIO_ENDPOINT
    }:${Env.MINIO_PORT}/${Env.MINIO_BUCKET}/${fileName}`;
  }

  private async initBucket() {
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            AWS: ['*'],
          },
          Action: ['s3:GetBucketLocation', 's3:ListBucket'],
          Resource: [`arn:aws:s3:::${this.bucket}`],
        },
        {
          Effect: 'Allow',
          Principal: {
            AWS: ['*'],
          },
          Action: ['s3:GetObject', 's3:ListMultipartUploadParts'],
          Resource: [`arn:aws:s3:::${this.bucket}/*`],
        },
      ],
    };

    if (!(await this.client.bucketExists(this.bucket))) {
      await this.client.makeBucket(this.bucket);
      await this.client.setBucketPolicy(this.bucket, JSON.stringify(policy));
    }
  }
}
