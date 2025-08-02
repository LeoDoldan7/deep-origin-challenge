import {
  MiddlewareConsumer, Module, NestModule,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { GlobalConfigModule } from './config/config.module';

@Module({ imports: [GlobalConfigModule, PrismaModule] })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
