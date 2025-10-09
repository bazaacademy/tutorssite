 // Accept or reject a booking request
 // Only the tutor can perform this action
// Request body: { requestId, action } // action = "accept" or "reject"
// Response: updated booking request
// Error: 401 (not authenticated), 403 (not your request), 404 (request not found)
// 405 (method not allowed)
// Method: PUT
// Access: Tutor only
// Note: When accepting a request, mark firstFreeUsed = true for both tutor & student
// to prevent them from booking another free session
// in the future
// Also, update the request status to "accepted" or "rejected"
// depending on the action taken
// Finally, return the updated request
// to the client
// This endpoint is used in the tutor dashboard
// when the tutor responds to a booking request
// from a student
// The tutor can either accept or reject the request
// based on their availability and preference 
 // The client will handle the response accordingly
 // by updating the UI to reflect the new status of the request
 // and notifying the student of the tutor's decision
 



import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import TutorBookingRequest from "@/models/tutorBookingRequest";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Not authenticated" });

  await dbConnect();

  const { requestId, action } = req.body; // action = "accept" or "reject"

  const tutorId = session.user.id;

  const request = await TutorBookingRequest.findById(requestId);
  if (!request) return res.status(404).json({ message: "Request not found" });
  
  if (String(request.tutor) !== tutorId)
    return res.status(403).json({ message: "Not your request" });

  if (action === "accept") {
    request.status = "accepted";

    // Mark firstFreeUsed = true for both tutor & student
    await User.findByIdAndUpdate(request.student, { firstFreeUsed: true });
    await User.findByIdAndUpdate(request.tutor, { firstFreeUsed: true });
  } else if (action === "reject") {
    request.status = "rejected";
  }

  await request.save();
  res.json(request);
}
