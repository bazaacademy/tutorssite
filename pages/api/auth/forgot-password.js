// pages/api/auth/forgot-password.js
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import createMailTransporter from "@/lib/mailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found with this email." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 minutes
    await user.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/reset-password?token=${token}&email=${email}`;
    
    const transporter = await createMailTransporter();
    await transporter.sendMail({
      from: `"${process.env.COMPANY_NAME}" <${process.env.GMAIL_ACCOUNT}>`,
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 30 minutes.</p>`,
    });

    return res.status(200).json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
}
