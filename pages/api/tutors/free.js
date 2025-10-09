// pages/api/tutors/free.js
import dbConnect from "../../../lib/mongodb";
import TutorProfile from "../../../models/TutorProfile";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const tutors = await TutorProfile.find({})
        .populate({
          path: "user",
          match: { firstFreeUsed: false }, // only users with free session available
          select: "name email imageUrl firstFreeUsed membership",
        });

      // filter out tutors where user was not matched
      const filteredTutors = tutors.filter(t => t.user !== null);

      res.status(200).json(filteredTutors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch free eligible tutors", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
