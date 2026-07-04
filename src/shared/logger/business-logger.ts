import { logger } from "./logger";
import { getTraceContext } from "./telemetry-logger";
import { tracer } from "../telemetry/tracer";
import { Span, SpanStatusCode } from "@opentelemetry/api";

export class BusinessLogger {

    static info(
        message: string,
        data?: Record<string, unknown>
    ) {

        logger.info(
            {
                ...getTraceContext(),
                ...data,
            },
            message
        );

    }

    static warn(
        message: string,
        data?: Record<string, unknown>
    ) {

        logger.warn(
            {
                ...getTraceContext(),
                ...data,
            },
            message
        );

    }

    static error(
        message: string,
        error?: unknown,
        data?: Record<string, unknown>
    ) {

        logger.error(
            {
                ...getTraceContext(),
                error,
                ...data,
            },
            message
        );

    }

    static async startSpan<T>(
    name: string,
    callback: (span: Span) => Promise<T>
): Promise<T> {

    return tracer.startActiveSpan(
        name,
        async (span) => {

            try {

                const result =
                    await callback(span);

                span.setStatus({
                    code: SpanStatusCode.OK,
                });

                return result;

            } catch (error) {

                span.recordException(
                    error as Error
                );

                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: (error as Error).message,
                });

                throw error;

            } finally {

                span.end();

            }

        }
    );

}

}