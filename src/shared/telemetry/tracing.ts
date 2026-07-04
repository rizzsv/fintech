import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const traceExporter = new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
});

export const sdk = new NodeSDK({
    traceExporter,

    resource: resourceFromAttributes({
        [SemanticResourceAttributes.SERVICE_NAME]:
            "fintech-api",

        [SemanticResourceAttributes.SERVICE_VERSION]:
            "1.0.0",
    }),

    instrumentations: [
        getNodeAutoInstrumentations(),
    ],
});