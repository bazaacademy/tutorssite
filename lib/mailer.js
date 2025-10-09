import nodemailer from "nodemailer";


// Create a transporter object
const createMailTransporter = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // STARTTLS port
    secure: true, // false for TLS, true for SSL (465)
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_APP_PASSWORD, // match your .env name exactly
    },
  });

  return transporter;
};

export default createMailTransporter;
