export function verificationTemplate(data: {
    verificationUrl: string;
}) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2>Verify Your Email</h2>

            <p>Thank you for registering.</p>

            <p>Please click the button below to verify your email address.</p>

            <a
                href="${data.verificationUrl}"
                style="
                    display:inline-block;
                    padding:12px 24px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:6px;
                "
            >
                Verify Email
            </a>

            <p style="margin-top:20px;">
                If you did not create this account, you can safely ignore this email.
            </p>
        </div>
    `;
}