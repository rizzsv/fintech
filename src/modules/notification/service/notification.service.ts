import { verificationTemplate } from "../templates/email-verification";
import { transferSuccessTemplate } from "../templates/transfer-success";
import { TransferSuccessPayload } from "../types/notification.types";
import { emailService } from "./email.service";

export class NotificationService {

    async transferSuccess(
        email: string,
        payload: TransferSuccessPayload
    ) {

        return emailService.send(

            email,

            "Transfer Successful",

            transferSuccessTemplate(payload)

        );

    }

    async sendVerificationEmail(
    email: string,
    verificationUrl: string
) {
    return emailService.send(
        email,
        "Verify Your Email",
        verificationTemplate({
            verificationUrl,
        })
    );
}

}

export const notificationService =
    new NotificationService();