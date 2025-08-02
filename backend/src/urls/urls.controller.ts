import {
  Body, Controller, Post,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { EnvService } from '../config/env.service';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService, private readonly env: EnvService) {}

  @Post()
  async create(@Body() dto: CreateUrlDto) {
    const url = await this.urlsService.create(dto.originalUrl);

    return { shortUrl: `${this.env.get('BASE_URL')}/r/${url.shortCode}` };
  }
}
