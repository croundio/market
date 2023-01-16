import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '../auth/decorator/user.decorator';
import { PayloadDto } from '../auth/dto/payload.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserService } from './user.service';
import { Offer } from '../offer/offer.entity';
import { ApiOkResponse } from '@nestjs/swagger';
import { Serialize } from '../decorator/serialize.decorator';

@Controller('favorites')
export class FavoriteController {
  constructor(private service: UserService) {}

  @Get()
  @Serialize(Offer)
  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: [Offer] })
  getFavoriteList(@User() user: PayloadDto): Promise<Offer[]> {
    return this.service.getFavoriteOffers(user.id);
  }

  @Patch('/:offerId/set')
  @UseGuards(JwtGuard)
  setFavorite(
    @User() user: PayloadDto,
    @Param('offerId', new ParseIntPipe()) offerId: number,
  ): Promise<boolean> {
    return this.service.setFavorite(user.id, offerId);
  }

  @Patch('/:offerId/unset')
  @UseGuards(JwtGuard)
  unsetFavorite(
    @User() user: PayloadDto,
    @Param('offerId', new ParseIntPipe()) offerId: number,
  ): Promise<boolean> {
    return this.service.unsetFavorite(user.id, offerId);
  }
}
