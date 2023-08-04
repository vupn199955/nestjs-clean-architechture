import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = this.mapHttpError(exception);

    response.status(status).json(error);
  }

  mapHttpError(err: any) {
    if (err instanceof HttpException) {
      if (err instanceof InternalServerErrorException) {
        return new InternalServerErrorException({
          error: err.getResponse(),
          data: err.message,
          stack: process.env.NODE_ENV === "dev" ? err.stack : "",
        });
      }

      return err;
    }

    return err;
  }
}
