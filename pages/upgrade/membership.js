import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function UpgradeMembership() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!session) {
      alert("You need to be signed in to upgrade your membership.");
      setTimeout(() => router.push("/auth/login"), 1500);
      return;
    }

    setLoading(true);

    const res = await fetch("/api/membership/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        role: session.user.role,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // Redirect directly to Stripe Checkout
    } else {
      setLoading(false);
      alert("Error creating checkout session.");
    }
  };

  return (
    <>
      <Head>
        <title>Upgrade Membership | {process.env.NEXT_PUBLIC_COMPANY_NAME}</title>
      </Head>

      <div className="container py-5">
        <h1 className="text-center mb-4 fw-bold">Upgrade Your Membership</h1>
        <p className="text-center text-muted mb-3">
          Unlock premium features for both Tutors and Students with a single plan.
        </p>

        <div className="row g-4 justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h3 className="text-center mb-4">Premium Benefits</h3>
                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item">✔️ Access dedicated support from the platform</li>
                  <li className="list-group-item">✔️ Priority tutor-student matching</li>
                  <li className="list-group-item">✔️ Send custom requests to ready learners</li>
                  <li className="list-group-item">✔️ Post custom learning needs so tutors can bid</li>
                  <li className="list-group-item">✔️ Enhanced visibility on platform</li>
                  <li className="list-group-item">✔️ Secure transactions and support</li>
                </ul>

                <div className="text-center">
                  <h2 className="fw-bold mb-3">$10 / month</h2>
                  <button
                    className="btn btn-warning btn-lg px-5"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? "Redirecting..." : "Upgrade Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
