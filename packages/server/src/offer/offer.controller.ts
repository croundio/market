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
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { Offer } from './offer.entity';
import { UpdateResult } from 'typeorm';
import { User } from '../auth/decorator/user.decorator';
import { PayloadDto } from '../auth/dto/payload.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ListDto } from './dto/list.dto';
import { OwnListDto } from './dto/own-list.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Serialize } from '../decorator/serialize.decorator';

@Controller('offers')
export class OfferController {
  constructor(private service: OfferService) {}

  @Get()
  @Serialize(Offer)
  @ApiOkResponse({ type: [Offer] })
  getList(
    @Query() params: ListDto,
    @User() user?: PayloadDto,
  ): Promise<Offer[]> {
    return this.service.getActiveList(params, user?.id);
  }

  @Get('/own')
  @UseGuards(JwtGuard)
  @Serialize(Offer)
  @ApiOkResponse({ type: [Offer] })
  getOwnList(
    @User() user: PayloadDto,
    @Query() params: OwnListDto,
  ): Promise<Offer[]> {
    return this.service.getOwnList(user.id, params);
  }

  @Get('/own/count')
  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: Object })
  getOwnCount(@User() user: PayloadDto): Promise<object> {
    return this.service.getOwnCount(user.id);
  }

  @Get('/:offerId')
  @Serialize(Offer)
  @ApiOkResponse({ type: Offer })
  getOne(
    @User() user: PayloadDto,
    @Param('offerId') offerId: number,
  ): Promise<Offer> {
    return this.service.getOne(offerId, user?.id);
  }

  @Post()
  @UseGuards(JwtGuard)
  @Serialize(Offer)
  @ApiOkResponse({ type: Offer })
  create(@User() user: PayloadDto, @Body() dto: Offer): Promise<Offer> {
    return this.service.create(dto, user.id);
  }

  @Patch('/:offerId')
  @UseGuards(JwtGuard)
  @Serialize(Offer)
  @ApiOkResponse({ type: Offer })
  update(
    @User() user: PayloadDto,
    @Param('offerId') offerId: number,
    @Body() dto: Offer,
  ): Promise<Offer> {
    return this.service.update(offerId, dto, user.id);
  }

  @Patch('/:offerId/activate')
  @UseGuards(JwtGuard)
  activate(
    @User() user: PayloadDto,
    @Param('offerId') offerId: number,
  ): Promise<boolean> {
    return this.service.activate(offerId, user.id);
  }

  @Patch('/:offerId/deactivate')
  @UseGuards(JwtGuard)
  deactivate(
    @User() user: PayloadDto,
    @Param('offerId') offerId: number,
  ): Promise<boolean> {
    return this.service.deactivate(offerId, user.id);
  }

  @Delete('/:offerId')
  @ApiOkResponse({ type: UpdateResult })
  delete(@User() user: PayloadDto, @Param('offerId') offerId: number) {
    return this.service.delete(offerId, user.id);
  }
}
