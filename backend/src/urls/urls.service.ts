import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { generateShortCode } from '../lib/short-code';
import { EnvService } from '../config/env.service';

@Injectable()
export class UrlsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly env: EnvService
  ) {}

  async create(originalUrl: string, userId: string) {
    const shortCode = generateShortCode();
    const url = await this.prisma.url.create({ data: {
      originalUrl,
      shortCode,
      userId,
    } });

    return {
      ...url,
      shortUrl: `${this.env.get('FRONTEND_BASE_URL')}/r/${shortCode}`,
    };
  }

  async findAllForUser(userId: string) {
    return this.prisma.url.findMany({
      where   : { userId },
      orderBy : { createdAt: 'desc' },
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.url.deleteMany({ where: {
      id,
      userId,
    } });
  }

  async update(id: string, userId: string, newSlug: string) {
    const exists = await this.prisma.url.findUnique({ where: { shortCode: newSlug } });
    if (exists) {
      throw new BadRequestException('Slug already in use');
    }

    return this.prisma.url.update({
      where : { id },
      data  : { shortCode: newSlug },
    });
  }
}
