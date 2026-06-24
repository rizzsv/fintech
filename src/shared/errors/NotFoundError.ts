import {AppError} from './AppError';

export class NotFoundError extends AppError {
    constructor(
        message: string = 'Not found',
        statusCode: number = 404,
        code: string = 'NOT_FOUND'
    ) {
        super(message, statusCode, code);
    }   
}