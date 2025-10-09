// components/ContactForm.js
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    honey: "", // honeypot field
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Spam check
    if (form.honey) {
      setStatus("spam detected");
      return;
    }

    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", honey: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="container py-5">
      <h2>Contact Support</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="form-control mb-3"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="form-control mb-3"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          className="form-control mb-3"
        />
        {/* Honeypot field (hidden) */}
        <input
          type="text"
          name="honey"
          value={form.honey}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <button type="submit" className="btn btn-warning">
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
      {status === "success" && <p className="text-success mt-3">Message sent!</p>}
      {status === "error" && <p className="text-danger mt-3">Something went wrong.</p>}
      {status === "spam detected" && <p className="text-warning mt-3">Spam detected!</p>}
    </div>
  );
}
