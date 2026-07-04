import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { walletRepository } from "../repositories/wallet.repository";
import { walletCache } from "../../../shared/cache/wallet.cache";
import { BusinessLogger } from "../../../shared/logger/business-logger";
import { cacheCounter } from "../../../shared/metrics/metrics";

export class WalletService {

    async getBalance(userId: string) {

        const wallet =
            await walletRepository.findByUserId(userId);

        if (!wallet) {

            BusinessLogger.warn(
                "Wallet not found",
                {
                    userId,
                }
            );

            throw new NotFoundError("Wallet not found");
        }

        const cached =
            await walletCache.getBalance(wallet.id);

        if (cached !== null) {

            cacheCounter.inc({
                result: "hit",
            });

            BusinessLogger.info(
                "Wallet balance cache hit",
                {
                    walletId: wallet.id,
                    userId,
                }
            );

            return {
                walletId: wallet.id,
                currency: wallet.currency,
                balance: Number(cached),
                source: "redis",
            };
        }

        cacheCounter.inc({
            result: "miss",
        });

        BusinessLogger.info(
            "Wallet balance cache miss",
            {
                walletId: wallet.id,
                userId,
            }
        );

        await walletCache.setBalance(
            wallet.id,
            wallet.balance.toString()
        );

        return {
            walletId: wallet.id,
            currency: wallet.currency,
            balance: wallet.balance,
            source: "database",
        };
    }

    async getLimits(userId: string) {

        const limit =
            await walletRepository.findUserLimit(userId);

        if (!limit) {

            BusinessLogger.warn(
                "User limit not found",
                {
                    userId,
                }
            );

            throw new NotFoundError(
                "User limit not found"
            );
        }

        return limit;
    }

    async getWallet(userId: string) {

        const wallet =
            await walletRepository.getWalletWithUser(
                userId
            );

        if (!wallet) {

            BusinessLogger.warn(
                "Wallet not found",
                {
                    userId,
                }
            );

            throw new NotFoundError(
                "Wallet not found"
            );
        }

        return wallet;
    }

    async getLedger(
        userId: string,
        page: number = 1,
        limit: number = 20
    ) {

        const wallet =
            await walletRepository.findByUserId(
                userId
            );

        if (!wallet) {

            BusinessLogger.warn(
                "Wallet not found",
                {
                    userId,
                }
            );

            throw new NotFoundError(
                "Wallet not found"
            );
        }

        const ledger =
            await walletRepository.getLedger(
                wallet.id,
                page,
                limit
            );

        BusinessLogger.info(
            "Ledger retrieved",
            {
                walletId: wallet.id,
                page,
                limit,
                total: ledger.total,
            }
        );

        return {
            items: ledger.items,

            pagination: {
                page,
                limit,
                total: ledger.total,
                totalPages: Math.ceil(
                    ledger.total / limit
                ),
            },
        };
    }
}