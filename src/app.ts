import express from "express";
import pinoHttp from "pino-http";

import { logger } from "./shared/logger/logger";
import { redis } from "./shared/config/redis";

import healthRoutes from "./routes/health.routes";
import metricsRoutes from "./routes/metrics.routes";
import v1Routes from "./routes/v1.routes";

import { globalRateLimiter } from "./shared/middleware/rateLimiter.middleware";
import { errorHandler } from "./shared/middleware/errorHandler.middleware";
import { requestIdMiddleware } from "./shared/middleware/request-id.middleware";
import { traceMiddleware } from "./shared/middleware/trace.middleware";

const app = express();

redis.connect();

app.use(requestIdMiddleware);

app.use(
  pinoHttp({
    logger,
        autoLogging: {
      ignore: (req) =>
        req.url === "/metrics",
    },
  })
);

app.use(traceMiddleware);

app.use(express.json());

app.use(globalRateLimiter);

app.use("/health", healthRoutes);

// Tambahkan di sini
app.use("/metrics", metricsRoutes);

app.use("/api/v1", v1Routes);

app.use(errorHandler);

export default app;