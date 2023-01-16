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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
@Exclude()
export class User {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  @Column('varchar')
  email: string;

  @Column('varchar')
  @ApiProperty()
  @Expose()
  name: string;

  @Column('varchar', { nullable: true })
  @ApiPropertyOptional()
  @Expose()
  image?: string;

  @Column('varchar')
  googleId: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @OneToMany(() => Offer, (offer) => offer.owner)
  offers: Offer[];

  @ManyToMany(() => Offer, (offer) => offer.favorites)
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
