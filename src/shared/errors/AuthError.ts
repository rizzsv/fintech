import {AppError} from "./AppError";

export class AuthError extends AppError {
    constructor(
        messages: "Unauthorized" | "Forbidden" | "InvalidToken" | "TokenExpired" | "SessionNotFound" | "SessionInactive",
        code = "UNAUTHORIZED",
        statusCode = 401
    ) {
        super(messages, statusCode, code);
    }
}