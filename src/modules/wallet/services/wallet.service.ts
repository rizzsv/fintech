import { NotFoundError } from '../../../shared/errors/NotFoundError';
import { walletRepository } from '../repositories/wallet.repository';

export class WalletService {
    async getBalance(userId: string) {
        const wallet =
            await walletRepository.findByUserId(userId);

        if (!wallet) {
            throw new NotFoundError('Wallet not found');
        }

        return {
            walletId: wallet.id,
            balance: wallet.balance,
            currency: wallet.currency,
            isFrozen: wallet.isFrozen
        };
    }

    async getLimits(userId: string) {
        const limit =
            await walletRepository.getUserLimits(userId);

        if (!limit) {
            throw new NotFoundError('User limit not found');
        }

        return limit;
    }

    async getWallet(userId: string) {
        const wallet =
            await walletRepository.getWallerWithUser(userId);

        if (!wallet) {
            throw new NotFoundError('Wallet not found');
        }
    }

    async getLedger(
        userId: string,
        page: number = 1,
        limit: number = 20
    ) {
        const wallet = await walletRepository.findByUserId(userId);

        if (!wallet) {
            throw new NotFoundError('Wallet not found');
        }

        const ledger = await walletRepository.getLedger(
            wallet.id,
            page,
            limit
        );

        return {
            items: ledger.items,

            pagination: {
                page,
                limit,
                total: ledger.total,
                totalPages: Math.ceil(ledger.total / limit)
            }
        }
    }
}