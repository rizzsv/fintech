import { redis } from "../config/redis";
import { logger } from "../logger/logger";


export const cacheService = {
  async get(key: string) {
    try {
      return await redis.get(key);
    } catch (error: any) {
      logger.warn(error.message);
      return null;
    }
  },

  async set(key: string, value: string, ttl?: number) {
    try {
      if (ttl) {
        await redis.set(key, value, "EX", ttl);
      } else {
        await redis.set(key, value);
      }
    } catch (error: any) {
      logger.warn(error.message);
    }
  },

  async del(key: string) {
    try {
      await redis.del(key);
    } catch (error: any) {
      logger.warn(error.message);
    }
  },

  async incr(key: string) {
    try {
      return await redis.incr(key);
    } catch {
      return 1;
    }
  },
};