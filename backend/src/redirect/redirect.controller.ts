import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Redirect,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

  @Controller('r')
export class RedirectController {
  constructor(private readonly prisma: PrismaService) {}

    @Get(':code')
    @Redirect()
  async handleRedirect(@Param('code') code: string) {
    const url = await this.prisma.url.findUnique({ where: { shortCode: code } });
    if (!url) {
      throw new NotFoundException('Short URL not found');
    }

    return { url: url.originalUrl };
  }
}
