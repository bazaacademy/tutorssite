import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }


  

  const { code } = req.body || req.query;
  console.log("Verification code received:", code);
  if (!code) return res.status(400).json({ message: "Code is required" });
  await dbConnect();

  const user = await User.findOne({ verificationCode: code });
  if (!user) return res.status(400).json({ message: "Invalid or expired code" });

  if (user.emailVerified) {
    return res.status(400).json({ message: "Email already verified" });
  }
  if (user.verificationCode !== code) {
    return res.status(400).json({ message: "Invalid verification code" });
  }

  if (user.verificationCodeExpires < Date.now()) {
    return res.status(400).json({ message: "Verification code expired" });
  }

  user.emailVerified = true;
  user.verificationCode = null;
  await user.save();

  res.status(200).json({ message: "Email verified successfully" });
}
