"use client"; // if you're using Next.js 13 app router

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TutorCard from "@/components/TutorCard";
import Link from "next/link";

// Slugify utility
const slugify = (text) =>
  text?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

const CityPage = () => {
  const router = useRouter();
  const { subject, country, state, city } = router.query;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subject && country && state && city) {
      const fetchTutors = async () => {
        try {
          const res = await fetch(
            `/api/tutors/location?subject=${subject}&country=${country}&state=${state}&city=${city}`
          );
          const data = await res.json();
          setTutors(data);
        } catch (error) {
          console.error("Error fetching tutors:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTutors();
    }
  }, [subject, country, state, city]);

  if (loading) {
    return <p className="container my-5">Loading tutors...</p>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-capitalize">
        {subject?.replace(/-/g, " ")} Tutors in {city?.replace(/-/g, " ")},{" "}
        {state?.replace(/-/g, " ")}, {country?.replace(/-/g, " ")}
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
                    tutor.location?.city
                      ? `${tutor.location.city}, ${tutor.location.country}`
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
            No tutors found for <strong>{subject?.replace(/-/g, " ")}</strong>{" "}
            in{" "}
            <strong>
              {city?.replace(/-/g, " ")}, {state?.replace(/-/g, " ")},{" "}
              {country?.replace(/-/g, " ")}
            </strong>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default CityPage;
