import { logger } from "../logger/logger";
import { tracer } from "../telemetry/tracer";
import { getTraceContext } from "../logger/telemetry-logger";

export const observability = {
    logger,
    tracer,
    getTraceContext,
};