import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { Offer } from './offer.entity';
import { UpdateResult } from 'typeorm';
import { User } from '../auth/decorator/user.decorator';
import { PayloadDto } from '../auth/dto/payload.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ListDto } from './dto/list.dto';
import { OwnListDto } from './dto/own-list.dto';
import { SerializeInterceptor } from '../interseptor/serialize.interceptor';

@Controller('offers')
export class OfferController {
  constructor(private service: OfferService) {}

  @Get()
  @UseInterceptors(new SerializeInterceptor(Offer))
  getList(@Query() params: ListDto): Promise<Offer[]> {
    return this.service.getActiveList(params);
  }

  @Get('/own')
  @UseGuards(JwtGuard)
  getOwnList(
    @User() user: PayloadDto,
    @Query() params: OwnListDto,
  ): Promise<Offer[]> {
    return this.service.getOwnList(user.id, params);
  }

  @Get('/:offerId')
  getOne(@Param('offerId') offerId: number): Promise<Offer> {
    return this.service.getOne(offerId);
  }

  @Post()
  @UseGuards(JwtGuard)
  create(@User() user: PayloadDto, @Body() dto: Offer): Promise<Offer> {
    return this.service.create(dto, user.id);
  }

  @Patch('/:offerId')
  @UseGuards(JwtGuard)
  update(
    @User() user: PayloadDto,
    @Param('offerId') offerId: number,
    @Body() dto: Offer,
  ): Promise<Offer> {
    return this.service.update(offerId, dto, user.id);
  }

  @Delete('/:offerId')
  delete(
    @User() user: PayloadDto,
    @Param('offerId') offerId: number,
  ): Promise<UpdateResult> {
    return this.service.delete(offerId, user.id);
  }
}
