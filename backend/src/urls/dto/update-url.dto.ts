import { IsString, Matches } from 'class-validator';

export class UpdateUrlDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'Slug must be alphanumeric with optional dashes/underscores' })
    shortCode: string;
}
