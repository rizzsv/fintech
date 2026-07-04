import {Prisma, TransactionStatus} from "@prisma/client";

export interface CreateTransactionLogDTO {
    transactionId: string;
    event: string;
    statusBefore?: TransactionStatus;
    statusAfter?: TransactionStatus;
    metadata?: Prisma.InputJsonValue
}