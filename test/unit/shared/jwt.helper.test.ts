    import { describe, expect, it } from "vitest";

import {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
} from "../../../src/shared/utils/token.utils";

describe("JWT Helper", () => {

    it("should generate access token", () => {

        const token = generateAccessToken(
            "user-123",
            "session-123"
        );

        expect(token).toBeDefined();
        expect(typeof token).toBe("string");

    });

    it("should verify valid access token", () => {

        const token = generateAccessToken(
            "user-123",
            "session-123"
        );

        const payload = verifyAccessToken(token);

        expect(payload.sub).toBe("user-123");
        expect(payload.sessionId).toBe("session-123");

    });

    it("should throw error for invalid access token", () => {

        expect(() =>
            verifyAccessToken("invalid-token")
        ).toThrow();

    });

    it("should generate refresh token", () => {

        const token = generateRefreshToken();

        expect(token).toBeDefined();
        expect(typeof token).toBe("string");

    });

    it("should generate unique refresh tokens", () => {

        const token1 = generateRefreshToken();
        const token2 = generateRefreshToken();

        expect(token1).not.toBe(token2);

    });

});