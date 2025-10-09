

import mongoose from "mongoose";

const CustomRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  modeOfLesson: { type: String, enum: ["online(web cam)", "offline(in-person)"] },
  address: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });


export default mongoose.models.CustomRequest || mongoose.model("CustomRequest", CustomRequestSchema);

