import {Request, Response, NextFunction} from "express";
import {trace} from "@opentelemetry/api";

export function traceMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const span = trace.getActiveSpan();

    if (span) {
        const traceId = 
        span.spanContext().traceId;

        res.setHeader("X-Trace-Id", traceId);
    }

    next();
}