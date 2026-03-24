import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = isHttpException
      ? exception.getResponse()
      : {
          message: 'Internal server error',
          error: 'InternalServerError'
        };

    const normalized =
      typeof errorResponse === 'string'
        ? {
            message: [errorResponse],
            error: HttpStatus[statusCode] ?? 'Error'
          }
        : {
            message: Array.isArray((errorResponse as { message?: unknown }).message)
              ? ((errorResponse as { message: string[] }).message ?? [])
              : [String((errorResponse as { message?: string }).message ?? 'Unexpected error')],
            error: String((errorResponse as { error?: string }).error ?? HttpStatus[statusCode] ?? 'Error')
          };

    response.status(statusCode).json({
      statusCode,
      path: request.url,
      timestamp: new Date().toISOString(),
      ...normalized
    });
  }
}
