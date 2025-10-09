import Link from "next/link";
import Image from "next/image";

const featuredSubjects = [
  {
    subject: "english",
    title: "Master English for global communication & exams",
    image: "/tutor5.jpg",
  },
  {
    subject: "mathematics",
    title: "Strengthen your math for tech, finance & research",
    image: "/tutor3.jpg",
  },
  {
    subject: "chinese",
    title: "Learn Chinese to expand your business & travel",
    image: "/tutor1.jpg",
  },
  {
    subject: "computer-science",
    title: "Start coding, build apps, or explore AI & data",
    image: "/tutor8.jpg",
  },
  {
    subject: "business",
    title: "Grow your business and master digital marketing",
    image: "/tutor6.jpg",
  },
  {
    subject: "data-analysis",
    title: "Analyze data to boost your career opportunities",
    image: "/tutor2.jpg",
  },
  {
    subject: "design",
    title: "Unleash your creativity: graphic design & UI/UX",
    image: "/tutor4.jpg",
  },
  {
    subject: "public-speaking",
    title: "Become a confident speaker & communicator",
    image: "/tutor7.jpg",
  },
  {
    subject: "personal-development",
    title: "Upgrade your mindset & achieve your goals faster",
    image: "/tutor3.jpg",
  },
];

const FeaturedTutors = ({ userCountry }) => {
  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center fs-2">🌟 Featured Tutorials</h3>
      <div className="row">
        {featuredSubjects.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <Link
              href={`/tutorials/${item.subject}/${userCountry}`}
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm">
                <Image
                  src={item.image}
                  alt={item.subject}
                  width={300}
                  height={200}
                  className="card-img-top"
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title">{item.subject.replace("-", " ").toUpperCase()}</h6>
                  <p className="card-text" style={{ fontSize: "0.9rem" }}>
                    {item.title}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTutors;

