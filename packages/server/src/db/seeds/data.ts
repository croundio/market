import { Category } from '../../category/category.entity';
import { User } from '../../user/user.entity';
import { Offer } from '../../offer/offer.entity';
import { OfferStatusEnum } from '../../offer/enum';

const categories: Partial<Category>[] = [
  {
    id: 1,
    name: 'Телефони',
    slug: 'phone',
  },
  {
    id: 2,
    name: 'Авто',
    slug: 'auto',
  },
  {
    id: 3,
    name: 'Нерухомість',
    slug: 'realty',
  },
  {
    id: 4,
    name: 'Інше',
    slug: 'other',
  },
];
const users: Partial<User>[] = [
  {
    id: 1,
    email: 'user1@market.com',
    googleId: '23434',
    name: 'Anton',
  },
  {
    id: 2,
    email: 'user2@market.com',
    googleId: '342324',
    name: 'Boris',
  },
];
const offers: Partial<Offer>[] = [
  {
    title: 'Домашній Телефон',
    description:
      'Продаю власний домашній телефон у відмінному стані. Продаю так як купив нарешті мобільний',
    categoryId: 1,
    price: 1,
    isUsed: true,
    status: OfferStatusEnum.ACTIVE,
    ownerId: 1,
  },
  {
    title: 'Родич з росєї',
    description: 'Продаю відносини з дальнім родичем',
    categoryId: 3,
    price: 0,
    isUsed: true,
    status: OfferStatusEnum.CANCELED,
    ownerId: 2,
  },
  {
    title: 'Генератор',
    description: 'Під замовлення з Китаю',
    categoryId: 4,
    price: 12000,
    isUsed: false,
    status: OfferStatusEnum.ACTIVE,
    ownerId: 2,
  },
  {
    title: 'ВАЗ 2101',
    description: 'Продаю свою рідну ластівочку',
    categoryId: 2,
    price: 10000,
    isUsed: true,
    status: OfferStatusEnum.WAITING,
    ownerId: 1,
  },
  {
    title: 'Будиночок у лісі',
    description:
      'Природа, дощ, калюжі, що може бути краще? Купи будинок мрії у лісі',
    categoryId: 3,
    price: 100000,
    isUsed: true,
    status: OfferStatusEnum.DEACTIVATE,
    ownerId: 1,
  },
];

export const seeds = [
  {
    entity: Category,
    seeds: categories,
  },
  {
    entity: User,
    seeds: users,
  },
  {
    entity: Offer,
    seeds: offers,
  },
];
