// pages/api/tutors/index.js
import dbConnect from "@/lib/mongodb"; // adjust path
import Tutor from "@/models/TutorProfile"; // adjust path
import User from "@/models/User"; // ensure you have User model if needed

export default async function handler(req, res) {
  await dbConnect();

  const { subject, country, state, city } = req.query;

  try {
    // Build dynamic query object
    const query = {};

    if (subject) {
      // Match against subjects array (case-insensitive)
      query.subjects = { $elemMatch: { $regex: new RegExp(subject.replace(/-/g, " "), "i") } };
    }
    if (country) {
      query["location.country"] = { $regex: new RegExp(country.replace(/-/g, " "), "i") };
    }
    if (state) {
      query["location.state"] = { $regex: new RegExp(state.replace(/-/g, " "), "i") };
    }
    if (city) {
      query["location.city"] = { $regex: new RegExp(city.replace(/-/g, " "), "i") };
    }

    // Populate tutor with user details (assuming TutorProfile has user field referencing User)
    const tutors = await Tutor.find(query)
      .populate({
        path: "user",
        select: "email imageUrl firstFreeUsed membership, name", // explicitly include these fields
      })
      .lean();

    res.status(200).json(tutors);
  } catch (error) {
    console.error("Error fetching tutors:", error);
    res.status(500).json({ error: "Failed to fetch tutors" });
  }
}
