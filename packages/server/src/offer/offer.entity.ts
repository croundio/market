import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
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
import { Exclude, Expose } from 'class-transformer';
import { User } from '../user/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
@Expose()
export class Offer {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsString({ message: 'Назва має бути текстом' })
  @Column('varchar')
  @MinLength(10, { message: 'Назва має бути не менша 10 символів' })
  @ApiProperty()
  title: string;

  @IsString({ message: 'Опис має бути текстом' })
  @Column('text')
  @MinLength(10, { message: 'Опис має бути не менш 10 Символів' })
  @ApiProperty()
  description: string;

  @IsNumber({}, { message: 'Категорія має бути вибрана із поточних' })
  @Column('int')
  @ApiProperty()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.offers)
  @ApiProperty({ type: Category })
  category: Category;

  @IsNumber({}, { message: 'Вкажіть корректну ціну' })
  @Column('int')
  @ApiProperty()
  price: number;

  @IsBoolean({
    message: 'Для "Бувшого у використанні" потрібно вказати булеве значення',
  })
  @Column('boolean')
  @ApiProperty()
  isUsed: boolean;

  @IsString({ each: true })
  @ApiPropertyOptional({ type: [String] })
  @Column('simple-array', { nullable: true })
  images: string[] = [];

  @Column({
    type: 'enum',
    enum: OfferStatusEnum,
    default: OfferStatusEnum.WAITING,
  })
  @ApiProperty({ enum: OfferStatusEnum, enumName: 'OfferStatusEnum' })
  status: OfferStatusEnum;

  @IsOptional()
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @Exclude()
  @IsOptional()
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @Column('int')
  @ApiProperty()
  ownerId: number;

  @ManyToOne(() => User, (user) => user.offers)
  @ApiProperty({ type: () => User })
  owner: User;

  @ManyToMany(() => User, (owner) => owner.favoriteOffers)
  @ApiPropertyOptional({ type: () => [User] })
  favorites: User[];
}
