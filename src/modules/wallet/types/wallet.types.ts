import { Prisma } from "@prisma/client";

export type WalletWithUser = Prisma.WalletGetPayload<{
    include: {
        user: true;
    };
}>;

export interface WalletPair {
    fromWallet: WalletWithUser;
    toWallet: WalletWithUser;
}