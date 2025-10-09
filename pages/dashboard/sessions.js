// pages/dashboard/sessions.js
import { useState } from "react";
import { format } from "date-fns";

const dummySessions = [
  {
    id: 1,
    subject: "Mathematics",
    participant: "John Doe",
    role: "Tutor", // can be "Tutor" or "Student"
    date: new Date(2025, 7, 15, 10, 0),
    status: "upcoming",
  },
  {
    id: 2,
    subject: "Physics",
    participant: "Jane Smith",
    role: "Student",
    date: new Date(2025, 6, 25, 14, 0),
    status: "past",
  },
];

export default function SessionsPage() {
  const [tab, setTab] = useState("upcoming");

  const filteredSessions = dummySessions.filter(
    (session) => session.status === tab
  );

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f5f8fb" }}>
      <div className="container py-5">
        {/* Page Title */}
        <h1 className="fw-bold mb-4" style={{ color: "#003366" }}>
          My Sessions
        </h1>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${tab === "upcoming" ? "active" : ""}`}
              onClick={() => setTab("upcoming")}
              style={{ fontWeight: "bold" }}
            >
              Upcoming
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${tab === "past" ? "active" : ""}`}
              onClick={() => setTab("past")}
              style={{ fontWeight: "bold" }}
            >
              Past
            </button>
          </li>
        </ul>

        {/* Session List */}
        {filteredSessions.length === 0 ? (
          <div className="text-muted">
            {tab === "upcoming"
              ? "You have no upcoming sessions."
              : "You have no past sessions."}
          </div>
        ) : (
          <div className="row">
            {filteredSessions.map((session) => (
              <div key={session.id} className="col-md-6 mb-4">
                <div
                  className="card shadow-sm border-0 h-100"
                  style={{
                    borderLeft: `5px solid ${
                      tab === "upcoming" ? "#FFD700" : "#999"
                    }`,
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title mb-2" style={{ color: "#003366" }}>
                      {session.subject}
                    </h5>
                    <p className="mb-1">
                      With: <strong>{session.participant}</strong>
                    </p>
                    <p className="mb-1">
                      Role:{" "}
                      <span className="badge bg-secondary">{session.role}</span>
                    </p>
                    <p className="text-muted small mb-3">
                      {format(session.date, "EEEE, MMM d yyyy, h:mm a")}
                    </p>

                    {/* Actions */}
                    {tab === "upcoming" ? (
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-warning">
                          Join Session
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-sm btn-outline-primary">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
