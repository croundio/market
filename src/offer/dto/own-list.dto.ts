import { OfferStatusEnum } from '../enum';
import { IsEnum, IsOptional } from 'class-validator';

export class OwnListDto {
  @IsOptional()
  @IsEnum(OfferStatusEnum)
  status?: OfferStatusEnum;
}
