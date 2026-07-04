import { transporter } from "../providers/nodemailer.provider";

import { BusinessLogger } from "../../../shared/logger/business-logger";
import { emailCounter } from "../../../shared/metrics/metrics";


export class EmailService {

    async send(
        to: string,
        subject: string,
        html: string
    ) {

        try {

            const result =
                await transporter.sendMail({
                    from: process.env.SMTP_EMAIL,
                    to,
                    subject,
                    html,
                });

            emailCounter.inc({
                status: "success",
            });

            BusinessLogger.info(
                "Email sent",
                {
                    to,
                    subject,
                    messageId: result.messageId,
                }
            );

            return result;

        } catch (error) {

            emailCounter.inc({
                status: "failed",
            });

            BusinessLogger.error(
                "Email failed",
                {
                    to,
                    subject,
                    error: error instanceof Error
                        ? error.message
                        : String(error),
                }
            );

            throw error;

        }

    }

}

export const emailService =
    new EmailService();