// pages/tutors/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

const TutorProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch tutor data by ID
  useEffect(() => {
    if (!id) return;

    const fetchTutor = async () => {
      try {
        const res = await fetch(`/api/tutors/${id}`);
        if (!res.ok) throw new Error("Failed to fetch tutor");
        const data = await res.json();
        setTutor(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading tutor profile...</p>;
  if (!tutor) return <p className="text-center mt-5">Tutor not found.</p>;

  // Format location safely
  const formattedLocation = [
    tutor.location?.city,
    tutor.location?.state,
    tutor.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <Head>
        <title>{tutor.user?.name} | Tutor Profile</title>
        <meta
          name="description"
          content={`Learn from ${tutor.user?.name}, ${tutor.title}. Rated ${tutor.rating} stars.`}
        />
      </Head>

      <div className="container py-5">
        <div className="row g-5">
          {/* Left Column */}
          <div className="col-md-4 text-center">
            <Image
              src={tutor.user?.imageUrl || tutor?.photo }
              alt={tutor.user?.name}
              width={300}
              height={300}
              className=" img-fluid shadow-sm"
              style={{borderRadius: "20px"}}
            />
            <h2 className="mt-3">{tutor.user?.name}</h2>
            <p className="text-muted">
              {formattedLocation || "Location not provided"}
            </p>
            <p>
              <strong>Title:</strong> {tutor.title}
            </p>
            <p>
              <strong>Subjects:</strong> {tutor.subjects?.join(", ")}
            </p>
            <p>
              <strong>Rating:</strong> {tutor.rating || "No ratings yet"} ⭐
            </p>
            <p>
              <strong>Hourly Rate:</strong> ₦
              {tutor.ratePerHour?.toLocaleString()}
            </p>
            <p>
              <strong>Available for:</strong>{" "}
              {tutor.teachesInPerson && "In-person"}
              {tutor.teachesInPerson && tutor.teachesOnline && " & "}
              {tutor.teachesOnline && "Online"} Lessons
            </p>

            {/* ✅ Contact Tutor button */}
            <button
              className="btn btn-warning mt-3 w-100"
              onClick={async () => {
                if (!tutor.user?._id) {
                  alert("This tutor profile is missing a linked user account.");
                  return;
                }

                const message = prompt(
                  "Tell the tutor what you need help with:"
                );
                if (!message) return;

                const res = await fetch("/api/tutor/booking/request", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    tutorId: tutor.user._id, // ✅ send User ID, not TutorProfile ID
                    message,
                  }),
                });

                if (res.ok) {
                  alert(
                    "Request sent! Tutor must accept before you can exchange contacts."
                  );
                } else {
                  const err = await res.json();
                  alert(err.message || "Failed to send request");
                }
              }}
            >
              Contact Tutor
            </button>
          </div>

          {/* Right Column */}
          <div className="col-md-8">
            {/* About */}
            <section className="mb-4">
              <h3>About {tutor.user?.name}</h3>
              <p>{tutor.bio}</p>
            </section>

            {/* Class Style */}
            <section className="mb-4">
              <h4>About the Class</h4>
              <p>{tutor.abouttheclass}</p>
            </section>

            {/* Experience */}
            <section className="mb-4">
              <h4>Experience</h4>
              <p>{tutor.experience}</p>
            </section>

            {/* Qualifications */}
            <section className="mb-4">
              <h4>Qualifications</h4>
              <p>{tutor.qualifications}</p>
            </section>

            {/* Reviews */}
            <section className="mb-4">
              <h4>Student Reviews</h4>
              <div>
                {tutor.reviews?.length > 0 ? (
                  tutor.reviews.map((review, i) => (
                    <div
                      key={i}
                      className="border p-3 mb-3 rounded shadow-sm"
                    >
                      <strong>{review.user?.name || "Anonymous"}</strong>
                      <p className="mb-1">{review.comment}</p>
                      <small className="text-muted">
                        Rated: {"⭐".repeat(review.rating)}
                      </small>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet. Be the first to book a session!</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorProfile;
