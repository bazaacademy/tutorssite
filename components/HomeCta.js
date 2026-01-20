import Image from "next/image";
import Link from "next/link";

export default function TutorCTA() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4">

          {/* Find Tutors */}
          <div className="col-12 col-lg-6">
            <div className="h-100 border rounded-4 p-4 p-lg-5 d-flex flex-column justify-content-between">
              <div>
                <div className="mb-4 rounded-3 overflow-hidden">
                  <Image
                    src="/findtutorimg.jpg"
                    alt="Find a tutor"
                    width={600}   // adjust as needed
                    height={300}  // adjust as needed
                    className=" rounded"
                  />
                </div>

                <h3 className="fw-bold mb-2">Find Tutors</h3>
                <p className="text-muted">
                  Connect with experienced tutors to help you learn faster,
                  build skills, and achieve your academic or career goals.
                </p>
              </div>

              <Link href="/tutorials" className="btn btn-warning mt-3">
                Find a Tutor
              </Link>
            </div>
          </div>

          {/* Become a Tutor */}
          <div className="col-12 col-lg-6">
            <div className="h-100 border rounded-4 p-4 p-lg-5 d-flex flex-column justify-content-between">
              <div>
                <div className="mb-4 rounded-3 overflow-hidden">
                  <Image
                    src="/learn-anywhere.jpg"
                    alt="Become a tutor"
                    width={600}   // adjust as needed
                    height={300}  // adjust as needed
                    className=" rounded"
                  />
                </div>

                <h3 className="fw-bold mb-2">Become a Tutor</h3>
                <p className="text-muted">
                  Share your knowledge, earn income, and teach students
                  from anywhere by joining our growing tutor community.
                </p>
              </div>

              <Link href="/auth/signup" className="btn btn-outline-warning mt-3">
                Become a Tutor
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
