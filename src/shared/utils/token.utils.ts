import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateAccessToken(
    userId: string,
    sessionId: string,
) {
    return jwt.sign(
        {
            sub: userId,
            sessionId,
        },
        JWT_SECRET,
        {
            expiresIn: '15m',
        }
    );
}

export function verifyAccessToken(
    token: string
) {
    return jwt.verify(
        token,
        JWT_SECRET
    ) as {
        sub: string;
        sessionId: string;
    }
}

export function generateRefreshToken() {
    return crypto.randomBytes(64).toString('hex');
}