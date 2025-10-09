import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Session from "@/models/Session";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Not authenticated" });

  await dbConnect();

  const student = await User.findById(session.user.id);
  if (!student || student.role !== "student") {
    return res.status(403).json({ message: "Only students can book" });
  }

  const { tutorId, subject, startsAt, endsAt } = req.body;
  if (!tutorId || !subject || !startsAt || !endsAt) return res.status(400).json({ message: "Missing fields" });

  // paywall: allow exactly one free booking per student
  if (student.freeSessionUsed && student.membership.status !== "premium") {
    return res.status(402).json({ message: "Membership required after your first free session" });
  }

  const s = await Session.create({
    tutor: tutorId,
    student: student._id,
    subject,
    startsAt: new Date(startsAt),
    endsAt: new Date(endsAt),
  });

  // mark free used if this is the first time
  if (!student.freeSessionUsed) {
    student.freeSessionUsed = true;
    await student.save();
  }

  return res.status(201).json({ message: "Session booked", sessionId: s._id });
}
