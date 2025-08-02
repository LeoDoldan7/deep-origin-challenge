import {
  MiddlewareConsumer, Module, NestModule,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { GlobalConfigModule } from './config/config.module';
import { UrlsModule } from './urls/urls.module';
import { RedirectModule } from './redirect/redirect.module';

@Module({ imports: [GlobalConfigModule, PrismaModule, UrlsModule, RedirectModule] })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
