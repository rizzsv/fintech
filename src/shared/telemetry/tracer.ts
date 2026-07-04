import { trace } from "@opentelemetry/api";

export const tracer = trace.getTracer(
    "fintech-api",
    "1.0.0"
);