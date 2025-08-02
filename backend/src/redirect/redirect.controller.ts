import {
  Controller,
  Get,
  Param,
  Redirect,
  Res,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
import { EnvService } from '../config/env.service';

  @Controller('r')
export class RedirectController {
  constructor(private readonly prisma: PrismaService, private readonly env: EnvService) {}

    @Get(':code')
    @Redirect()
  async handleRedirect(@Param('code') code: string, @Res() res: Response) {
    const url = await this.prisma.url.findUnique({ where: { shortCode: code } });
    if (!url) {
      return res.redirect(this.env.get('FRONTEND_NOT_FOUND_URL'));
    }

    return { url: url.originalUrl };
  }
}
