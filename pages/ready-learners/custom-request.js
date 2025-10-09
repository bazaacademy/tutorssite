import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

export default function CustomRequestPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modeOfLesson, setModeOfLesson] = useState("");
  const [address, setAddress] = useState("");
  const [budget, setBudget] = useState(5); // Default budget
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle loading state of session
  if (status === "loading") {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Checking your session...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/student/custom-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, modeOfLesson, address, budget }),
        credentials: "include", // ✅ ensures session cookies are sent
      });

      // ✅ Fixed: correctly check both 401 and 404
      if (res.status === 401 || res.status === 404) {
        setShowLoginModal(true);
        setLoading(false);
        return;
      }

      if (res.status === 403) {
        setShowMembershipModal(true);
        setLoading(false);
        return;
      }

      if (res.ok) {
        alert("✅ Custom request created successfully!");
        router.push("/dashboard");
      } else {
        const data = await res.json();
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5">
      <h1 className="mb-4 text-center">Create Custom Learning Request</h1>

      {!session ? (
        <div className="alert alert-warning text-center">
          You must log in before making a request.
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Request Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter request title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          {/* Mode of Lesson */}
          <Form.Group className="mb-3">
            <Form.Label>Mode of Lesson</Form.Label>
            <div>
              <Form.Check
                type="radio"
                id="online"
                label="Online (Web Cam)"
                value="online(web cam)"
                checked={modeOfLesson === "online(web cam)"}
                onChange={(e) => setModeOfLesson(e.target.value)}
              />
              <Form.Check
                type="radio"
                id="offline"
                label="Offline (In-Person)"
                value="offline(in-person)"
                checked={modeOfLesson === "offline(in-person)"}
                onChange={(e) => setModeOfLesson(e.target.value)}
              />
            </div>
          </Form.Group>
           {/* Budget */}
          <Form.Group className="mb-3">
            <Form.Label>Learning Needs</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Describe your learning needs..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Set your budget($)/hour</Form.Label>
            <Form.Control
              type="number"
              min={3}
              step={0.5}
              max={20}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </Form.Group>

          {/* Address */}
          <Form.Group className="mb-3">
            <Form.Label>Physical Address (if offline)</Form.Label>
            <Form.Control
              type="text"
              placeholder="9053 Elizabeth Ave.Petawawa, ON K8H 2S2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required={modeOfLesson === "offline(in-person)"} // ✅ only required if offline
            />
          </Form.Group>

          <Button variant="warning" type="submit" className="w-100" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </Form>
      )}

      {/* Login Modal */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must log in before making a request.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={() => router.push("/auth/login")}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Membership Modal */}
      <Modal
        show={showMembershipModal}
        onHide={() => setShowMembershipModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Premium Membership Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Upgrade to premium to create a custom learning request.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowMembershipModal(false)}
          >
            Cancel
          </Button>
          <Button variant="warning" onClick={() => router.push("/upgrade/membership")}>
            View Plans
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
