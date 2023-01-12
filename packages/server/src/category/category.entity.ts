import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Offer } from '../offer/offer.entity';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Expose()
export class Category {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @ApiProperty()
  id: number;

  @Column('varchar')
  @ApiProperty()
  name: string;

  @Column('varchar')
  @ApiProperty()
  slug: string;

  @OneToMany(() => Offer, (offer) => offer.category)
  offers: Offer[];
}
