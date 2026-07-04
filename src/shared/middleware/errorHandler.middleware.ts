import { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {

    logger.error(
        {
            requestId: req.requestId,
            method: req.method,
            url: req.originalUrl,

            message: err.message,
            stack: err.stack,

            code: err.code,
            statusCode: err.statusCode,

            error: err,
        },
        "Unhandled error"
    );

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}