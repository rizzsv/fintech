import http from "k6/http";
import { check } from "k6";
import { BASE_URL, USERS } from "./config/config.js";
import { login } from "./auth.js";

export const options = {
    vus: 20,
    duration: "30s",
};

export default function () {
    const token = login();

    const payload = JSON.stringify({
        toWalletId: USERS.receiver.walletId,
        amount: 1000,
        description: "k6 load test",
    });

    const response = http.post(
        `${BASE_URL}/api/v1/transaction/transfer`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Idempotency-Key": crypto.randomUUID(),
            },
        }
    );

    console.log(
        response.status,
        response.body
    );

    check(response, {
        "transfer success": (r) => r.status === 201,
    });
}