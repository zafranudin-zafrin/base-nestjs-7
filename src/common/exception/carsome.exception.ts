import { HttpException, HttpStatus } from '@nestjs/common';
import { errorResponse } from '../../utils/response-builder';

export class CarsomeException extends HttpException {
    constructor(type: string, message: string = null, details: any = null) {
        super(errorResponse(type, message, details), HttpStatus.OK);
    }
}
