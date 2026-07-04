import { cacheService } from "./cache.service";
import { CacheKeys } from "./cache.keys";
import { CacheTTL } from "./cache.ttl";

class UserCache {

    async get<T>(
        userId: string
    ): Promise<T | null> {

        return cacheService.get<T>(
            CacheKeys.user(userId)
        );
    }

    async set<T>(
        userId: string,
        data: T
    ): Promise<void> {

        await cacheService.set(
            CacheKeys.user(userId),
            data,
            CacheTTL.USER
        );
    }

    async invalidate(
        userId: string
    ): Promise<void> {

        await cacheService.del(
            CacheKeys.user(userId)
        );
    }
}

export const userCache = new UserCache();