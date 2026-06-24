import nodemailer from "nodemailer";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendVerificationEmail(
    email: string,
    token: string
  ) {
    console.log("SEND EMAIL START");
    const verificationUrl =
      `${process.env.APP_URL}/api/v1/auth/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: `"Fintech Wallet" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify Your Email",

      html: `
        <h2>Email Verification</h2>

        <p>
          Click the button below to verify your account.
        </p>

        <a
          href="${verificationUrl}"
          style="
            background:#2563eb;
            color:white;
            padding:12px 24px;
            text-decoration:none;
            border-radius:8px;
          "
        >
          Verify Email
        </a>

        <p>
          Link expires in 24 hours.
        </p>
      `,
    });
  }
}

export const emailService = new EmailService();