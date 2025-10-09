import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function CustomRequests() {
  const { data: session, update } = useSession();

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState("");

  // ✅ Only premium tutors can apply
  const canApply =
    session?.user?.role === "tutor" &&
    session?.user?.membership?.status === "premium";

  // ✅ Fetch requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      setLoadingRequests(true);
      setError("");

      try {
        const res = await fetch("/api/student/custom-request");
        if (!res.ok) throw new Error("Failed to fetch requests");

        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Unable to load requests. Please try again later.");
      } finally {
        setLoadingRequests(false);
      }
    };

    fetchRequests();
  }, []);

  // ✅ Handle Apply
  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    setLoadingSubmit(true);
    setFeedback("");

    try {
      const res = await fetch("/api/student/custom-request?action=contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customRequestId: selectedRequest._id,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback("Application submitted successfully ✅");
        setMessage("");
      } else {
        setFeedback(data.message || "Error submitting application ❌");
      }
    } catch (err) {
      console.error(err);
      setFeedback("Something went wrong ❌");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // ✅ Reset message & feedback when opening modal
  const handleOpenModal = (req) => {
    setSelectedRequest(req);
    setMessage("");
    setFeedback("");
  };

  const handleSwitchRole = async () => {
    try {
      const res = await fetch("/api/profile/role", {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok) {
        // ✅ Update session with full user + tutor details
        await update({ user: data.user });
      } else {
        alert(data.message || "Could not switch role.");
      }
    } catch (err) {
      console.error("Error switching role:", err);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Custom Requests</h1>

      {loadingRequests && <p className="text-center">Loading requests...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loadingRequests && requests.length === 0 && !error && (
        <p className="text-center">No custom requests available.</p>
      )}

      <div className="row">
        {requests.map((req) => (
          <div className="col-md-4 mb-4" key={req._id}>
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <Image
                  src={req.user?.imageUrl || "/profileimg.jpg"}
                  alt={req.user?.name || "Profile"}
                  className="border-2 border-warning rounded-circle mb-3"
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
                <strong className="d-block mb-2 fs-5">
                  {req.user?.name || "Unknown name"}
                </strong>

                <h5 className="card-title">{req.title}</h5>
                <p className="card-text">Mode of Lesson: {req.modeOfLesson}</p>
                <p className="card-text">
                  <strong>Budget</strong>: ${req.budget}/hour
                </p>
                <p className="card-text">
                  <strong>Address</strong>: {req.address}
                </p>
                <p className="card-text">{req.description}</p>

                {/* ✅ Always open modal */}
                <button
                  className="btn btn-primary"
                  style={{ backgroundColor: "#f3a90aff", border: "none" }}
                  data-bs-toggle="modal"
                  data-bs-target="#applyModal"
                  onClick={() => handleOpenModal(req)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="applyModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Apply for: {selectedRequest?.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {canApply ? (
                // ✅ Tutor with premium → show form
                <form onSubmit={handleApply}>
                  <div className="mb-3">
                    <label className="form-label">
                      Why are you the best fit?
                    </label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your pitch here..."
                      required
                    ></textarea>
                  </div>

                  {feedback && (
                    <p
                      className={`fw-bold ${
                        feedback.includes("✅")
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {feedback}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-warning"
                    style={{ backgroundColor: "orange", border: "none" }}
                    disabled={loadingSubmit}
                  >
                    {loadingSubmit ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              ) : (
                // ❌ Not allowed → show info & button
                <div className="text-center">
                  {session?.user?.role === "student" ? (
                    <>
                      <p className="fw-bold text-danger">
                        You must be a tutor to apply.
                      </p>
                      <button
                        className="btn btn-warning"
                        onClick={handleSwitchRole}
                      >
                        Switch to Tutor
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="fw-bold text-danger">
                        You must upgrade to Premium to apply.
                      </p>
                      <Link href="/upgrade/membership" className="btn btn-warning">
                        Upgrade to Premium
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
