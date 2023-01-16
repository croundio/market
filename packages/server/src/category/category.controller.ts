import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { ApiOkResponse } from '@nestjs/swagger';
import { Serialize } from '../decorator/serialize.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  @Serialize(Category)
  @ApiOkResponse({ type: [Category] })
  async getList(): Promise<Category[]> {
    return this.service.getList();
  }
}
