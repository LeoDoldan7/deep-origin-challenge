import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env.validation';

@Module({ imports: [
  ConfigModule.forRoot({
    isGlobal : true,
    validate : (config) => {
      const result = envSchema.safeParse(config);
      if (!result.success) {
        console.error('❌ Invalid env:', result.error.flatten().fieldErrors);
        throw new Error('Invalid environment variables');
      }

      return result.data;
    },
  }),
] })
export class GlobalConfigModule {}
