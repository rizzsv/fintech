import { describe, expect, it } from "vitest";
import { ReferenceUtils } from "../../../src/shared/utils/reference.utils";

describe("ReferenceUtils", () => {

    it("should generate transaction reference", () => {

        const reference =
            ReferenceUtils.generateTransactionReference();

        expect(typeof reference).toBe("string");

    });

    it("should start with TRX", () => {

        const reference =
            ReferenceUtils.generateTransactionReference();

        expect(
            reference.startsWith("TRX")
        ).toBe(true);

    });

    it("should have correct length", () => {

        const reference =
            ReferenceUtils.generateTransactionReference();

        expect(reference.length).toBe(19);

    });

    it("should match expected format", () => {

        const reference =
            ReferenceUtils.generateTransactionReference();

        expect(reference).toMatch(
            /^TRX\d{8}[A-F0-9]{8}$/
        );

    });

    it("should generate unique references", () => {

        const ref1 =
            ReferenceUtils.generateTransactionReference();

        const ref2 =
            ReferenceUtils.generateTransactionReference();

        expect(ref1).not.toBe(ref2);

    });

});