import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>{`About ${process.env.NEXT_PUBLIC_COMPANY_NAME}`} | Connecting Learners & Tutors</title>
        <meta
          name="description"
          content={`Discover why ${process.env.NEXT_PUBLIC_COMPANY_NAME} is the trusted platform for connecting learners with skilled tutors across various subjects and skills.`}
        />
      </Head>

      <div className="container my-5">
        <h1 className="text-center mb-4">Why {process.env.NEXT_PUBLIC_COMPANY_NAME}?</h1>

        <p className="lead text-center">
          At {process.env.NEXT_PUBLIC_COMPANY_NAME}, we believe that everyone deserves access to quality, personalized learning. We connect learners with skilled, verified tutors to help them achieve their academic, professional, and personal goals.
        </p>

        <hr className="my-5" />

        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h3>Learn Any Skill, Anywhere</h3>
            <p>
              With {process.env.NEXT_PUBLIC_COMPANY_NAME}, you can find tutors for virtually any subject or skill, from languages and academic support to coding, music, and more. Whether you prefer in-person lessons or online sessions, our flexible platform ensures that learning fits into your schedule and lifestyle seamlessly.
            </p>
          </div>
          <div className="col-md-6">
            <Image
              src="/learn-anywhere.jpg"
              alt="Learn anywhere"
              width={600}
              height={400}
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>

        <div className="row align-items-center mb-5 flex-md-row-reverse">
          <div className="col-md-6">
            <h3>Trusted & Verified Tutors</h3>
            <p>
              We carefully verify each tutor on {process.env.NEXT_PUBLIC_COMPANY_NAME} to ensure they have the expertise and passion needed to help you succeed. Our rating and review system also allows you to choose confidently, knowing you’re learning from someone highly recommended by other students.
            </p>
          </div>
          <div className="col-md-6">
            <Image
              src="/trusted-tutors.jpg"
              alt="Trusted tutors"
              width={600}
              height={400}
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h3>Affordable & Transparent Pricing</h3>
            <p>
              With a wide range of tutors and flexible membership plans, you can find lessons that match your budget. At Baxa Academy, there are no hidden fees — what you see is what you pay. We’re committed to making learning both accessible and rewarding.
            </p>
          </div>
          <div className="col-md-6">
            <Image
              src="/affordable-pricing.jpg"
              alt="Affordable pricing"
              width={600}
              height={400}
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>

        <div className="row align-items-center mb-5 flex-md-row-reverse">
          <div className="col-md-6">
            <h3>Support Every Step of the Way</h3>
            <p>
              Our dedicated support team is always ready to help you find the right tutor, schedule lessons, and make the most of your learning experience. We’re here to ensure your journey with Baxa Academy is smooth, enjoyable, and impactful.
            </p>
          </div>
          <div className="col-md-6">
            <Image
              src="/support.jpg"
              alt="Support team"
              width={600}
              height={400}
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>

        <div className="text-center my-5">
          <Link href="/signup" className="btn btn-primary btn-lg">
            Get Started Today
          </Link>
        </div>
      </div>
    </>
  );
}
