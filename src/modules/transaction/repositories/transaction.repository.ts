import { prisma } from "../../../shared/config/database";
import {
    Prisma,
    TransactionStatus,
    TransactionType,
} from "@prisma/client";
import { CreateTransactionRepositoryDTO } from "../types/transaction.types";
import { CreateTransactionLogDTO } from "../types/transaction-log.types";

export class TransactionRepository {
    async findWalletByUserId(
        walletId: string,
        tx?: Prisma.TransactionClient
    ) {
        const db = tx ?? prisma;

        return db.wallet.findUnique({
            where: {
                id: walletId,
            },
            include: {
                user: true
            }
        })
    }

    async findMany(
        walletId: string,
        page: number,
        limit: number,
        status?: TransactionStatus,
        type?: TransactionType
    ) {
        const where: Prisma.TransactionWhereInput = {
            OR: [
                {
                    fromWalletId: walletId,
                },
                {
                    toWalletId: walletId,
                },
            ],
            ...(status && { status }),
            ...(type && { transactionType: type }),
        };

        const [items, total] = await prisma.$transaction([
            prisma.transaction.findMany({
                where,

                orderBy: {
                    createdAt: "desc",
                },

                skip: (page - 1) * limit,

                take: limit,
            }),

            prisma.transaction.count({
                where,
            }),
        ]);
        return {
            items,
            total,
        }
    }

    async findTransactionById(id: string) {
        return prisma.transaction.findUnique({
            where: {
                id
            }
        });
    }

    async findByIdempotencyKey(
        key: string,
    ) {
        return prisma.transaction.findUnique({
            where: {
                idempotencyKey: key
            }
        });
    }

    async createTransaction(
        tx: Prisma.TransactionClient,
        data: CreateTransactionRepositoryDTO
    ) {
        return tx.transaction.create({
            data: {
                amount: data.amount,
                fee: data.fee,

                transactionType: data.transactionType,
                status: data.status,

                description: data.description,

                referenceNumber: data.referenceNumber,
                idempotencyKey: data.idempotencyKey,

                fromWallet: {
                    connect: {
                        id: data.fromWalletId,
                    },
                },

                toWallet: {
                    connect: {
                        id: data.toWalletId,
                    },
                },
            },
        });
    }

    async updateTransaction(
        tx: Prisma.TransactionClient,
        transactionId: string,
        status: TransactionStatus,
    ) {
        return tx.transaction.update({
            where: {
                id: transactionId
            },
            data: {
                status,
                completedAt: status === "SUCCESS" ? new Date() : null
            }
        });
    }

    async updateWalletBalance(
        tx: Prisma.TransactionClient,
        walletId: string,
        version: number,
        balance: Prisma.Decimal
    ) {
        return tx.wallet.updateMany({
            where: {
                id: walletId,
                version
            },
            data: {
                balance,
                version: {
                    increment: 1
                }
            }
        })
    }

    async createLedgerEntries(
        tx: Prisma.TransactionClient,
        data: Prisma.LedgerEntryCreateManyInput[]
    ) {
        return tx.ledgerEntry.createMany({
            data
        })
    }

    async createTransactionLog(
        tx: Prisma.TransactionClient,
        data: Prisma.TransactionLogCreateInput
    ) {
        return tx.transactionLog.create({
            data
        })
    }

    async findByReferenceNumber(
        referenceNumber: string
    ) {
        return prisma.transaction.findUnique({
            where: {
                referenceNumber
            }
        });
    }

    async createLog(
        tx: Prisma.TransactionClient,
        data: CreateTransactionLogDTO
    ) {
        return tx.transactionLog.create({
            data: {
                transactionId: data.transactionId,
                event: data.event,
                statusBefore: data.statusBefore,
                statusAfter: data.statusAfter,
                metadata: data.metadata,
            },
        });
    }

    async completeTransaction(
    tx: Prisma.TransactionClient,
    transactionId: string
) {
    return tx.transaction.update({
        where: {
            id: transactionId,
        },
        data: {
            status: TransactionStatus.SUCCESS,
            completedAt: new Date(),
        },
    });
}

async updateStatus(
    tx: Prisma.TransactionClient,
    transactionId: string,
    status: TransactionStatus
) {
    return tx.transaction.update({
        where: {
            id: transactionId,
        },
        data: {
            status,
        },
    });
}

}

export const transactionRepository = new TransactionRepository();