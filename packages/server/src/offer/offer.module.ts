import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { StorageModule } from '../storage/storage.module';
import { OfferRepository } from './offer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), StorageModule],
  providers: [OfferService, OfferRepository],
  controllers: [OfferController],
  exports: [OfferService],
})
export class OfferModule {}
