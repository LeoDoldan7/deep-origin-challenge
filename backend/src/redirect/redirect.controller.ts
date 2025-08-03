import {
  Controller, Get, Param,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnvService } from '../config/env.service';

@Controller('r')
export class RedirectController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly env: EnvService
  ) {}

  @Get(':code')
  async handleRedirect(@Param('code') code: string) {
    const url = await this.prisma.url.findUnique({ where: { shortCode: code } });
    if (!url) {
      return {
        url        : this.env.get('FRONTEND_NOT_FOUND_URL'),
        statusCode : 302,
      };
    }
    await this.prisma.visit.create({ data: { urlId: url.id } });

    return {
      url        : url.originalUrl,
      statusCode : 302,
    };
  }
}
