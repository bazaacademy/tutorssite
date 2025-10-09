import dbConnect from '../../../lib/mongodb';
import User from "../../../models/User";
import bcrypt from "bcrypt";
import crypto from "crypto";
import createMailTransporter from '@/lib/mailer';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password, role, phone } = req.body;

  try {
    await dbConnect();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate 6-digit verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const verificationCodeExpires = Date.now() + 30 * 60 * 1000; // 30 minutes

    // Save user
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      role,
      phone,
      emailVerified: false,
      verificationCode,
      verificationCodeExpires
    });

    await newUser.save();

    // Send verification email
    const transporter = await createMailTransporter();
    // console.log("EMAIL:", process.env.GMAIL_ACCOUNT);
    //     console.log("app password:", process.env.GMAIL_APP_PASSWORD);


    await transporter.sendMail({
      from: `"${process.env.COMPANY_NAME}" <${process.env.GMAIL_ACCOUNT}>`,
      to: email,
      subject: "Email Verification",
      html: `
        <h2>Welcome to ${process.env.COMPANY_NAME}!</h2>
        <p>Please verify your email using this code:</p>
        <h1>${verificationCode}</h1>
       
        <br/>
        <p>This code expires in 30 minutes.</p>
        <p>If you did not sign up, please ignore this email.</p>
      `,
    });



    res.status(201).json({
  success: true,
  message: "User registered successfully"
});

    console.log("New user created:", newUser);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



 // <p>You can also click the link below to verify:</p>
        // <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/verify-email?code=${verificationCode}">
        //   Verify Email
        // </a>