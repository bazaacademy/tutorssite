// pages/api/tutors/index.js
import dbConnect from "../../../lib/mongodb";
import TutorProfile from "../../../models/TutorProfile";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const tutors = await TutorProfile.find({})
        // populate tutor’s linked user info
        .populate("user", "name imageUrl email membership firstFreeUsed location ");
        // populate reviewer info inside reviews
        
       console.log(tutors);
      res.status(200).json(tutors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch tutors", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
