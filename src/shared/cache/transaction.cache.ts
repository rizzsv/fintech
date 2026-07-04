import { cacheService } from "./cache.service";
import { CacheKeys } from "./cache.keys";
import { CacheTTL } from "./cache.ttl";

class TransactionCache {

    async get<T>(
        transactionId: string
    ): Promise<T | null> {

        return cacheService.get<T>(
            CacheKeys.transaction(transactionId)
        );
    }

    async set<T>(
        transactionId: string,
        data: T
    ): Promise<void> {

        await cacheService.set(
            CacheKeys.transaction(transactionId),
            data,
            CacheTTL.TRANSACTION
        );
    }

    async invalidate(
        transactionId: string
    ): Promise<void> {

        await cacheService.del(
            CacheKeys.transaction(transactionId)
        );
    }
}

export const transactionCache =
    new TransactionCache();