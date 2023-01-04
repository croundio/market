import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { User } from '../auth/decorator/user.decorator';
import { PayloadDto } from '../auth/dto/payload.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserService } from './user.service';
import { Offer } from '../offer/offer.entity';

@Controller('favorites')
export class FavoriteController {
  constructor(private service: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  getFavoriteList(@User() user: PayloadDto): Promise<Offer[]> {
    return this.service.getFavoriteOffers(user.id);
  }

  @Patch('/:offerId/set')
  @UseGuards(JwtGuard)
  setFavorite(
    @User() user: PayloadDto,
    @Param('offerId') offerId: number,
  ): Promise<boolean> {
    return this.service.setFavorite(user.id, offerId);
  }

  @Patch('/:offerId/unset')
  @UseGuards(JwtGuard)
  unsetFavorite(
    @User() user: PayloadDto,
    @Param('offerId') offerId: number,
  ): Promise<boolean> {
    return this.service.unsetFavorite(user.id, offerId);
  }
}
