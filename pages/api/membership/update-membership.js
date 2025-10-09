


// pages/api/membership/update-membership.js
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

   await dbConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Not authenticated" });

 
try{
   const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: { "membership.status": "premium" } },
    { new: true }
  );

  return res.status(200).json({ success: true, user });
} catch (err){
    console.error(err);
    return res.status(500).json({ message: "Error updating membership" });
}
 
}

