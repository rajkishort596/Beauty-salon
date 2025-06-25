import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  // Create a transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASS, // your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
