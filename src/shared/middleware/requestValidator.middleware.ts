import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest =
  (schema: ZodSchema) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    req.body = result.data;

    next();
  };