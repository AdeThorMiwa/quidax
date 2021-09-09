import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';

@Catch()
class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { statusCode, type, message, error, stack } =
      this.handleError(exception);

    console.log('error', exception);

    const responsePayload = {
      statusCode,
      type,
      message,
      error,
      stack,
    };

    // rest
    if (response?.status) {
      return response.status(statusCode).json(responsePayload);
    }

    // graphql
    throw new HttpException(responsePayload, responsePayload.statusCode);
  }

  handleError(exception: any) {
    exception =
      exception instanceof HttpException
        ? exception
        : new HttpException(exception, 400);
    const response = exception.getResponse();
    return {
      statusCode: exception.getStatus(),
      type: response.error,
      error: response.message,
      message: exception.message,
      stack: exception.stack,
    };
  }
}

export default GlobalExceptionsFilter;
