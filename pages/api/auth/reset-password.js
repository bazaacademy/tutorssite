// pages/api/auth/reset-password.js
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, token, password } = req.body;
  if (!email || !token || !password) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email, resetToken: token });

    if (!user) return res.status(400).json({ message: "Invalid or expired reset link." });
    if (user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ message: "Reset link has expired." });
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successful. Please log in." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
}
