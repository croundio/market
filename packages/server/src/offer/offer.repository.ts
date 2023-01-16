import { DataSource, Repository } from 'typeorm';
import { Offer } from './offer.entity';
import { Injectable } from '@nestjs/common';
import { ListDto } from './dto/list.dto';
import { OfferStatusEnum } from './enum';

@Injectable()
export class OfferRepository extends Repository<Offer> {
  constructor(private dataSource: DataSource) {
    super(Offer, dataSource.createEntityManager());
  }

  async getActiveList(params: ListDto, userId?: number): Promise<Offer[]> {
    const qb = this.createQueryBuilder('offer')
      .innerJoinAndSelect('offer.category', 'category')
      .innerJoin('offer.owner', 'owner')
      .where('offer.status = :status', { status: OfferStatusEnum.ACTIVE })
      .orderBy({ 'offer.id': params.order })
      .limit(params.limit);

    if (userId) {
      qb.leftJoinAndSelect(
        'offer.favorites',
        'favorite',
        'favorite.id = :userId',
        { userId },
      );
    }

    if (params.cursor) {
      qb.andWhere('offer.id > :cursor', { cursor: params.cursor });
    }

    if (params.category) {
      qb.andWhere('category.slug = :slug', { slug: params.category });
    }

    return qb.getMany();
  }

  getOneOrFail(offerId: number, userId?: number): Promise<Offer> {
    const qb = this.createQueryBuilder('offer')
      .innerJoinAndSelect('offer.category', 'category')
      .innerJoinAndSelect('offer.owner', 'owner')
      .where('offer.id = :offerId', { offerId });

    if (userId) {
      qb.leftJoinAndSelect(
        'offer.favorites',
        'favorite',
        'favorite.id = :userId',
        { userId },
      );
    }

    return qb.getOneOrFail();
  }

  async countByCategoryForUser(
    userId: number,
  ): Promise<Partial<Record<OfferStatusEnum, number>>> {
    const qb = this.createQueryBuilder('offer')
      .select('status, count(*)')
      .where('offer.ownerId = :userId', {
        userId,
      })
      .groupBy('status');

    const rows = await qb.getRawMany();
    const result = {};

    for (const row of rows) {
      result[row.status] = Number(row.count);
    }

    return result;
  }
}
