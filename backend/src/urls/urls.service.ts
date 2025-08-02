import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { generateShortCode } from '../lib/short-code';
import { EnvService } from '../config/env.service';

@Injectable()
export class UrlsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly env: EnvService
  ) {}

  async create(originalUrl: string) {
    const shortCode = generateShortCode();
    const url = await this.prisma.url.create({ data: {
      originalUrl,
      shortCode,
    } });

    return {
      ...url,
      shortUrl: `${this.env.get('BASE_URL')}/r/${shortCode}`,
    };
  }
}
