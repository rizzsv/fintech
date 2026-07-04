import http from "k6/http";
import { BASE_URL, USERS } from "./config/config.js";

export function login() {
    const response = http.post(
        `${BASE_URL}/api/v1/auth/login`,
        JSON.stringify({
            email: USERS.sender.email,
            password: USERS.sender.password,
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.json().data.accessToken;
}