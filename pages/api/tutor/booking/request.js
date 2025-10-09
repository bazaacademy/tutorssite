// pages/api/tutor/booking/request.js
//
// Handles:
// - POST: student sends booking request to a tutor (notify tutor)
// - GET: fetch booking requests
// - PUT: tutor updates status (accept/decline) (notify student)

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import createMailTransporter from "@/lib/mailer";

import User from "@/models/User";
import TutorBookingRequest from "@/models/tutorBookingRequest";

async function sendEmail(to, subject, html) {
  const transporter = await createMailTransporter();
  await transporter.sendMail({
    from: `"Baza Academy" <${process.env.GMAIL_ACCOUNT}>`,
    to,
    subject,
    html,
  });
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Not authenticated" });

  await dbConnect();

  // ✅ GET: Fetch booking requests
  if (req.method === "GET") {
    const user = await User.findOne({ email: session.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const requests = await TutorBookingRequest.find({
      $or: [{ tutor: user._id }, { student: user._id }],
    })
      .populate("tutor", "name email image phone")
      .populate("student", "name email image phone");

    // Hide contacts unless accepted
    const sanitized = requests.map((req) => {
      const r = req.toObject();
      if (r.status !== "accepted") {
        if (r.tutor) {
          delete r.tutor.email;
          delete r.tutor.phone;
        }
        if (r.student) {
          delete r.student.email;
          delete r.student.phone;
        }
      }
      return r;
    });

    return res.status(200).json(sanitized);
  }

  // ✅ POST: Student sends request
  if (req.method === "POST") {
    const { tutorId, message } = req.body;
    const student = await User.findOne({ email: session.user.email });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const isPremium = student.membership?.status === "premium";
    const canSend = isPremium || student.firstFreeUsed === false;

    if (!canSend) {
      return res
        .status(403)
        .json({ message: "Upgrade to premium to contact more tutors." });
    }

    const booking = await TutorBookingRequest.create({
      tutor: tutorId,
      student: student._id,
      message,
    });

    // 📩 Notify Tutor
    const tutor = await User.findById(tutorId);
    if (tutor?.email) {
      await sendEmail(
        tutor.email,
        "New Lesson Request",
        `<p>Hello ${tutor.name},</p>
         <p>You have a new lesson request from <b>${student.name}</b>.</p>
         <p>Message: ${message}</p>
         <p>Please log in to your dashboard to accept or decline this request.</p>`
      );
    }

    return res.status(201).json(booking);
  }

  // ✅ PUT: Tutor accepts/declines
  if (req.method === "PUT") {
    const { id } = req.query;
    const { status } = req.body;

    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const request = await TutorBookingRequest.findById(id)
      .populate("student", "name email")
      .populate("tutor", "name email");
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.tutor._id.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this request" });
    }

    request.status = status;
    await request.save();

    // 📩 Notify Student
    if (request.student?.email) {
      if (status === "accepted") {
        await sendEmail(
          request.student.email,
          "Lesson Request Accepted",
          `<p>Hello ${request.student.name},</p>
           <p>Your request to <b>${request.tutor.name}</b> has been <b>accepted</b>.</p>
           <p>You can now view their contact details in your dashboard.</p>`
        );
      } else if (status === "declined") {
        await sendEmail(
          request.student.email,
          "Lesson Request Declined",
          `<p>Hello ${request.student.name},</p>
           <p>Unfortunately, your request to <b>${request.tutor.name}</b> was <b>declined</b>. 
           Please login to check out other available tutors you can contact.</p>`
        );
      }
    }

    return res.status(200).json(request);
  }

  return res.status(405).end();
}
