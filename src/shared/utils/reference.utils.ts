import crypto from "crypto";

export class ReferenceUtils {

    static generateTransactionReference(): string {

        const now = new Date();

        const year = now.getFullYear();

        const month = String(
            now.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            now.getDate()
        ).padStart(2, "0");

        const random = crypto
            .randomBytes(4)
            .toString("hex")
            .toUpperCase();

        return `TRX${year}${month}${day}${random}`;
    }

}