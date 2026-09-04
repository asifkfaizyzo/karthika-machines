import nodemailer from "nodemailer";

export const sendConsultationNotification = async (data) => {
  // If SMTP is not configured, skip email sending without crashing
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("ℹ️ SMTP credentials not configured in .env. Skipping email dispatch.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Karthika Machines Portal" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
    subject: `🔔 New Consultation Request: ${data.fullName}`,
    html: `
      <h2>New Consultation Request</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; max-width:600px; font-family:Arial, sans-serif;">
        <tr><td><strong>Full Name</strong></td><td>${data.fullName}</td></tr>
        <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>Business / Clinic</strong></td><td>${data.businessName}</td></tr>
        <tr><td><strong>Role</strong></td><td>${data.role || "N/A"}</td></tr>
        <tr><td><strong>City</strong></td><td>${data.city || "N/A"}</td></tr>
        <tr><td><strong>Interested In</strong></td><td>${data.interest}</td></tr>
        <tr><td><strong>Preferred Contact</strong></td><td>${data.connectionMethods.join(", ")}</td></tr>
        <tr><td><strong>Additional Notes</strong></td><td>${data.additionalInfo || "None"}</td></tr>
      </table>
    `,
  };

  await transporter.sendMail(mailOptions);
};