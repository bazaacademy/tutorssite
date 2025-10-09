import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function MembershipSuccess() {
  const router = useRouter();
  const { update } = useSession(); // <-- get the update() method
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateMembership = async () => {
      try {
        // Call API to update user membership in DB
        const res = await fetch("/api/membership/update-membership", { method: "POST" });

        if (res.ok) {
          console.log("✅ Membership upgraded successfully");

          // 🔄 Refresh NextAuth session so it reflects `premium` immediately
          await update();
        } else {
          console.error("❌ Failed to upgrade membership");
        }
      } catch (err) {
        console.error("⚠️ Error upgrading membership:", err);
      } finally {
        setLoading(false);
      }
    };

    updateMembership();
  }, [update]);

  return (
    <>
      <Head>
        <title>Membership Upgraded | {process.env.NEXT_PUBLIC_COMPANY_NAME}</title>
      </Head>

      <div className="container py-5 text-center">
        {loading ? (
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <h1 className="fw-bold mb-4 text-success">🎉 Membership Upgraded!</h1>
            <p className="mb-4">You now have access to all premium features.</p>
            <button
              className="btn btn-warning btn-lg"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </>
  );
}
