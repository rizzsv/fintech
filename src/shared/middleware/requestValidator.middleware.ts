import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export function validateRequest(
    schema: z.ZodType,
    source: "body" | "query" | "params" = "body"
) {
    return (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            return next(result.error);
        }

        Object.assign(req[source], result.data);

        next();
    };
}