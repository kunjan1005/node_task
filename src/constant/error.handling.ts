import { HttpException, HttpStatus } from '@nestjs/common';

//#region  custom error handling
export function HTTPerror(options: {
    parameter?: any;
    message?: string;
    statusCode?: number;
    error?: any;
  }) {
    let statusCode = options.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const errorObj: any = {
      status: statusCode,
      error: options.error,
      message: options.message,
    };
    if (options?.parameter) {
      errorObj.error = `Required parameter missing`;
      errorObj.parameter = options.parameter;
      statusCode = HttpStatus.NOT_FOUND;
    }
    errorObj.status =statusCode?? HttpStatus.BAD_REQUEST;
    if (!errorObj?.error) errorObj.error = errorMessage[statusCode] ?? '';
    if (options?.message) errorObj.message = options.message;
    throw new HttpException(errorObj, statusCode, {
      cause: options?.error ?? '',
    });
  }
  //#endregion

  //#region  error message by status
  const errorMessage = {
    [HttpStatus.FORBIDDEN]: 'Forbidden',
    [HttpStatus.BAD_REQUEST]: 'Bad request',
    [HttpStatus.CONFLICT]: 'Already exists',
    [HttpStatus.NOT_FOUND]: 'No data found',
    [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal error',
    [HttpStatus.NOT_ACCEPTABLE]: 'Data not update',
  };
  //#endregion