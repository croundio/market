import { Category } from '../../category/category.entity';
import { User } from '../../user/user.entity';
import { Offer } from '../../offer/offer.entity';
import { OfferStatusEnum } from '../../offer/enum';

const categories: Partial<Category>[] = [
  {
    id: 1,
    name: 'Телефони',
    image: 'http://localhost:9911/market/phone.png',
    slug: 'phone',
  },
  {
    id: 2,
    name: 'Авто',
    image: 'http://localhost:9911/market/car.png',
    slug: 'auto',
  },
  {
    id: 3,
    name: 'Одяг',
    image: 'http://localhost:9911/market/clothes.png',
    slug: 'clothes',
  },
  {
    id: 4,
    name: 'Інше',
    image: 'http://localhost:9911/market/other.png',
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
    title: 'iPhone 11 pro max 256gb',
    description: `Продам свій iPhone 11 pro max 256 gb midnight green.

      Телефон із чохлом купувався в США. Все оригінальне, нічого не мінялось, в ремонті не був. ICloud видалений, телефон налаштований повністю на продаж. Візуально 10/10, носився завжди в чохлі, подряпин та сколів немає. Завжди на дисплеї було захисне скло. По роботі також ідеально - ніяких претензій не виникало. АКБ - 78% Face ID працює. В роботі на один день хватає з головою.
      
      В комплекті ідуть навушники, блочок (американська виделка із переходником на нашу), USB-C кабель, шкіряний чохол. Весь комплект - ОРИГІНАЛ, в т.ч. чохол.
      
      Торг в рамках розумного (враховуючи що комплект повний і телефон в ідеальному )
      або в ЛС тут, або в месенджери по номеру телефону вказаному в оголошенні.`,
    images: [
      'http://localhost:9911/market/phone_1.jpg',
      'http://localhost:9911/market/phone_2.jpg',
      'http://localhost:9911/market/phone_3.jpg',
    ],
    categoryId: 1,
    price: 20000,
    isUsed: true,
    status: OfferStatusEnum.ACTIVE,
    ownerId: 1,
  },
  {
    title: 'Mercedes a170 дизель',
    description: `Продам хороше авто
      Без ДТП , всі стекла рідні, не фарбоване (точково прибирались рижики)!!!
      Мотор 1.7 турбо дизель працює чудово, по кпп ходовій без зауважень!!!
      Майже нова зимова гума, 2 ключі!!!
      Будь який вид переоформлення !!!`,
    images: [
      'http://localhost:9911/market/auto_1.jpg',
      'http://localhost:9911/market/auto_2.jpg',
      'http://localhost:9911/market/auto_3.jpg',
    ],
    categoryId: 2,
    price: 100000,
    isUsed: true,
    status: OfferStatusEnum.ACTIVE,
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
