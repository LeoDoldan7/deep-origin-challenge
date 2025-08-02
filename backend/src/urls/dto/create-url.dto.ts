import { IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl({}, { message: 'Must be a valid URL' })
    originalUrl: string;
}
