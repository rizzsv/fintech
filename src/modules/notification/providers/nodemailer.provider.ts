import nodemailer from "nodemailer";
import { logger } from "../../../shared/logger/logger";


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.verify((err) => {
    if (err) {
        logger.error("SMTP Error:");
    } else {
        logger.info("SMTP Connected");
    }
});
