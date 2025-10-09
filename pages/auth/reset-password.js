// pages/auth/reset-password.js
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token, email } = router.query;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirm) {
      return setMessage({ type: "error", text: "Passwords do not match." });
    }

    try {
      const res = await axios.post("/api/auth/reset-password", {
        token,
        email,
        password,
      });
      setMessage({ type: "success", text: res.data.message });
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Error resetting password.",
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Reset Password</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit" className="btn btn-success w-100">Reset Password</button>
        {message && (
          <div className={`alert mt-3 alert-${message.type === "success" ? "success" : "danger"}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
