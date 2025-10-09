// pages/api/tutors/[id].js
import dbConnect from "../../../lib/mongodb";
import TutorProfile from "../../../models/TutorProfile";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const tutor = await TutorProfile.findById(id)
        .populate("user", "name imageUrl firstFreeUsed email membership location") // bring user info
        .populate("reviews.user", "name"); // bring reviewer names

      if (!tutor) {
        return res.status(404).json({ message: "Tutor not found" });
      }

      res.status(200).json(tutor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch tutor", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
