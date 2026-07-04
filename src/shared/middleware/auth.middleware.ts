import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from "../utils/token.utils";
import { AuthError } from "../errors/AuthError";
import { authRepository } from '../../modules/auth/repositories/auth.repository';

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AuthError("Unauthorized", "UNAUTHORIZED", 401);
        }

        const token = authHeader.replace("Bearer ", "");

        console.log("AUTH HEADER", authHeader);
        console.log("TOKEN", token);
        const payload = verifyAccessToken(token);

        console.log("PAYLOAD", payload);
        const session = await authRepository.findSessionById(
            payload.sessionId
        )

        console.log("SESSION", session);

        if (!session) {
            throw new AuthError("SessionNotFound", "UNAUTHORIZED", 401);
        }

        req.user = {
            id: payload.sub,
            sessionId: payload.sessionId
        }

        next();
    } catch (error) {
        next(
            new AuthError(
                "Unauthorized", "UNAUTHORIZED", 401
            )
        )
    }
}