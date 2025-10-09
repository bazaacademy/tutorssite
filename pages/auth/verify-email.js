import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const router = useRouter();
  const { verificationCode } = router.query;

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Manual verify (when user enters code in input)
  async function handleVerify() {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Email verified!");
        setOpenForm(false);
      } else {
        setMessage(data.message || "Verification failed.");
        setOpenForm(true);
      }
    } catch (err) {
      setMessage("Error verifying email");
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Auto verify when coming from link
  useEffect(() => {
    if (!router.isReady || !verificationCode) return;

    setLoading(true);
    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: verificationCode }),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        setMessage(data.message || "Verification failed");
        if (!ok) setOpenForm(true);
      })
      .catch(() => setMessage("Error verifying email"))
      .finally(() => setLoading(false));
  }, [router.isReady, verificationCode]);

  // 🔹 Resend code
  async function resendCode(email) {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("A new verification code has been sent to your email.");
        setOpenForm(false);
      } else {
        setMessage(data.message || "Failed to resend code.");
      }
    } catch (err) {
      setMessage("Error resending code.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container text-center my-5">
      <Head>
        <title>
          Verify Your Email | {process.env.NEXT_PUBLIC_COMPANY_NAME}
        </title>
        <meta
          name="description"
          content="Verify your email address to complete the registration process."
        />
        <style>{`
          input {
            padding: 10px;
            margin: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 250px;
            font-size: 16px;
          }
          button {
            padding: 10px 15px;
            margin: 10px;
            border: none;
            border-radius: 4px;
            background-color: orange;
            color: white;
            font-size: 16px;
            cursor: pointer;
          }
        `}</style>
      </Head>

      <h1>Verify Your Email</h1>

      {/* Manual Code Input */}
      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleVerify}>
        {loading ? "Verifying..." : "Verify"}
      </button>

      {/* Message */}
      {message && <p>{message}</p>}

      {/* Resend Form */}
      {openForm && (
        <div>
          <h2>Resend Verification Code</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={() => resendCode(email)}>
            {loading ? "Resending..." : "Resend Code"}
          </button>
        </div>
      )}

      {/* Login link if verified */}
      {message === "Email verified successfully" ||
      message === "Email already verified" ? (
        <div className="mt-3">
          <Link href="/auth/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      ) : null}
    </div>
  );
}
