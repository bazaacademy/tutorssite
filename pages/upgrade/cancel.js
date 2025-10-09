import Head from "next/head";
import { useRouter } from "next/router";

export default function MembershipCancel() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Membership Upgrade Cancelled | Baza Academy</title>
      </Head>

      <div className="container py-5 text-center">
        <h1 className="fw-bold mb-4 text-danger">⚠️ Upgrade Cancelled</h1>
        <p className="mb-4">You did not complete the membership upgrade process.</p>
        <button
          className="btn btn-warning btn-lg"
          onClick={() => router.push("/api/membership/upgrade-membership")}
        >
          Try Again
        </button>
      </div>
    </>
  );
}
