import { Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { GlobalConfigModule } from '../config/config.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers : [UrlsController],
  providers   : [UrlsService],
  imports     : [GlobalConfigModule, PrismaModule],
})
export class UrlsModule {}
