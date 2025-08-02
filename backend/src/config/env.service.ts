import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from './env.validation';

@Injectable()
export class EnvService {
  constructor(private readonly config: ConfigService) {}

  get<K extends keyof EnvVars>(key: K): EnvVars[K] {
    const value = this.config.get(key);

    return value as EnvVars[K];
  }
}
