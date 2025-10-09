import mongoose from "mongoose";

const TutorProfileSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      unique: true, 
      required: true 
    },

    bio: { type: String, trim: true },
    title: { type: String, trim: true },
    qualifications: { type: String, trim: true },

    // ✅ Subjects stored as an array
    subjects: [{ type: String, trim: true }],

    experience: { type: String, trim: true },
    teachesOnline: { type: Boolean, default: false },
    teachesInPerson: { type: Boolean, default: false },

    // ✅ Better location handling (city & country)
    location: {
      country: { type: String },
      state: { type: String },
      city: { type: String },
    },

    abouttheclass: { type: String, trim: true },
    ratePerHour: { type: Number, default: 0, min: 0 },

    photo: { type: String, trim: true },

    // ⭐ Ratings & Reviews
    rating: { type: Number, default: 0 }, // avg rating
    reviewsCount: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String, trim: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // ✅ New suggestions (safe & optional)
    availability: [
      {
        day: { type: String }, // e.g. "Monday"
        times: [{ type: String }], // e.g. ["10:00-12:00", "14:00-16:00"]
      },
    ],

    languages: [{ type: String, trim: true }], // e.g. ["English", "French"]

    

    verificationStatus: { 
      type: String, 
      enum: ["pending", "verified", "rejected"], 
      default: "pending" 
    },

    featured: { type: Boolean, default: false }, // ✅ for promoting tutors
  },
  { timestamps: true }
);

export default mongoose.models.TutorProfile ||
  mongoose.model("TutorProfile", TutorProfileSchema);
