// pages/dashboard/profile.js
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    phone: session?.user?.phone || "",
    location: session?.user?.location || "",
    imageUrl: session?.user?.imageUrl || session?.user?.image || "",
    role: session?.user?.role || "student", // 🔹 added role to state
  });
  const [loading, setLoading] = useState(false);

  if (!session) return <div className="text-center p-5">Loading...</div>;
  const user = session.user;

  // Handle Cloudinary upload
  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        
        sources: ["local", "camera", "url"],
      },
      (error, result) => {

        if (!error && result.event === "success") {
          setFormData((prev) => ({
            ...prev,
            imageUrl: result.info.secure_url,
          }));
        }
      }
    );
    widget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setLoading(false);

      if (res.ok) {
        await update(); // refresh session with updated user
        setShowForm(false);

        // 🔹 Redirect user to the correct dashboard if role changed
        if (formData.role === "student") {
          router.push("/dashboard/student");
        } else {
          router.push("/dashboard/tutor");
        }
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ minHeight: "100vh" }}>
      <h1 className="mb-4">My Profile</h1>

      {/* Profile Summary Card */}
      <div className="card shadow-sm p-4 mb-4">
        <div className="d-flex align-items-center">
          <Image
            src={user.imageUrl || user.image || "/images/default-avatar.png"}
            width={100}
            height={100}
            className="rounded-circle me-4"
            alt="User avatar"
          />
          <div>
            <h3>{user.name}</h3>
            <p className="mb-1">{user.email}</p>
            <p className="mb-0">
              Role: <strong>{user.role}</strong>
            </p>
          </div>
        </div>

        <div className="mt-3">
          {user.role === "student" && (
            <Link
              href="/dashboard/student"
              className="btn btn-outline-warning me-2"
            >
              Go to Student Dashboard
            </Link>
          )}
          {user.role === "tutor" && (
            <Link
              href="/dashboard/tutor"
              className="btn btn-outline-success me-2"
            >
              Go to Tutor Dashboard
            </Link>
          )}
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="btn btn-outline-secondary"
          >
            {showForm ? "Cancel" : "Update Profile"}
          </button>
        </div>
      </div>

      {/* Profile Update Form */}
      {showForm && (
        <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          {/* 🔹 Role Selector */}
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Profile Image</label>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={openWidget}
            >
              Upload Image
            </button>
            {formData.imageUrl && (
              <div className="mt-2">
                <Image
                  src={formData.imageUrl}
                  alt="Uploaded"
                  width={100}
                  height={100}
                  className="rounded"
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session)
    return {
      redirect: { destination: "/auth/login", permanent: false },
    };
  return { props: {} };
}
// Note: Ensure Cloudinary script is included in _app.js or the main layout
// as shown in the comparison snippet below.
// This is required for the Cloudinary upload widget to function properly.
// Compare this snippet from pages/_app.js:
// pages/_app.js