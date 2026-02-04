// import nodemailer from "nodemailer";


// // Create a transporter object
// const createMailTransporter = async () => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465, // STARTTLS port
//     secure: true, // false for TLS, true for SSL (465)
//     auth: {
//       user: process.env.GMAIL_ACCOUNT,
//       pass: process.env.GMAIL_APP_PASSWORD, // match your .env name exactly
//     },
//   });

//   return transporter;
// };

// export default createMailTransporter;


//replacement for gmail smtp using microsoft 365 and portal.azure.com client id
// import nodemailer from "nodemailer";
// import axios from "axios";

// // Create Microsoft 365 Mail Transporter
// const createMailTransporter = async () => {
//   // 1️⃣ Get OAuth Token from Microsoft
//   const tokenUrl = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`;

//   const params = new URLSearchParams();
//   params.append("client_id", process.env.AZURE_CLIENT_ID);
//   params.append("client_secret", process.env.AZURE_CLIENT_SECRET);
//   params.append("scope", "https://outlook.office365.com/.default");
//   params.append("grant_type", "client_credentials");

//   const tokenResponse = await axios.post(tokenUrl, params);
//   const accessToken = tokenResponse.data.access_token;

//   // 2️⃣ Create Nodemailer Transporter
//   const transporter = nodemailer.createTransport({
//     host: "smtp.office365.com",
//     port: 587,
//     secure: false,
//     auth: {
//       type: "OAuth2",
//       user: process.env.OUTLOOK_EMAIL, // your company email
//       accessToken,
//     },
//   });

//   return transporter;
// };

// export default createMailTransporter;


import axios from "axios";

// Create a Microsoft Mail Transporter (Graph API)
const createMailTransporter = async () => {
  // 1️⃣ Get access token
  const tokenUrl = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append("client_id", process.env.AZURE_CLIENT_ID);
  params.append("client_secret", process.env.AZURE_CLIENT_SECRET);
  params.append("scope", "https://graph.microsoft.com/.default");
  params.append("grant_type", "client_credentials");

  const tokenResponse = await axios.post(tokenUrl, params);
  const accessToken = tokenResponse.data.access_token;

  // 2️⃣ Return a transporter-like object
  return {
    sendMail: async ({ from, to, subject, html }) => {
      const sendUrl = `https://graph.microsoft.com/v1.0/users/${process.env.OUTLOOK_EMAIL}/sendMail`;

      await axios.post(
        sendUrl,
        {
          message: {
            subject,
            body: {
              contentType: "HTML",
              content: html,
            },
            from: {
              emailAddress: {
                address: from || process.env.OUTLOOK_EMAIL,
              },
            },
            toRecipients: [
              {
                emailAddress: { address: to },
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
  };
};

export default createMailTransporter;

