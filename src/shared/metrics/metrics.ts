import client from "prom-client";

export const register = new client.Registry();

client.collectDefaultMetrics({
    register,
});

export const transferCounter =
    new client.Counter({

        name: "fintech_transfer_total",

        help: "Total transfer",

        labelNames: [
            "status",
        ],

        registers: [
            register,
        ],
    });

    export const cacheCounter =
    new client.Counter({

        name: "wallet_cache_total",

        help: "Wallet cache",

        labelNames: [
            "result",
        ],

        registers: [
            register,
        ],
    });

    export const transferDuration =
    new client.Histogram({

        name:
            "transfer_duration_seconds",

        help:
            "Transfer latency",

        buckets: [
            0.05,
            0.1,
            0.2,
            0.5,
            1,
            2,
            5,
        ],

        registers: [
            register,
        ],
    });

    export const emailCounter =
    new client.Counter({

        name:
            "notification_email_total",

        help:
            "Email notification",

        labelNames: [
            "status",
        ],

        registers: [
            register,
        ],
    });