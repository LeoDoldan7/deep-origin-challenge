import {
  MiddlewareConsumer, Module, NestModule,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { GlobalConfigModule } from './config/config.module';
import { UrlsModule } from './urls/urls.module';
import { RedirectModule } from './redirect/redirect.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({ imports: [GlobalConfigModule, PrismaModule, UrlsModule, RedirectModule, AuthModule,
  ThrottlerModule.forRoot({ throttlers: [{
    ttl   : 60,
    limit : 5,
  }] }),
] })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
