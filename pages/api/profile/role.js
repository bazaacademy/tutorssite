// /api/profile/role.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import TutorProfile from "@/models/TutorProfile";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Not authenticated" });

  await dbConnect();

  try {
    // ✅ Update role directly without triggering validation on other fields
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { role: session.user.role === "student" ? "tutor" : "student" } },
      { new: true } // return updated doc
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure TutorProfile exists if becoming tutor
    if (user.role === "tutor") {
      let tutorProfile = await TutorProfile.findOne({ user: user._id });
      if (!tutorProfile) {
        tutorProfile = await TutorProfile.create({
          user: user._id,
          bio: "",
          subjects: [],
          ratePerHour: 0,
          photo: user.imageUrl || "",
          qualifications: "",
          experience: "",
          teachesOnline: false,
          teachesInPerson: false,
          location: "",
          abouttheclass: "",
        });
      }
    }

    const tutorProfile = await TutorProfile.findOne({ user: user._id });

    return res.json({
      ok: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        imageUrl: user.imageUrl,
        role: user.role,
        membership: user.membership,
        tutorProfile,
      },
    });
  } catch (err) {
    console.error("Role switch error:", err);
    return res.status(500).json({ message: "Could not switch role" });
  }
}
