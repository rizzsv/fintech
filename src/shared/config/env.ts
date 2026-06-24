import dotenv from 'dotenv';
import {z} from 'zod';

dotenv.config();

const schema = z.object({
    NODE_ENV: z.string(),

    APP_PORT: z.string(),

    DB_HOST: z.string(),
    DB_PORT: z.string(),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),

    REDIS_HOST: z.string(),
    REDIS_PORT: z.string(),

    JWT_SECRET: z.string(),

    LOG_LEVEL: z.string(),
});

export const env = schema.parse(process.env);