import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from '../config/env.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey    : env.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string }) {
    return { userId: payload.sub };
  }
}
