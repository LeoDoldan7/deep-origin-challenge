import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GlobalConfigModule } from '../config/config.module';

@Module({
  imports     : [PrismaModule, GlobalConfigModule],
  controllers : [RedirectController],
})
export class RedirectModule {}
