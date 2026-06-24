import { Router } from "express";
import { checkDatabaseHealth } from "../shared/services/database-health.service";

const router = Router();

router.get("/", async (_, res) => {
  const dbHealthy = await checkDatabaseHealth();

  return res.status(dbHealthy ? 200 : 503).json({
    status: dbHealthy ? "ok" : "unhealthy",
    database: dbHealthy,
  });
});

export default router;