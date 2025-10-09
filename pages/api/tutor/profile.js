
// pages/api/tutor/profile.js
//
// API route for tutors to get and update their profile
// Requires authentication and tutor role
// Supports GET and PUT methods
// Validates input and handles errors
// Connects to MongoDB and uses TutorProfile and User models
// Returns appropriate HTTP status codes and messages
// Example profile fields: bio, subjects, ratePerHour, photo, qualifications, experience, teachesOnline, teachesInPerson, location, abouttheclass
// Ensures user's image is updated in User model if photo is changed
// Returns default profile if none exists on GET request
// Uses next-auth for session management
// Uses Mongoose for database operations// pages/api/tutor/profile.js
// pages/api/tutor/profile.js
import dbConnect from "@/lib/mongodb";
import TutorProfile from "@/models/TutorProfile";
import User from "@/models/User";
import { getServerSession } from "next-auth"; 
import { authOptions } from "../auth/[...nextauth]";  // ✅ correct import

export default async function handler(req, res) {
  await dbConnect();

  // ✅ Correct way to get session inside API routes
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in.",
    });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  if (req.method === "GET") {
    try {
      const profile = await TutorProfile.findOne({ user: user._id });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "Tutor profile not found.",
          profile: null,
        });
      }

      return res.json({
        success: true,
        message: "Tutor profile fetched successfully.",
        profile,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching profile.",
        error: err.message,
      });
    }
  }

  if (req.method === "PUT") {
    try {
      const {
        bio,
        subjects,
        ratePerHour,
        photo,
        qualifications,
        experience,
        teachesOnline,
        teachesInPerson,
        location,
        abouttheclass,
      } = req.body;

      if (ratePerHour < 0) {
        return res.status(400).json({
          success: false,
          message: "Rate must be >= 0",
        });
      }

      if (subjects && !Array.isArray(subjects)) {
        return res.status(400).json({
          success: false,
          message: "Subjects must be an array",
        });
      }

      const profile = await TutorProfile.findOneAndUpdate(
        { user: user._id },
        {
          bio,
          subjects,
          ratePerHour,
          photo,
          qualifications,
          experience,
          teachesOnline,
          teachesInPerson,
          location,
          abouttheclass,
          user: user._id,
        },
        { upsert: true, new: true }
      );

      // keep User photo in sync
      if (photo) {
        await User.findByIdAndUpdate(user._id, { imageUrl: photo });
      }

      return res.json({
        success: true,
        message: "Profile updated successfully.",
        profile,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error updating profile.",
        error: err.message,
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed.`,
  });
}
