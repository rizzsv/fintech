import { describe, expect, it } from "vitest";
import { Prisma } from "@prisma/client";

import { feeService } from "../../../src/modules/fee/service/fee.service";

describe("FeeService", () => {
    it("should calculate transfer fee correctly", () => {
        const amount = new Prisma.Decimal(100000);

        const result = feeService.calculateTranferFee(amount);

        expect(result.fee.toString()).toBe("2500");
        expect(result.amount.toString()).toBe("100000");
        expect(result.totalDebit.toString()).toBe("102500");
    });
});