import { Prisma } from '@prisma/client';
import {prisma} from '../../../shared/config/database'

export class WalletRepository {
    async findByUserId(userId: string) {
        return prisma.wallet.findFirst({
            where: {
                userId
            },
            include: {
                user: true
            }
        });
    }

    async updateBalance(
        tx: Prisma.TransactionClient,
        walletId: string,
        version: number,
        newBalance: Prisma.Decimal
    ) {
        return tx.wallet.updateMany({
            where: {
                id: walletId,
                version
            },
            data: {
                balance: newBalance,
                version: {
                    increment: 1
                }
            },
        });
    }

    async findUserLimit(userId: string) {
        return prisma.userLimit.findUnique({
            where: {
                userId
            }
        })
    }

    async getUserLimits(userId: string) {
        return prisma.userLimit.findUnique({
            where: {
                userId
            }
        });
    }

    async getWalletWithUser(userId: string) {
        return prisma.wallet.findUnique({
            where: {
                userId_currency: {
                    userId,
                    currency: 'IDR'
                }
            },
            include : {
                user : {
                    select : {
                    id : true,
                    email : true,
                    firstName : true,
                    lastName : true,
                    kycStatus : true,
                    kycTier : true
                    }
                }
            }
        })
    }

    async getLedger(
        walletId: string,
        page: number,
        limit: number
    ) {
        const skip = (page - 1) * limit;

        const [items, total] = 
        await Promise.all([
            prisma.ledgerEntry.findMany({
                where: {
                    walletId
                },

                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: limit
            }),
            prisma.ledgerEntry.count({
                where: {
                    walletId
                }
            })
        ]);

        return {
            items,
            total,
        }
    }

    async findWalletById(walletId: string) {
    return prisma.wallet.findUnique({
        where: {
            id: walletId,
        },
        include: {
            user: true,
        },
    });
}
}

export const walletRepository = new WalletRepository();