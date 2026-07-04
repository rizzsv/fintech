import { logger } from "./shared/logger/logger";
import { sdk } from "./shared/telemetry/tracing";

async function bootstrap() {
    try {
        await sdk.start();

        const { default: app } = await import("./app");
        const { logger } = await import("./shared/logger/logger");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });

        logger.info("OpenTelemetry initialized");
    } catch (error) {
        logger.fatal("Failed to start application");
        process.exit(1);
    }
}

bootstrap();

process.on("SIGTERM", async () => {
    await sdk.shutdown();
    process.exit(0);
});

process.on("SIGINT", async () => {
    await sdk.shutdown();
    process.exit(0);
});