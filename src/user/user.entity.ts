import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Offer } from '../offer/offer.entity';
import { Exclude, Expose, Type } from 'class-transformer';

@Entity()
@Expose()
export class User {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  id: number;

  @Exclude()
  @Column('varchar')
  email: string;

  @Column('varchar')
  name: string;

  @Exclude()
  @Column('varchar')
  googleId: string;

  @Exclude()
  @Column('boolean', { default: true })
  isActive: boolean;

  @OneToMany(() => Offer, (offer) => offer.owner)
  offers: Offer[];

  @ManyToMany(() => Offer)
  @JoinTable({
    name: 'favorites',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'offerId',
      referencedColumnName: 'id',
    },
  })
  favoriteOffers: Offer[];
}
