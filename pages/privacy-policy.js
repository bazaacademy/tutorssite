import Head from "next/head";
import Link from "next/link";


export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | {process.env.NEXT_PUBLIC_COMPANY_NAME}</title>
        <meta
          name="description"
          content={`Learn how ${process.env.NEXT_PUBLIC_COMPANY_NAME} collects, uses, and protects your personal information when using our tutoring and learning platform.`}
        />
      </Head>

      <div className="container my-5">
        <h1 className="mb-4">Privacy Policy</h1>

        <p>
          At Baza Academy, we are committed to protecting your personal information and respecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
        </p>

        <h4>1. Information We Collect</h4>
        <p>
          We collect personal information that you provide when registering, booking lessons, communicating with tutors or learners, or using any other part of our platform. This includes your name, email address, phone number, location, profile details, and payment information.
        </p>

        <h4>2. How We Use Your Information</h4>
        <p>
          Your information helps us:
        </p>
        <ul>
          <li>Match you with suitable tutors or learners</li>
          <li>Process payments and manage bookings</li>
          <li>Send you notifications and important updates</li>
          <li>Improve our services and personalize your experience</li>
          <li>Respond to inquiries and provide support</li>
        </ul>

        <h4>3. Information Sharing</h4>
        <p>
          We do not sell or rent your personal information to third parties. We may share your data with:
        </p>
        <ul>
          <li>Service providers who help us operate the platform (e.g., payment processors)</li>
          <li>Law enforcement or regulatory authorities if required by law</li>
        </ul>

        <h4>4. Data Security</h4>
        <p>
          We implement industry-standard security measures to protect your information from unauthorized access, loss, or misuse. However, no method of transmission over the Internet is 100% secure.
        </p>

        <h4>5. Cookies & Tracking</h4>
        <p>
          We use cookies and similar technologies to analyze site usage, remember your preferences, and enhance your experience. You can choose to disable cookies in your browser settings, but some features may not function properly.
        </p>

        <h4>6. Your Choices & Rights</h4>
        <p>
          You can update or delete your personal information at any time by accessing your account settings. You may also unsubscribe from marketing emails by following the instructions in the email.
        </p>

        <h4>7. Children's Privacy</h4>
        <p>
          Baza Academy is not intended for children under 13. We do not knowingly collect personal information from children without parental consent.
        </p>

        <h4>8. Changes to this Policy</h4>
        <p>
          We may update this Privacy Policy occasionally. We will notify you of any significant changes by posting the updated policy on our website or sending you an email.
        </p>

        <h4>9. Contact Us</h4>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at <Link href="mailto:support@bazaacademy.com">support@baxaacademy.com</Link>.
        </p>

        <p className="mt-4">
          Thank you for trusting Baza Academy with your learning journey.
        </p>
      </div>
    </>
  );
}
