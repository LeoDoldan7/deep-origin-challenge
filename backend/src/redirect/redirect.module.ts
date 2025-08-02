import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports     : [PrismaModule],
  controllers : [RedirectController],
})
export class RedirectModule {}
