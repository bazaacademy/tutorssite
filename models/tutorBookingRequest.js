import mongoose from "mongoose";

const TutorBookingRequestSchema = new mongoose.Schema(
  {
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.TutorBookingRequest ||
  mongoose.model("TutorBookingRequest", TutorBookingRequestSchema);
