import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FindOptionsOrderValue } from 'typeorm';

export class ListDto {
  @IsInt()
  @Type(() => Number)
  limit = 10;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  cursor?: number;

  @IsString()
  @IsOptional()
  order?: FindOptionsOrderValue = 'ASC';
}
