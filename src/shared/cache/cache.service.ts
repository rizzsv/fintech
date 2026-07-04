import { redis } from "../config/redis";

class CacheService {

    async get<T>(key: string): Promise<T | null> {
        const value = await redis.get(key);

        if (!value) {
            return null;
        }

        return JSON.parse(value) as T;
    }

    async set<T>(
        key: string,
        value: T,
        ttl: number
    ): Promise<void> {

        await redis.set(
            key,
            JSON.stringify(value),
            "EX",
            ttl
        );
    }

    async del(key: string): Promise<void> {
        await redis.del(key);
    }

    async exists(
        key: string
    ): Promise<boolean> {

        return (await redis.exists(key)) === 1;
    }

    async clearPattern(
        pattern: string
    ): Promise<void> {

        const keys = await redis.keys(pattern);

        if (keys.length > 0) {
            await redis.del(...keys);
        }
    }
}

export const cacheService = new CacheService();