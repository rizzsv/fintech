import { Response } from "express";

export class ResponseUtils {
    static success(
        res: Response,
        data: unknown,
        message = "Success",
    ) {
        return res.status(200).json({
            status: "success",
            message,
            data,
        });
    }

    static created(
        res: Response,
        data: unknown,
        message = "Created",
    ) {
        return res.status(201).json({
            status: "success",
            message,
            data,
        })
    }
}