import {Prisma} from '@prisma/client';

export interface FeeCalculationResult {
    fee: Prisma.Decimal;
    totalDebit: Prisma.Decimal;
    amount: Prisma.Decimal;
}