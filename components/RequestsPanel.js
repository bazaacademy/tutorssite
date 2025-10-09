"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function RequestsPanel({ role }) {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/tutor/booking/request", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          setRequests(data);
        }
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [session]);

  const handleUpdate = async (id, status) => {
    try {
      await fetch(`/api/tutor/booking/request?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      // refresh list after update
      const res = await fetch("/api/tutor/booking/request");
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  if (loading) return <p>Loading your learning requests...</p>;
  if (!requests.length) return <p>No requests found.</p>;

  return (
    <div className="card shadow-sm p-3 mb-4">
      <h5 className="fw-bold mb-3">Lesson Requests</h5>
      {requests.map((req) => {
        const isTutor = req.tutor?._id === session.user.id;
        const isStudent = req.student?._id === session.user.id;

        if ((role === "tutor" && !isTutor) || (role === "student" && !isStudent)) {
          return null;
        }

        return (
          <div
            key={req._id}
            className="border rounded p-3 mb-2 bg-white shadow-sm"
          >
            {isTutor ? (
              <>
                <strong>{req.student?.name}</strong> wants to learn from you:
                <p className="mb-1">{req.message}</p>
                <small>Status: {req.status}</small>

                {req.status === "pending" && (
                  <div className="mt-2">
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUpdate(req._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleUpdate(req._id, "declined")}
                    >
                      Decline
                    </button>
                  </div>
                )}

                {req.status === "accepted" && (
                  <div className="mt-2">
                    <p><strong>Student Contact:</strong></p>
                    <p>Email: {req.student?.email}</p>
                    <p>Phone: {req.student?.phone}</p>
                  </div>
                )}

                {req.status === "declined" && (
                  <p className="text-danger mt-2">❌ You declined this request.</p>
                )}
              </>
            ) : (
              <>
                You requested <strong>{req.tutor?.user?.name}</strong>
                <p className="mb-1">{req.message}</p>
                <small>Status: {req.status}</small>

                {req.status === "accepted" && (
                  <div className="mt-2">
                    <p><strong>Tutor Contact:</strong></p>
                    <p>Email: {req.tutor?.email}</p>
                    <p>Phone: {req.tutor?.phone}</p>
                  </div>
                )}

                {req.status === "declined" && (
                  <p className="text-danger mt-2">❌ Your request was declined.</p>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
