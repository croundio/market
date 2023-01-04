import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { RegisterGoogleUserDto } from './dto/register-google-user.dto';
import { Offer } from '../offer/offer.entity';
import { OfferService } from '../offer/offer.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private offerService: OfferService,
  ) {}

  async findOne(options: FindOneOptions<User>): Promise<User> {
    return this.repo.findOneOrFail(options);
  }

  async createForGoogle(profile: RegisterGoogleUserDto): Promise<User> {
    const user = this.repo.create(profile);
    return this.repo.save(user);
  }

  async getFavoriteOffers(userId: number): Promise<Offer[]> {
    const user = await this.repo.findOneOrFail({
      where: {
        id: userId,
      },
      relations: {
        favoriteOffers: true,
      },
    });

    return user.favoriteOffers;
  }

  async setFavorite(userId: number, offerId: number): Promise<boolean> {
    const user = await this.repo.findOneOrFail({
      where: {
        id: userId,
      },
      relations: {
        favoriteOffers: true,
      },
    });

    if (user.favoriteOffers.find((offer) => offer.id === offerId)) {
      return true;
    }

    const offer = await this.offerService.getOne(offerId);
    user.favoriteOffers.push(offer);

    await this.repo.save(user);

    return true;
  }

  async unsetFavorite(userId: number, offerId: number): Promise<boolean> {
    const user = await this.repo.findOneOrFail({
      where: {
        id: userId,
      },
      relations: {
        favoriteOffers: true,
      },
    });

    if (!user.favoriteOffers.find((offer) => offer.id === offerId)) {
      return true;
    }

    user.favoriteOffers = user.favoriteOffers.filter(
      (offer) => offer.id !== offerId,
    );

    await this.repo.save(user);

    return true;
  }
}
