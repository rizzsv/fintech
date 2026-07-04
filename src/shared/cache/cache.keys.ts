export const CacheKeys = {
    walletBalance: (walletId: string) =>
        `wallet:${walletId}:balance`,

    wallet: (walletId: string) =>
        `wallet:${walletId}`,

    user: (userId: string) =>
        `user:${userId}`,

    transaction: (transactionId: string) =>
        `transaction:${transactionId}`,
} as const;