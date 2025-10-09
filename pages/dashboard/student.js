import { getSession, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import RequestsPanel from "@/components/RequestsPanel";
import Link from "next/link";

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState(null);
  const [customContactMessages, setCustomContactMessages] = useState([]);

  console.log(data, "<=== student dashboard data");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/student/dashboard");
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to load student dashboard");
        }
        const json = await res.json();

        // ✅ Ensure arrays exist even if API doesn’t return them
        setData({
          ...json,
          upcomingSessions: json.upcomingSessions || [],
          connectedTutors: json.connectedTutors || [],
          notifications: json.notifications || [],
        });
      } catch (e) {
        console.error("Student dashboard fetch error:", e.message);
        setData({
          error: e.message,
          upcomingSessions: [],
          connectedTutors: [],
          notifications: [],
        });
      }
    })();
  }, []);

  useEffect(() => {
    const customContact = async () => {
      const res = await fetch("/api/student/custom-requests/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          method: "GET",
          credentials: "include",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCustomContactMessages(data);
      }
    };
    customContact();
  }, []);

  if (!data) return <div className="text-center mt-5 mb-5">Loading...</div>;

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Sidebar */}

      <aside
        style={{ background: "#000", color: "#fff", width: 280 }}
        className="p-3"
      >
        <div className="text-center mb-4">
          <Image
            src={data.image || "/profileimg.jpg"}
            className="rounded-circle border border-3"
            width={100}
            height={100}
            alt="User Avatar"
          />
          <h4 className="mt-3">{data.name}</h4>
          <p className="small opacity-75">{data.email}</p>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link href="/dashboard/student" className="nav-link text-white">
              Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/dashboard" className="nav-link text-white">
              Update Profile
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              href="/dashboard/student/tutors"
              className="nav-link text-white"
            >
              My Tutors
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              href="/dashboard/student/sessions"
              className="nav-link text-white"
            >
              Sessions
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              href="/ready-learners/custom-request"
              className="nav-link text-white"
            >
              Create Custom Requests
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              href="/upgrade/membership"
              className="nav-link bg-warning text-white"
            >
              Update Membership
            </Link>
          </li>

          <li className="nav-item mt-3">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="nav-link text-white"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-grow-1 p-4">
        <h1 className="mb-4 fw-bold" style={{ color: "#000" }}>
          Welcome back, {data.name}!
        </h1>

        {/* Upcoming Sessions */}
        <section className="mb-5">
          <h2 className="mb-4" style={{ color: "#FFD700" }}>
            Your Learning Requests
          </h2>
          <RequestsPanel role="student" />
          <h3 className="mb-3">Upcoming Sessions</h3>
          {!data.upcomingSessions || data.upcomingSessions.length === 0 ? (
            <p>
              No upcoming sessions.{" "}
              <Link href="/countries" style={{ color: "#FFD700" }}>
                Book a tutor from <strong>location of your choice</strong>.
              </Link>
              .
            </p>
          ) : (
            <div className="list-group shadow-sm rounded">
              {data.upcomingSessions.map((s) => (
                <div
                  key={s.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{
                    borderLeft: "4px solid #FFD700",
                    background: "#F9F9F9",
                  }}
                >
                  <div>
                    <strong>{s.subject}</strong> with <strong>{s.tutor}</strong>
                    <br />
                    <small style={{ color: "#808080" }}>{s.date}</small>
                  </div>
                  <button
                    className="btn btn-sm"
                    style={{
                      borderColor: "#000",
                      color: "#000",
                      background: "#FFD700",
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
        <h2 className="mb-4" style={{ color: "#FFD700" }}>
          Tutor Applications for Your Custom Requests
        </h2>
        {customContactMessages.length === 0 ? (
          <p>No tutors have applied yet.</p>
        ) : (
          customContactMessages.map((m) => (
            <div
              key={m._id}
              className="border rounded-lg p-4 mb-3 shadow-sm bg-white"
            >
              <h2 className="font-semibold">{m.customRequestId.title}</h2>
              <p className="text-sm text-gray-600">
                {m.customRequestId.description}
              </p>
              <p className="mt-2">
                <strong>Budget:</strong> ${m.customRequestId.budget}
              </p>
              <hr className="my-2" />
              <p>
                <strong>From Tutor:</strong> {m.tutor.name} ({m.tutor.email})
              </p>
              <p className="italic text-gray-700 mt-1">{m.message}</p>
            </div>
          ))
        )}

        {/* Tutors */}
        <section className="mb-5">
          <h3 className="mb-3">Your Tutors</h3>
          {!data.connectedTutors || data.connectedTutors.length === 0 ? (
            <p>
              You have not connected with any tutors yet.{" "}
              <Link href="/tutorials" style={{ color: "#FFD700" }}>
                Find tutors
              </Link>
              .
            </p>
          ) : (
            <div className="row">
              {data.connectedTutors.map((t) => (
                <div key={t.id} className="col-md-4 mb-3">
                  <div className="card shadow-sm border-0">
                    <Image
                      src={t.avatar || "/images/default-avatar.png"}
                      className="card-img-top"
                      style={{ height: 180, objectFit: "cover" }}
                      width={180}
                      height={180}
                      alt="profile image"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{t.name}</h5>
                      <p className="card-text" style={{ color: "#808080" }}>
                        Subjects: {t.subjects?.join(", ") || "N/A"}
                      </p>
                      <Link
                        href={`/tutors/${t.id}`} // ✅ now TutorProfile ID
                        className="btn w-100"
                        style={{ background: "#000", color: "#FFD700" }}
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Notifications */}
        <section>
          <h3 className="mb-3">Notifications</h3>
          {!data.notifications || data.notifications.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            <ul className="list-group shadow-sm">
              {data.notifications.map((n) => (
                <li
                  key={n.id}
                  className="list-group-item"
                  style={{
                    borderLeft: "4px solid #FFD700",
                    background: "#F9F9F9",
                  }}
                >
                  {n.message}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session)
    return { redirect: { destination: "/auth/login", permanent: false } };
  if (session.user.role !== "student")
    return { redirect: { destination: "/dashboard/tutor", permanent: false } };
  return { props: {} };
}

