import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { EnvService } from '../config/env.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { AuthRequest } from '../auth/types/auth-request.interface';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('urls')
@UseGuards(JwtAuthGuard)
export class UrlsController {
  constructor(
    private readonly urlsService: UrlsService,
    private readonly env: EnvService
  ) {}

  @Post()
  async create(@Body() dto: CreateUrlDto, @Req() req: AuthRequest) {
    const userId = req.user.userId;
    const url = await this.urlsService.create(dto.originalUrl, userId);

    return { shortUrl: `${this.env.get('FRONTEND_BASE_URL')}/r/${url.shortCode}` };
  }

  @Get()
  async findAll(@Req() req: AuthRequest) {
    return this.urlsService.findAllForUser(req.user.userId);
  }

@Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthRequest) {
    await this.urlsService.remove(id, req.user.userId);

    return { message: 'Deleted' };
  }

  @Patch(':id')
async update(
  @Param('id') id: string,
  @Body() dto: UpdateUrlDto,
  @Req() req: AuthRequest
) {
  const updated = await this.urlsService.update(id, req.user.userId, dto.shortCode);

  return { shortUrl: `${this.env.get('FRONTEND_BASE_URL')}/r/${updated.shortCode}` };
}
}
