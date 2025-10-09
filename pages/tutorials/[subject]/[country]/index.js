import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TutorCard from "@/components/TutorCard";
import Link from "next/link";

const CountryPage = () => {
  const router = useRouter();
  const { subject, country } = router.query;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    if (subject && country) {
      fetchTutors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, country]);

  const fetchTutors = () => {
    setLoading(true);
    let url = `/api/tutors/location?subject=${subject}&country=${country}`;
    if (stateFilter) url += `&state=${stateFilter}`;
    if (cityFilter) url += `&city=${cityFilter}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  if (loading) return <p className="container">Loading...</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-capitalize">
        {subject?.replace(/-/g, " ")} Tutors in {country?.replace(/-/g, " ")}
      </h2>

      {/* Filter Section */}
      <div className="mb-4 row g-2">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Enter state"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Enter city"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <button
            onClick={fetchTutors}
            className="btn btn-primary w-100"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Tutors List */}
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
                      ? `${tutor.location.city}, ${tutor.location.state}`
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
            <strong>{country}</strong>.
          </p>
        )}
      </div>
    </div>
  );
};

export default CountryPage;
