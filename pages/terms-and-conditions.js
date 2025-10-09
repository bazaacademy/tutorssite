import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms &amp; Conditions | {process.env.NEXT_PUBLIC_COMPANY_NAME}</title>
        <meta
          name="description"
          content="Review the terms and conditions governing your use of Baxa Academy&apos;s tutoring platform."
        />
      </Head>
      <div className="container my-5">
        <h1 className="mb-4">Terms &amp; Conditions</h1>

        <p>
          Welcome to Baxa Academy! These Terms &amp; Conditions govern your use of
          our website and services. By accessing or using Baxa Academy, you
          agree to comply with and be bound by these terms.
        </p>

        <h4>1. User Eligibility</h4>
        <p>
          To use Baxa Academy, you must be at least 18 years old or have the
          consent of a parent or guardian. You agree to provide accurate and
          complete information during registration and to keep your account
          details up to date.
        </p>

        <h4>2. User Conduct</h4>
        <p>
          You agree to use Baxa Academy for lawful purposes only. You are
          responsible for all activities under your account and must not engage
          in any conduct that may harm, disrupt, or misuse the platform or its
          users.
        </p>

        <h4>3. Tutor and Learner Responsibilities</h4>
        <p>
          Tutors must ensure that they are qualified and capable of delivering
          the lessons they offer. Learners are responsible for selecting
          appropriate tutors and arranging lessons directly with them. Baxa
          Academy does not guarantee any specific learning outcomes.
        </p>

        <h4>4. Payments &amp; Fees</h4>
        <p>
          Both tutors and learners may be required to pay membership or
          transaction fees as outlined on the platform. All payments must be
          made through approved channels, and Baxa Academy is not liable for
          payments made outside the platform.
        </p>

        <h4>5. Cancellations &amp; Refunds</h4>
        <p>
          Cancellation and refund policies vary depending on individual tutor
          agreements. Learners and tutors are encouraged to clearly communicate
          and agree on these terms before scheduling lessons.
        </p>

        <h4>6. Intellectual Property</h4>
        <p>
          All content on Baxa Academy, including text, graphics, logos, and
          software, is the property of Baxa Academy or its licensors. You may
          not copy, modify, distribute, or reproduce any content without
          permission.
        </p>

        <h4>7. Limitation of Liability</h4>
        <p>
          Baxa Academy is not liable for any direct, indirect, or consequential
          damages resulting from your use of the platform. We do not guarantee
          the quality, safety, or legality of services offered by tutors.
        </p>

        <h4>8. Modifications to Terms</h4>
        <p>
          We reserve the right to modify these Terms &amp; Conditions at any time.
          Changes will be effective upon posting on the website. Your continued
          use of Baxa Academy after any updates constitutes acceptance of the
          new terms.
        </p>

        <h4>9. Governing Law</h4>
        <p>
          These Terms &amp; Conditions shall be governed by and construed in
          accordance with the laws of your country of residence.
        </p>

        <h4>10. Contact Us</h4>
        <p>
          If you have any questions or concerns about these Terms &amp; Conditions,
          please contact us at{" "}
          <a href="mailto:support@baxaacademy.com">
            support@baxaacademy.com
          </a>
          .
        </p>

        <p className="mt-4">
          Thank you for choosing Baxa Academy. We look forward to helping you
          achieve your learning goals!
        </p>
        <hr />
        <h4>Attributions</h4>
        <p>
          Some assets used in this website are sourced from various authors and
          platforms. We acknowledge and appreciate their contributions.
        </p>
        <ul>
          <li>
            <div>
              Icons made by{" "}
              <a
                href="https://www.flaticon.com/authors/geotatah"
                title="geotatah"
              >
                geotatah
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
            {/* Repeat similar structure for all other attribution links */}
          </li>
          <li>
            Author 2 - <a href="#">Source</a>
          </li>
          <li>
            Author 3 - <a href="#">Source</a>
          </li>
        </ul>
      </div>
    </>
  );
}
