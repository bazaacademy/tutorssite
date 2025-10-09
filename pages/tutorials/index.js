import { useEffect, useState } from "react";
import TutorCard from "../../components/TutorCard";
import Link from "next/link";

export default function TutorsPage() {
  const [premiumTutors, setPremiumTutors] = useState([]);
  const [freeTutors, setFreeTutors] = useState([]);
  const [loadingPremium, setLoadingPremium] = useState(true);
  const [loadingFree, setLoadingFree] = useState(true);
  const [premiumPage, setPremiumPage] = useState(1);
  const [freePage, setFreePage] = useState(1);
  const [premiumTotalPages, setPremiumTotalPages] = useState(1);
  const [freeTotalPages, setFreeTotalPages] = useState(1);
  const limit = 6; // tutors per page

  const fetchPremiumTutors = async (page = 1) => {
  setLoadingPremium(true);
  try {
    const res = await fetch(`/api/tutors/premium?page=${page}&limit=${limit}`);
    const data = await res.json();

    // handle both `{ tutors: [...] }` and `[...]`
    const tutors = Array.isArray(data) ? data : data.tutors || [];
    setPremiumTutors(tutors);

    setPremiumTotalPages(data.pagination?.totalPages || 1);
  } catch (err) {
    console.error(err);
    setPremiumTutors([]);
  } finally {
    setLoadingPremium(false);
  }
};

const fetchFreeTutors = async (page = 1) => {
  setLoadingFree(true);
  try {
    const res = await fetch(`/api/tutors/free?page=${page}&limit=${limit}`);
    const data = await res.json();

    const tutors = Array.isArray(data) ? data : data.tutors || [];
    setFreeTutors(tutors);

    setFreeTotalPages(data.pagination?.totalPages || 1);
  } catch (err) {
    console.error(err);
    setFreeTutors([]);
  } finally {
    setLoadingFree(false);
  }
};

  useEffect(() => {
    fetchPremiumTutors(premiumPage);
  }, [premiumPage]);

  useEffect(() => {
    fetchFreeTutors(freePage);
  }, [freePage]);

  return (
    <div className="container py-4">
      {/* Section 1: Premium Tutors */}
      <section>
        <h2 className="mb-3 text-primary">⭐ Premium Tutors</h2>
        {loadingPremium ? (
          <p>Loading premium tutors...</p>
        ) : (
          <>
            <div className="row g-4">
              {premiumTutors.length > 0 ? (
                premiumTutors.map((tutor) => (
                  <div key={tutor._id} className="col-md-4">
                    <Link href={`/tutors/${tutor._id}`} passHref className="text-decoration-none">
                      <TutorCard
                        photo={tutor.photo || tutor.user.imageUrl}
                        firstname={tutor.user?.name}
                        title={tutor.title}
                          bio={tutor.bio}
                          qualifications={tutor.qualifications}
                          subjects={tutor.subjects}
                          teachesOnline={tutor.teachesOnline}
                          teachesInPerson={tutor.teachesInPerson}
                          location={tutor.location?.city || tutor.location?.country}
                          ratePerHour={tutor.ratePerHour}
                          rating={tutor.rating}
                          reviews={tutor.reviews}
                        />
                      
                    </Link>
                  </div>
                ))
              ) : (
                <p>No premium tutors available.</p>
              )}
            </div>

            {/* Pagination */}
            {premiumTotalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                  disabled={premiumPage === 1}
                  onClick={() => setPremiumPage((p) => p - 1)}
                  className="btn btn-outline-primary"
                >
                  Prev
                </button>
                <span>
                  Page {premiumPage} of {premiumTotalPages}
                </span>
                <button
                  disabled={premiumPage === premiumTotalPages}
                  onClick={() => setPremiumPage((p) => p + 1)}
                  className="btn btn-outline-primary"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Section 2: Tutors with Free Session Available */}
      <section className="mt-5">
        <h2 className="mb-3 text-success">🎁 Tutors Offering First Free Session</h2>
        {loadingFree ? (
          <p>Loading free session tutors...</p>
        ) : (
          <>
            <div className="row g-4">
              {freeTutors.length > 0 ? (
                freeTutors.map((tutor) => (
                  <div key={tutor._id} className="col-md-4">
                    <Link href={`/tutors/${tutor._id}`} passHref className="text-decoration-none">
                      <TutorCard
                        photo={tutor.photo || tutor.user.imageUrl}
                        firstname={tutor.user?.name}
                        title={tutor.title}
                          bio={tutor.bio}
                          qualifications={tutor.qualifications}
                          subjects={tutor.subjects}
                          teachesOnline={tutor.teachesOnline}
                          teachesInPerson={tutor.teachesInPerson}
                          location={tutor.location?.city || tutor.location?.country}
                          ratePerHour={tutor.ratePerHour}
                          rating={tutor.rating}
                          reviews={tutor.reviews}
                        />
                      </Link>
                    </div>
                  ))
              ) : (
                <p>No free session tutors available.</p>
              )}
            </div>

            {/* Pagination */}
            {freeTotalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                  disabled={freePage === 1}
                  onClick={() => setFreePage((p) => p - 1)}
                  className="btn btn-outline-success"
                >
                  Prev
                </button>
                <span>
                  Page {freePage} of {freeTotalPages}
                </span>
                <button
                  disabled={freePage === freeTotalPages}
                  onClick={() => setFreePage((p) => p + 1)}
                  className="btn btn-outline-success"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
