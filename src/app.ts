import express from "express";

import v1Routes from "./routes/v1.routes";
import healthRoutes from "./routes/health.routes";

import { errorHandler } from "./shared/middleware/errorHandler.middleware";
import { globalRateLimiter } from "./shared/middleware/rateLimiter.middleware";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);

app.use("/api/v1", v1Routes);

app.use(errorHandler);

app.use(globalRateLimiter);

export default app;