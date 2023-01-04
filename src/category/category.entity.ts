import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Offer } from '../offer/offer.entity';
import { Exclude, Expose, Type } from 'class-transformer';

@Entity()
@Exclude()
export class Category {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  id: number;

  @Expose()
  @Column('varchar')
  name: string;

  @OneToMany(() => Offer, (offer) => offer.category)
  offers: Offer[];
}
