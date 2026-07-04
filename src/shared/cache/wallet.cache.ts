import { cacheService } from "./cache.service";
import { CacheKeys } from "./cache.keys";
import { CacheTTL } from "./cache.ttl";
import {redis} from "../config/redis";

class WalletCache {

    async getBalance(
        walletId: string
    ): Promise<string | null> {

        return cacheService.get<string>(
            CacheKeys.walletBalance(walletId)
        );
    }

    async setBalance(
        walletId: string,
        balance: string
    ): Promise<void> {
        await cacheService.set(
            CacheKeys.walletBalance(walletId),
            balance,
            CacheTTL.WALLET_BALANCE
        );
    }

    async invalidateBalance(
        walletId: string
    ): Promise<void> {

        await cacheService.del(
            CacheKeys.walletBalance(walletId)
        );
    }
}

export const walletCache = new WalletCache();