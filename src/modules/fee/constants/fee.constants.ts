export const FeeConfig = {
    TRANFER: {
        type: 'FIXED',
        amount: 2500,
    },

    TOPUP: {
        type: 'PERCENTAGE',
        percentage: 0,
        maxFee: 0,
    },

    WITHDRAW: {
        type: "FIXED",
        amount: 5000,
    },
} as const 