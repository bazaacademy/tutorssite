import dbConnect from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import User from "@/models/User";
import CustomRequest from "@/models/customRequest";
import CustomRequestContact from "@/models/CustomRequestContact";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const student = await User.findOne({ email: session.user.email });
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  if (student.role !== "student") {
    return res
      .status(403)
      .json({ message: "Only students can view tutor applications" });
  }

  try {
    // Find all requests created by this student
    const requests = await CustomRequest.find({ user: student._id }).select("_id");

    const requestIds = requests.map((r) => r._id);

    // Find all tutor contacts for those requests
    const contacts = await CustomRequestContact.find({
      customRequestId: { $in: requestIds },
    })
      .populate("tutor", "name email image") // show tutor info
      .populate("customRequestId", "title description budget"); // show request info

    return res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching tutor applications" });
  }
}
