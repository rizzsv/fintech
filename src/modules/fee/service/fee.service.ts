import {Prisma} from '@prisma/client';
import {FeeConfig} from '../constants/fee.constants';
import {FeeCalculationResult} from '../types/fee.types';

export class FeeService {
    calculateTranferFee(
        amount: Prisma.Decimal,
    ): FeeCalculationResult {
        const fee =
        new Prisma.Decimal(
            FeeConfig.TRANFER.amount
        );

        return {
            amount,
            fee,
            totalDebit: amount.plus(fee),
        }
    }
}

export const feeService = new FeeService();
