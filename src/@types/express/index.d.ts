import "express";

declare global {
    namespace Express {

        interface UserPayload {
            id: string;
            sessionId: string;
        }

        interface Request {
            user?: UserPayload;
            requestId?: string;
        }

    }
}

export {};