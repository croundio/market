import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from './type';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('storage')
export class StorageController {
  constructor(private service: StorageService) {}

  @Post()
  @ApiOkResponse({ type: String })
  @UseInterceptors(FileInterceptor('file'))
  async createImage(@UploadedFile() file: BufferedFile): Promise<string> {
    return this.service.upload(file);
  }
}
