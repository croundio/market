import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { OfferModule } from '../offer/offer.module';
import { FavoriteController } from './favorite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), OfferModule],
  providers: [UserService],
  controllers: [FavoriteController],
  exports: [UserService],
})
export class UserModule {}
