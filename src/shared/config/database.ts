import { PrismaClient } from "@prisma/client";
import { logger } from "../services/logger.service";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "stdout",
        level: "warn",
      },
      {
        emit: "stdout",
        level: "error",
      },
    ] as const,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// gue paksa sementara 
(prisma as any).$on("query", (event: any) => {
  logger.debug({
    type: "database_query",
    query: event.query,
    duration: event.duration,
  });
});