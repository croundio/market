import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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
  order?: 'ASC' | 'DESC' = 'ASC';

  @IsString()
  @IsOptional()
  category?: string;
}
