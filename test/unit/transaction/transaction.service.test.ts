import {
    describe,
    expect,
    it,
} from "vitest";

import { TransactionService } from "../../../src/modules/transaction/services/transaction.service";
import { AppError } from "../../../src/shared/errors/AppError";

const transactionService = new TransactionService();

describe("TransactionService", () => {

    it("should throw when amount is zero", async () => {

        await expect(

            (transactionService as any)
                .validateTransfer(
                    100000,
                    0
                )

        ).rejects.toThrow(AppError);

    });

    it("should throw when amount is negative", async () => {

    await expect(

        (transactionService as any)
            .validateTransfer(
                100000,
                -100
            )

    ).rejects.toThrow(AppError);

});

it("should throw when balance is insufficient", async () => {

    await expect(

        (transactionService as any)
            .validateTransfer(
                1000,
                5000
            )

    ).rejects.toThrow(AppError);

});

it("should pass validation when balance is sufficient", async () => {

    await expect(

        (transactionService as any)
            .validateTransfer(
                100000,
                50000
            )

    ).resolves.toBeUndefined();

});

});