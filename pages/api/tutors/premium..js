import dbConnect from "../../../lib/mongodb";
import TutorProfile from "../../../models/TutorProfile";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { page = 1, limit = 6 } = req.query;
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const skip = (pageNum - 1) * limitNum;

      // Fetch tutors + populate user fields (including membership)
      const tutors = await TutorProfile.find({})
        .populate("user", "name imageUrl email membership freeSessionUsed")
        .exec();

      // ✅ Filter only premium users
      const premiumTutors = tutors.filter(
        (t) => t.user?.membership?.status === "premium"
      );
            console.log("premMium:",  premiumTutors);

      // Pagination manually since we filtered in memory
      const total = premiumTutors.length;
      const paginatedTutors = premiumTutors.slice(skip, skip + limitNum);
        console.log("premMium tutors:",  paginatedTutors);
        
      res.status(200).json({
        tutors: paginatedTutors,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
          hasMore: pageNum * limitNum < total,
        },
      });
    } catch (error) {
      console.error("Error fetching tutors:", error);
      res.status(500).json({ message: "Failed to fetch tutors", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
