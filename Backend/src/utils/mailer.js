import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";

// Check if using Gmail
const isGmail = smtpHost.includes("gmail") || smtpUser?.includes("@gmail.com");

// Live-server safe transporter
const transporter = nodemailer.createTransport(
  isGmail
    ? {
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false, // Prevents live server SSL handshake drops
        },
      }
    : {
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT, 10) || 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      }
);

// Verify connection configuration on server startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mailer Connection Error on Live Server:", error.message);
  } else {
    console.log("✅ Mailer is connected and ready to send emails!");
  }
});

const getFromEmail = () => smtpUser;
const getToEmail = () =>
  process.env.NOTIFICATION_EMAIL || process.env.COMPANY_EMAIL || getFromEmail();

// 1. Contact Form Notification (Contact Page)
export const sendContactNotification = async (inquiry) => {
  const fromEmail = getFromEmail();
  const toEmail = getToEmail();

  if (!fromEmail || !toEmail) {
    console.error("❌ Mailer Error: Missing SMTP_USER or NOTIFICATION_EMAIL in environment variables.");
    return null;
  }

  const mailOptions = {
    from: `"KICS Website" <${fromEmail}>`,
    to: toEmail,
    subject: `📩 New Contact Form Message from ${inquiry.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
        <h2 style="color: #d49570; border-bottom: 2px solid #d49570; padding-bottom: 8px;">
          New Contact Form Submission
        </h2>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Phone:</strong> ${inquiry.phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; border-left: 4px solid #d49570; padding: 12px 16px; margin: 10px 0; border-radius: 4px;">
          ${inquiry.message}
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;" />
        <p style="font-size: 12px; color: #888;">
          Sent automatically from the Karthika Machines Contact Page.
        </p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

// 2. Consultation Booking Notification (Modal)
export const sendConsultationNotification = async (consultation) => {
  const fromEmail = getFromEmail();
  const toEmail = getToEmail();

  if (!fromEmail || !toEmail) {
    console.error("❌ Mailer Error: Missing SMTP_USER or NOTIFICATION_EMAIL in environment variables.");
    return null;
  }

  const mailOptions = {
    from: `"KICS Website" <${fromEmail}>`,
    to: toEmail,
    subject: `🩺 New Consultation Booking: ${consultation.fullName || consultation.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
        <h2 style="color: #d49570; border-bottom: 2px solid #d49570; padding-bottom: 8px;">
          New Consultation Request
        </h2>
        <p><strong>Full Name:</strong> ${consultation.fullName || consultation.name}</p>
        <p><strong>Email:</strong> ${consultation.email}</p>
        <p><strong>Phone:</strong> ${consultation.phone}</p>
        <p><strong>Business / Clinic:</strong> ${consultation.businessName || "Not provided"}</p>
        <p><strong>Role:</strong> ${consultation.role || "Not provided"}</p>
        <p><strong>City:</strong> ${consultation.city || "Not provided"}</p>
        <p><strong>Interest:</strong> ${consultation.interest || "General Inquiry"}</p>
        <p><strong>Preferred Connection:</strong> ${
          Array.isArray(consultation.connectionMethods)
            ? consultation.connectionMethods.join(", ")
            : consultation.connectionMethods || "Phone"
        }</p>
        <p><strong>Additional Info:</strong></p>
        <div style="background: #f9f9f9; border-left: 4px solid #d49570; padding: 12px 16px; margin: 10px 0; border-radius: 4px;">
          ${consultation.additionalInfo || "None"}
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;" />
        <p style="font-size: 12px; color: #888;">
          Sent automatically from the Karthika Machines Consultation Booking Modal.
        </p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

export default transporter;