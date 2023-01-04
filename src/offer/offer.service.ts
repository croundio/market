import { Injectable, NotFoundException } from '@nestjs/common';
import { Offer } from './offer.entity';
import { FindManyOptions, MoreThan, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferStatusEnum } from './enum';
import { ListDto } from './dto/list.dto';
import { OwnListDto } from './dto/own-list.dto';

@Injectable()
export class OfferService {
  constructor(@InjectRepository(Offer) private offerRepo: Repository<Offer>) {}

  async getActiveList(params: ListDto): Promise<Offer[]> {
    const options: FindManyOptions<Offer> = {
      relations: {
        category: true,
        owner: true,
      },
      where: {
        status: OfferStatusEnum.ACTIVE,
      },
      order: { id: params.order },
      take: params.limit,
    };

    if (params.cursor) {
      options.where = { ...options.where, id: MoreThan(params.cursor) };
    }
    return this.offerRepo.find(options);
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

  async getOne(offerId: number): Promise<Offer> {
    try {
      return await this.offerRepo.findOneOrFail({
        where: { id: offerId },
      });
    } catch (e) {
      throw new NotFoundException(`Offer with id=${offerId} not found`);
    }
  }

  async create(offer: Offer, userId: number): Promise<Offer> {
    return this.offerRepo.save({ ...offer, ownerId: userId });
  }

  async update(offerId: number, offer: Offer, userId: number): Promise<Offer> {
    const fromDb = await this.getOneForUser(offerId, userId);

    return this.offerRepo.save({ ...fromDb, ...offer });
  }

  async delete(offerId: number, userId: number): Promise<UpdateResult> {
    const fromDb = await this.getOneForUser(offerId, userId);

    return this.offerRepo.softDelete(fromDb);
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
