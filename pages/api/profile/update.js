import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  await dbConnect();

  try {
    const { name, phone, location, imageUrl, role } = req.body;

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { name, phone, location, imageUrl, role },
      { new: true }
    ).select("-password");

    // If user just became a tutor, ensure TutorProfile exists
    if (role === "tutor") {
      const TutorProfile = (await import("@/models/TutorProfile")).default;
      const exists = await TutorProfile.findOne({ user: user._id });
      if (!exists) {
        await TutorProfile.create({
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

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json({ success: false, message: "Update failed" });
  }
}
