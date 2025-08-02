import { Param, ParseUUIDPipe } from '@nestjs/common';

export function Id(name: string) {
  return Param(name,  new ParseUUIDPipe())
}
