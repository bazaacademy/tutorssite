// // components/TutorsSection.js
// import React, { useEffect, useState, useCallback } from "react";
// import TutorCard from "./TutorCard";
// import Link from "next/link";

// const TutorsSection = () => {
//   const [tutors, setTutors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(6); // tutors per page
//   const [hasMore, setHasMore] = useState(true);

//   const fetchTutors = useCallback(async (pageNum = 1) => {
//     try {
//       const res = await fetch(`/api/tutors/premium?page=${pageNum}&limit=${limit}`);
//       const { tutors: premiumTutors, pagination } = await res.json();

//       if (!pagination.hasMore) {
//         setHasMore(false);
//       }

//       setTutors((prev) =>
//         pageNum === 1 ? premiumTutors : [...prev, ...premiumTutors]
//       );
//     } catch (error) {
//       console.error("Error fetching tutors:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [limit]);

//   useEffect(() => {
//     fetchTutors(page);
//   }, [page, fetchTutors]);

//   if (loading && page === 1) {
//     return (
//       <section className="py-5 bg-light text-center">
//         <p>Loading tutors...</p>
//       </section>
//     );
//   }

//   return (
//     <section className="py-5 bg-light">
//       <div className="container">
//         <h2 className="text-center mb-4">Premium Tutors ⭐⭐⭐⭐⭐</h2>
//         <div className="row g-4">
//           {tutors.length > 0 ? (
//             tutors.map((tutor) => {
//               const firstname = tutor?.user?.name
//                 ? tutor.user.name.split(" ")[0]
//                 : "Tutor";

//               return (
//                 <div key={tutor._id} className="col-md-4">
//                   <Link
//                     href={`/tutors/${tutor._id}`}
//                     className="text-decoration-none"
//                   >
//                     <TutorCard
//                       photo={ tutor?.user?.imageUrl || tutor.photo || "/tutor6.jpg"}
//                       firstname={firstname}
//                       title={tutor.title}
//                       bio={tutor.bio}
//                       qualifications={tutor.qualifications}
//                       subjects={tutor.subjects}
//                       teachesOnline={tutor.teachesOnline}
//                       teachesInPerson={tutor.teachesInPerson}
//                       location={tutor.location?.city || "Unknown"}
//                       ratePerHour={tutor.ratePerHour}
//                       rating={tutor.rating}
//                       reviews={tutor.reviews}
//                     />
//                   </Link>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-center">
//               No premium tutors available at the moment.
//             </p>
//           )}
//         </div>

//         {/* ✅ Pagination Button */}
//         {hasMore ? (
//           <div className="text-center mt-4">
//             <button
//               className="btn btn-primary"
//               onClick={() => setPage((prev) => prev + 1)}
//               aria-label="Load more tutors"
//             >
//               {loading && page > 1 ? "Loading..." : "See More Tutors"}
//             </button>
//           </div>
//         ) : (
//           <div className="text-center mt-4">
//             <Link href="/tutorials" className="btn btn-secondary">
//               View All Tutors
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default TutorsSection;

// components/TutorsSection.js
import React, { useEffect, useState } from "react";
import TutorCard from "./TutorCard";
import Link from "next/link";

const TutorsSection = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // tutors per page

  const fetchTutors = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tutors/premium?page=${pageNum}&limit=${limit}`);
      const data = await res.json();

      // Handle both { tutors: [...] } and [...] responses
      const tutorsData = Array.isArray(data) ? data : data.tutors || [];
      setTutors(tutorsData);

      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching tutors:", error);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors(page);
  }, [page]);

  if (loading) {
    return (
      <section className="py-5 bg-light text-center">
        <p>Loading tutors...</p>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Premium Tutors ⭐⭐⭐⭐⭐</h2>
        <div className="row g-4">
          {tutors.length > 0 ? (
            tutors.map((tutor) => {
              const firstname = tutor?.user?.name
                ? tutor.user.name.split(" ")[0]
                : "Tutor";

              return (
                <div key={tutor._id} className="col-md-4">
                  <Link
                    href={`/tutors/${tutor._id}`}
                    className="text-decoration-none"
                  >
                    <TutorCard
                      photo={tutor?.user?.imageUrl || tutor.photo || "/tutor6.jpg"}
                      firstname={firstname}
                      title={tutor.title}
                      bio={tutor.bio}
                      qualifications={tutor.qualifications}
                      subjects={tutor.subjects}
                      teachesOnline={tutor.teachesOnline}
                      teachesInPerson={tutor.teachesInPerson}
                      location={tutor.location?.city || "Unknown"}
                      ratePerHour={tutor.ratePerHour}
                      rating={tutor.rating}
                      reviews={tutor.reviews}
                    />
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="text-center">No premium tutors available at the moment.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn btn-outline-primary"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="btn btn-outline-primary"
            >
              Next
            </button>
          </div>
        )}

        {/* Optional: Link to full tutorials page */}
        <div className="text-center mt-4">
          <Link href="/tutorials" className="btn btn-secondary">
            View All Tutors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TutorsSection;

