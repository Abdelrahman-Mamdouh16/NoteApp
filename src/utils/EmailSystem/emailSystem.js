import nodemailer from "nodemailer";

export const mailSystem = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.HOST_EMAIL,
    to, // list of receivers
    subject, // subject line
    text, // plain text body
    html, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
