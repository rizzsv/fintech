import { describe, expect, it } from "vitest";

import {
    hashPassword,
    comparePassword,
} from "../../../src/shared/utils/password.utils";

describe("Password Helper", () => {

    it("should hash password successfully", async () => {

        const password = "Password123!";

        const hashedPassword = await hashPassword(password);

        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toBe(password);
        expect(typeof hashedPassword).toBe("string");

    });

    it("should compare correct password", async () => {

        const password = "Password123!";

        const hashedPassword = await hashPassword(password);

        const isMatch = await comparePassword(
            password,
            hashedPassword
        );

        expect(isMatch).toBe(true);

    });

    it("should reject incorrect password", async () => {

        const password = "Password123!";
        const wrongPassword = "WrongPassword123!";

        const hashedPassword = await hashPassword(password);

        const isMatch = await comparePassword(
            wrongPassword,
            hashedPassword
        );

        expect(isMatch).toBe(false);

    });

    it("should generate different hashes for the same password", async () => {

        const password = "Password123!";

        const hash1 = await hashPassword(password);
        const hash2 = await hashPassword(password);

        expect(hash1).not.toBe(hash2);

    });

    it("should generate valid bcrypt hash", async () => {

    const password = "Password123!";

    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).toMatch(/^\$2[aby]\$\d{2}\$/);

});

});