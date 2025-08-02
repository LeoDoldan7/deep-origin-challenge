import {
  Injectable, Logger, NestMiddleware,
} from '@nestjs/common';
import {
  NextFunction, Request, Response,
} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();
    res.on('finish', () => {
      const delay = Date.now() - start;
      const { statusCode } = res;
      this.logger.log(`${method} ${originalUrl} ${statusCode} +${delay}ms`);
    });
    next();
  }
}
