import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { StandardErrorResponse } from './standard-error-response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message =
      exception instanceof HttpException
        ? (exception.getResponse()?.['message'] ?? exception['message'])
        : 'Internal server error';

    if (Array.isArray(message)) {
      message = message.map((m) => {
        if (m instanceof ValidationError)
          return {
            property: m.property,
            errors: m.constraints,
          };
        return m;
      });
    }

    Logger.error(exception);

    const errorResponse: StandardErrorResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errorName: exception?.name,
      message,
    };
    response.status(statusCode).json(errorResponse);
  }
}
