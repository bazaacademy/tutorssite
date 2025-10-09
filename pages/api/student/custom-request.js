// pages/api/custom-requests/index.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import CustomRequestContact from "@/models/CustomRequestContact";
import CustomRequest from "@/models/customRequest";
import createMailTransporter from "@/lib/mailer";

export default async function handler(req, res) {
  await dbConnect();

  // ✅ Always allow GET without authentication
  if (req.method === "GET") {
    try {
      const requests = await CustomRequest.find()
        .populate("user", "name email membership imageUrl");
      return res.status(200).json(requests);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching requests" });
    }
  }

  // 🔐 For POST actions, check session
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 🟢 CREATE custom request (student only, premium)
  if (req.method === "POST" && !req.query.action) {
    try {
      if (user.role !== "student" || user.membership?.status !== "premium") {
        return res
          .status(403)
          .json({ message: "Only premium students can create custom requests" });
      }

      const request = new CustomRequest({
        ...req.body,
        user: user._id,
      });

      await request.save();
      return res.status(201).json(request);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error creating custom request" });
    }
  }

  // 🟢 CONTACT request (only premium tutors)
  if (req.method === "POST" && req.query.action === "contact") {
    try {
      if (!(user.role === "tutor" && user.membership?.status === "premium")) {
        return res
          .status(403)
          .json({ message: "Only premium tutors can contact custom requests" });
      }

      const { customRequestId, message } = req.body;

      // Save tutor contact
      const contact = new CustomRequestContact({
        tutor: user._id,
        customRequestId,
        message,
      });
      await contact.save();

      // Find the student who owns this request
      const request = await CustomRequest.findById(customRequestId)
        .populate("user", "name email");
      if (!request) {
        return res.status(404).json({ message: "Custom request not found" });
      }

      // Send email notification
      try {
        const transporter = await createMailTransporter();

        await transporter.sendMail({
          from: `"Baza Academy" <${process.env.GMAIL_ACCOUNT}>`,
          to: request.user.email,
          subject: "A tutor has responded to your custom request",
          html: `
            <h2>Hi ${request.user.name},</h2>
            <p>A tutor has responded to your request <strong>${request.title}</strong>.</p>
            <p><strong>Message from Tutor:</strong> ${message}</p>
            <p>You can log in to your dashboard to view more details.</p>
          `,
        });
      } catch (emailErr) {
        console.error("Error sending email:", emailErr);
      }

      return res
        .status(201)
        .json({ message: "Contact request sent and student notified" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error sending contact request" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
