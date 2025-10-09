import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import createMailTransporter from "@/lib/mailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  if (user.emailVerified) return res.status(400).json({ message: "Email already verified" });

  const verificationCode = crypto.randomInt(100000, 999999).toString();
  const verificationCodeExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 mins

  // ✅ Force update with $set to ensure fields are saved
  await User.findOneAndUpdate(
    { email },
    {
      $set: {
        verificationCode,
        verificationCodeExpires,
        emailVerified: false, // just to be sure
      },
    },
    { new: true, runValidators: true }
  );

  const transporter = await createMailTransporter();
  await transporter.sendMail({
    from: `"${process.env.COMPANY_NAME}" <${process.env.GMAIL_ACCOUNT}>`,
    to: email,
    subject: "New Verification Code",
    html: `
      <p>Your new verification code:</p>
      <h1>${verificationCode}</h1>
      
      <p>This code expires in 30 minutes.</p>
    `,
  });

  res.status(200).json({ message: "New code sent to your email" });
}


{/* <p>Click <Link href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/verify-email?verificationCode=${verificationCode}">here</Link> to verify your email.</p> */}