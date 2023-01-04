import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Category } from '../category/category.entity';
import { OfferStatusEnum } from './enum';
import { Exclude, Expose, Type } from 'class-transformer';
import { User } from '../user/user.entity';

@Entity()
@Expose()
export class Offer {
  @Exclude()
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  id: number;

  @IsString()
  @Column('varchar')
  @MinLength(10)
  title: string;

  @IsString()
  @Column('text')
  description: string;

  @IsNumber()
  @Column('int')
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.offers)
  category: Category;

  @IsNumber()
  @Column('int')
  price: number;

  @IsBoolean()
  @Column('boolean')
  isUsed: boolean;

  @Column({
    type: 'enum',
    enum: OfferStatusEnum,
    default: OfferStatusEnum.WAITING,
  })
  status: OfferStatusEnum;

  @IsOptional()
  @CreateDateColumn()
  createdAt: Date;

  @IsOptional()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @Column('int')
  ownerId: number;

  @ManyToOne(() => User, (user) => user.offers)
  owner: User;
}
