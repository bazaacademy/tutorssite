// File: /pages/api/student/dashboard.js

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]"; // adjust if path differs
import dbConnect from "@/lib/mongodb";
import Session from "@/models/Session";
import TutorProfile from "@/models/TutorProfile";

export default async function handler(req, res) {
  try {
    // Ensure DB connection
    await dbConnect();

    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (session.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can access this route" });
    }

    const now = new Date();

    // Get upcoming sessions
    const upcoming = await Session.find({
      student: session.user.id,
      startsAt: { $gte: now },
      status: "scheduled",
    })
      .sort({ startsAt: 1 })
      .limit(5)
      .populate("tutor", "name email imageUrl");

    // Get connected tutors
    const connectedTutorProfiles = await TutorProfile.find()
      .limit(6)
      .populate("user", "name imageUrl");

    const connectedTutors = connectedTutorProfiles.map((tp) => ({
      id: tp._id.toString(), // ✅ TutorProfile ID (not User ID)
      userId: tp.user._id.toString(), // still keep User ID if you need it
      name: tp.user.name,
      avatar: tp.photo || tp.user.imageUrl || "",
      subjects: tp.subjects || [],
    }));

    // Simple notifications (fake for now)
    const notifications = upcoming.map((s) => ({
      id: s._id.toString(),
      message: `Upcoming ${s.subject} with ${
        s.tutor?.name || "Tutor"
      } at ${new Date(s.startsAt).toLocaleString()}`,
    }));

    // Send response
    return res.json({
      name: session.user.name,
      email: session.user.email,
      imageUrl: session.user.imageUrl || "",
      upcomingSessions: upcoming.map((s) => ({
        id: s._id.toString(),
        tutor: s.tutor?.name || "Tutor",
        subject: s.subject,
        date: new Date(s.startsAt).toLocaleString(),
      })),
      connectedTutors,
      notifications,
    });
  } catch (error) {
    console.error("Error in student dashboard API:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
