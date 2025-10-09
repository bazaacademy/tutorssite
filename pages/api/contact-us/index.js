import createMailTransporter from '@/lib/mailer';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message, honey } = req.body;

  // ✅ Simple spam check
  if (honey) {
    return res.status(400).json({ message: "Spam detected" });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const transporter = await createMailTransporter();

    await transporter.sendMail({
      from: `${process.env.COMPANY_NAME}" <${process.env.GMAIL_ACCOUNT}>`,
      to: `${process.env.COMPANY_NAME}" <${process.env.GMAIL_ACCOUNT}>`,
 // your receiving email
      subject: `Contact Form Message from ${name}`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({ message: "Failed to send message" });
  }
}
