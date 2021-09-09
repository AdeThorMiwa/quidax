import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientErrorResponse } from '@interface/app';

@Catch()
class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: any) {
    const { statusCode, type, message, error, stack } =
      process.env.STAGE === 'production'
        ? this.handleErrorProd(exception)
        : this.handleErrorDev(exception);

    console.log(statusCode);

    return {
      statusCode,
      type,
      message,
      error,
      stack,
    };
  }

  handleErrorDev(exception: any): ClientErrorResponse {
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

  handleErrorProd(exception: any): ClientErrorResponse {
    if (!(exception instanceof HttpException)) {
      // set a fallback error instance
      exception = new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const response = exception.getResponse();
      return {
        statusCode: exception.getStatus(),
        type: response.error,
        error: response.message,
        message: exception.message,
      };
    } catch (e) {
      return {
        statusCode: 500,
        type: 'InternalServerException',
        error: 'InternalServerException',
        message: 'Something went wrong',
      };
    }
  }
}

export default GlobalExceptionsFilter;
