import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res.ok) {
      // Fetch session to get role
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();
      const userRole = sessionData?.user?.role;

      if (userRole === "tutor") {
        router.push("/dashboard/tutor");
      } else if (userRole === "student") {
        router.push("/dashboard/student");
      } else {
        router.push("/");
      }
    } else if (res.error === "Please verify your email. A verification code has been sent") {
      setError("Please verify your email. A verification code has been sent.");
    } else {
      setError("Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger">
            {error}
            {error.includes("verify your email") && (
              <div className="mt-2">
                <Link href={`/auth/verify-email?email=${form.email}`} className="alert-link">
                  Click here to verify your email
                </Link>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="on">
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Enter password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 mt-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Remember + Forgot */}
          <div className="mb-3 form-check d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              />
              <label className="form-check-label ms-2" htmlFor="remember">
                Remember me
              </label>
            </div>
            <Link href="/auth/forgot-password" className="text-decoration-none small">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-warning w-100" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
