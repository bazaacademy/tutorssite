import { getSession, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import RequestsPanel from "@/components/RequestsPanel";
import Link from "next/link";

export default function TutorDashboard() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    bio: "",
    subjects: [],
    ratePerHour: 0,
    photo: "",
    qualifications: "",
    experience: "",
    teachesOnline: false,
    teachesInPerson: false,
    location: { country: "", state: "", city: "" },
    abouttheclass: "",
  });
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/tutor/profile");
      if (res.ok) setProfile(await res.json());
    })();
  }, []);

  const updateField = (k, v) => setProfile((prev) => ({ ...prev, [k]: v }));
  const updateLocation = (k, v) =>
    setProfile((prev) => ({
      ...prev,
      location: { ...prev.location, [k]: v },
    }));

  const changeSubject = (i, v) =>
    setProfile((p) => ({
      ...p,
      subjects: p.subjects.map((s, idx) => (idx === i ? v : s)),
    }));
  const addSubject = () =>
    setProfile((p) => ({ ...p, subjects: [...p.subjects, ""] }));
  const removeSubject = (i) =>
    setProfile((p) => ({
      ...p,
      subjects: p.subjects.filter((_, idx) => idx !== i),
    }));

  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "camera", "url"],
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setProfile((prev) => ({
            ...prev,
            photo: result.info.secure_url,
          }));
        }
      }
    );
    widget.open();
  };

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/tutor/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    if (res.ok) {
      alert("Profile updated successfully");
      setShowForm(false);
    }
  };

  if (!session) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ minWidth: 220 }}>
        <h4 className="mb-4" style={{ color: "#FFD700" }}>
          Tutor Panel
        </h4>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" href="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" href="#">
              My Students
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" href="#">
              Sessions
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/upgrade/membership" className="btn btn-warning">
              Upgrade to premium
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link text-white" href="/dashboard">
              Profile
            </Link>
          </li>
          <li className="nav-item mb-2">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="nav-link text-white"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Welcome back, {session.user.name}</h2>
          <div className="d-flex align-items-center">
            <small className="text-muted me-2">
              {session.user.role?.toUpperCase()}
            </small>
            <Image
              src={
                profile.photo ||
                session.user.image ||
                "https://via.placeholder.com/40"
              }
              width={40}
              height={40}
              className="rounded-circle"
              alt="User avatar"
              style={{ objectFit: "cover", border: "2px solid #FFD700" }}
            />
          </div>
        </div>

        {!showForm && (
          <>
            <button
              className="btn btn-warning text-black fw-bold mb-4"
              onClick={() => setShowForm(true)}
            >
              Update Tutor Profile
            </button>
            <h3 className="mb-4" style={{ color: "#FFD700" }}>
              Your Learning Requests Messages
            </h3>
            <RequestsPanel role="tutor" />
          </>
        )}

        {showForm && (
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="mb-3" style={{ color: "#FFD700" }}>
              Update Your Profile
            </h5>

            {/* Profile Image with Cloudinary */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Profile Image</label>
              <button
                type="button"
                className="btn btn-outline-info"
                onClick={openWidget}
              >
                Upload Image
              </button>
              {(profile.photo || session.user.image) && (
                <div className="mt-2">
                  <Image
                    src={profile.photo || session.user.image}
                    width={80}
                    height={80}
                    className="rounded-circle"
                    style={{
                      border: "3px solid #FFD700",
                      objectFit: "cover",
                    }}
                    alt="Tutor profile"
                  />
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Bio</label>
              <textarea
                className="form-control"
                rows={3}
                value={profile.bio || ""}
                onChange={(e) => updateField("bio", e.target.value)}
              />
            </div>

            {/* Qualifications */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Qualifications</label>
              <input
                className="form-control"
                value={profile.qualifications || ""}
                onChange={(e) => updateField("qualifications", e.target.value)}
                placeholder="B.Sc in Mathematics"
              />
            </div>

            {/* Experience */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Experience</label>
              <input
                className="form-control"
                value={profile.experience || ""}
                onChange={(e) => updateField("experience", e.target.value)}
                placeholder="5 years tutoring high school students"
              />
            </div>

            {/* Subjects */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Subjects</label>
              {(profile.subjects || []).map((s, i) => (
                <div key={i} className="d-flex mb-2">
                  <input
                    className="form-control me-2"
                    value={s}
                    onChange={(e) => changeSubject(i, e.target.value)}
                    placeholder="e.g. Math"
                  />
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => removeSubject(i)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-warning text-black"
                onClick={addSubject}
              >
                + Add Subject
              </button>
            </div>

            {/* Rate */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Rate ($/hour)</label>
              <input
                type="number"
                className="form-control"
                value={profile.ratePerHour || 0}
                onChange={(e) =>
                  updateField("ratePerHour", Number(e.target.value))
                }
              />
            </div>

            {/* Teaching Modes */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Teaching Mode</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={profile.teachesOnline}
                  onChange={(e) =>
                    updateField("teachesOnline", e.target.checked)
                  }
                  id="teachesOnline"
                />
                <label className="form-check-label" htmlFor="teachesOnline">
                  Teaches Online
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={profile.teachesInPerson}
                  onChange={(e) =>
                    updateField("teachesInPerson", e.target.checked)
                  }
                  id="teachesInPerson"
                />
                <label className="form-check-label" htmlFor="teachesInPerson">
                  Teaches In Person
                </label>
              </div>
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Location</label>
              <input
                className="form-control mb-2"
                placeholder="Country"
                value={profile.location?.country || ""}
                onChange={(e) => updateLocation("country", e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="State"
                value={profile.location?.state || ""}
                onChange={(e) => updateLocation("state", e.target.value)}
              />
              <input
                className="form-control"
                placeholder="City"
                value={profile.location?.city || ""}
                onChange={(e) => updateLocation("city", e.target.value)}
              />
            </div>

            {/* About the Class */}
            <div className="mb-3">
              <label className="form-label fw-semibold">About the Class</label>
              <textarea
                className="form-control"
                rows={3}
                value={profile.abouttheclass || ""}
                onChange={(e) => updateField("abouttheclass", e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-dark text-warning fw-bold"
                onClick={save}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session)
    return { redirect: { destination: "/auth/login", permanent: false } };
  if (session.user.role !== "tutor")
    return { redirect: { destination: "/dashboard/student", permanent: false } };
  return { props: {} };
}