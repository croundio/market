import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('storage')
export class StorageController {
  constructor(private service: StorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async getFile(@UploadedFile() file: any): Promise<string> {
    console.log(file);
    return 'create....';
  }

  @Delete('/:fileName')
  async deleteFile(@Param('fileName') fileName: string): Promise<string> {
    console.log(fileName);
    return 'delete...';
  }
}
