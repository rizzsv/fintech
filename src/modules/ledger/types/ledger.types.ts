import {EntryType, Prisma} from "@prisma/client";

export interface CreateLedgerEntryDTO {
    transactionId: string;
    walletId: string;
    entryType: EntryType;
    amount: Prisma.Decimal;
    balanceAfter: Prisma.Decimal;
}