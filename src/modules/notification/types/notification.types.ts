export interface TransferSuccessPayload {
    receiver: string;

    amount: string;

    fee: string;

    referenceNumber: string;

    currency: string;

    transactionTime: Date;
}