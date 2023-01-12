import { Injectable, NotFoundException } from '@nestjs/common';
import { Offer } from './offer.entity';
import { FindManyOptions, UpdateResult } from 'typeorm';
import { ListDto } from './dto/list.dto';
import { OwnListDto } from './dto/own-list.dto';
import { OfferRepository } from './offer.repository';
import { OfferStatusEnum } from './enum';

@Injectable()
export class OfferService {
  constructor(private offerRepo: OfferRepository) {}

  async getActiveList(params: ListDto, userId?: number): Promise<Offer[]> {
    return this.offerRepo.getActiveList(params, userId);
  }

  async getOwnList(userId: number, params: OwnListDto): Promise<Offer[]> {
    const options: FindManyOptions<Offer> = {
      relations: {
        category: true,
      },
      where: {
        ownerId: userId,
      },
      order: { id: 'ASC' },
    };

    if (params.status) {
      options.where = { ...options.where, status: params.status };
    }

    return this.offerRepo.find(options);
  }

  async getOwnCount(userId: number): Promise<object> {
    return this.offerRepo.countByCategoryForUser(userId);
  }

  async getOne(offerId: number, userId?: number): Promise<Offer> {
    try {
      return await this.offerRepo.getOneOrFail(offerId, userId);
    } catch (e) {
      throw new NotFoundException(`Offer with id=${offerId} not found`);
    }
  }

  async create(offer: Offer, userId: number): Promise<Offer> {
    return this.offerRepo.save({ ...offer, ownerId: userId });
  }

  async update(offerId: number, offer: Offer, userId: number): Promise<Offer> {
    const fromDb = await this.getOneForUser(offerId, userId);

    return this.offerRepo.save({
      ...fromDb,
      ...offer,
      status: OfferStatusEnum.WAITING,
    });
  }

  async activate(offerId: number, userId: number): Promise<boolean> {
    const fromDb = await this.getOneForUser(offerId, userId);

    if (fromDb.status === OfferStatusEnum.DEACTIVATE) {
      await this.offerRepo.save({
        ...fromDb,
        status: OfferStatusEnum.ACTIVE,
      });
    }

    return true;
  }

  async deactivate(offerId: number, userId: number): Promise<boolean> {
    const fromDb = await this.getOneForUser(offerId, userId);

    if (fromDb.status === OfferStatusEnum.ACTIVE) {
      await this.offerRepo.save({
        ...fromDb,
        status: OfferStatusEnum.DEACTIVATE,
      });
    }

    return true;
  }

  async delete(offerId: number, userId: number): Promise<boolean> {
    const fromDb = await this.getOneForUser(offerId, userId);

    await this.offerRepo.softRemove(fromDb);

    return true;
  }

  async getOneForUser(offerId: number, userId: number): Promise<Offer> {
    try {
      return await this.offerRepo.findOneOrFail({
        where: { id: offerId, ownerId: userId },
      });
    } catch (e) {
      throw new NotFoundException(`Offer with id=${offerId} not found`);
    }
  }
}
