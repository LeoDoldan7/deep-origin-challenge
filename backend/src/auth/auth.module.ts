import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { GlobalConfigModule } from '../config/config.module';
import { EnvService } from '../config/env.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PrismaModule,
    GlobalConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports    : [GlobalConfigModule],
      useFactory : (config: EnvService) => ({
        secret      : config.get('JWT_SECRET'),
        signOptions : { expiresIn: config.get('JWT_EXPIRES_IN') },
      }),
      inject: [EnvService],
    }),
  ],
  providers   : [AuthService, JwtStrategy],
  controllers : [AuthController],
})
export class AuthModule {}
