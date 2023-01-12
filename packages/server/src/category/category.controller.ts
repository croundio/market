import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { SerializeInterceptor } from '../interseptor/serialize.interceptor';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  @UseInterceptors(new SerializeInterceptor(Category))
  @ApiOkResponse({ type: [Category] })
  async getList(): Promise<Category[]> {
    return this.service.getList();
  }
}
