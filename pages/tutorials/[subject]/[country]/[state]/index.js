// pages/tutorials/[subject]/[country]/[state]/index.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TutorCard from "@/components/TutorCard";
import Link from "next/link";

const StatePage = () => {
  const router = useRouter();
  const { subject, country, state } = router.query;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subject && country && state) {
      fetch(
        `/api/tutors/location?subject=${subject}&country=${country}&state=${state}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTutors(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [subject, country, state]);

  if (loading) return <p className="container">Loading...</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-capitalize">
        {subject?.replace(/-/g, " ")} Tutors in {state?.replace(/-/g, " ")},{" "}
        {country?.replace(/-/g, " ")}
      </h2>
      <div className="row g-4">
        {tutors.length ? (
          tutors.map((tutor) => (
            <div key={tutor._id} className="col-md-4">
              <Link
                href={`/tutors/${tutor._id}`}
                passHref
                className="text-decoration-none"
              >
                <TutorCard
                  photo={tutor.photo || tutor.user?.imageUrl}
                  firstname={tutor.user?.name}
                  title={tutor.title}
                  bio={tutor.bio}
                  qualifications={tutor.qualifications}
                  subjects={tutor.subjects}
                  teachesOnline={tutor.teachesOnline}
                  teachesInPerson={tutor.teachesInPerson}
                  location={
                    tutor.location?.state
                      ? `${tutor.location.state}, ${tutor.location.country}`
                      : tutor.location?.country
                  }
                  ratePerHour={tutor.ratePerHour}
                  rating={tutor.rating}
                  reviews={tutor.reviews}
                />
              </Link>
            </div>
          ))
        ) : (
          <p>
            No tutors found for <strong>{subject}</strong> in{" "}
            <strong>
              {state}, {country}
            </strong>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default StatePage;
