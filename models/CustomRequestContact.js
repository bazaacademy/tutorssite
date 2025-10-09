import mongoose from "mongoose";

const CustomRequestContactSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "CustomRequest", required: true },
  message: { type: String, required: true },
  
}, { timestamps: true });

export default mongoose.models.CustomRequestContact || mongoose.model("CustomRequestContact", CustomRequestContactSchema);
