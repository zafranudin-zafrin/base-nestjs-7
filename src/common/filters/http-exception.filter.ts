import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter
    implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const type =
            (exception.getResponse() as any).error ??
            (exception.getResponse() as any).message ??
            '';
        const message = (exception.getResponse() as any).message ?? '';
        const details = (exception.getResponse() as any).details ?? request.url;

        response.status(200).json({
            type: type.replace(/ /g, '_').toLowerCase(),
            message,
            details,
        });
    }
}
