// pages/countries/[country].js
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import React from "react";

// Mock authentication + membership (replace with your real auth context)
const useAuth = () => {
  return {
    isLoggedIn: false, // change to true if logged in
    hasFreeTrialUsed: true, // change based on user data
  };
};

const featuredSubjects = {
  nigeria: [
    "Maths", "English", "Physics", "Chemistry", "Biology", "Coding", "Web Development",
    "UI/UX Design", "Public Speaking", "Digital Marketing", "SEO", "Graphics Design",
    "Photography", "Videography", "Music", "Dance", "Accounting", "Economics",
    "IELTS", "TOEFL", "SAT Prep", "Project Management", "Entrepreneurship",
    "Data Analysis", "Python Programming", "Mobile App Development", "Fashion Design",
    "Cooking", "Hair Styling", "Makeup Artistry", "Football Training"
  ],
  "united-states": [
    "Coding", "SAT Prep", "Music", "Dance", "Acting", "Film Production", "AI & Machine Learning",
    "Cybersecurity", "Business Management", "Finance", "Stock Trading", "Photography",
    "Creative Writing", "Digital Marketing", "Social Media Management", "Fitness Training",
    "Yoga", "Meditation", "Nutrition", "Public Speaking", "Law", "Medicine Prep",
    "Nursing", "Psychology", "Content Creation", "Podcasting", "E-commerce",
    "Blockchain", "Data Science", "Game Development", "Cloud Computing"
  ],
  uk: [
    "Maths", "Law", "Accounting", "Engineering", "Coding", "Data Science", "English Literature",
    "History", "Economics", "Business Management", "Project Management", "Marketing",
    "Design Thinking", "Architecture", "Medicine Prep", "Dentistry Prep", "Philosophy",
    "Public Speaking", "IELTS", "TOEFL", "SAT Prep", "AI & Robotics", "Ethical Hacking",
    "Creative Writing", "Poetry", "Music", "Dance", "Football Training", "Cricket",
    "Fashion Design"
  ],
  canada: [
    "French", "Coding", "Design", "Maths", "Biology", "Chemistry", "Physics",
    "Nursing Prep", "Public Health", "Psychology", "Law", "Finance", "Business",
    "Digital Marketing", "Photography", "Videography", "Creative Writing", "Art",
    "Music", "Dance", "Ice Hockey", "Skiing", "Project Management", "Data Science",
    "Game Development", "Mobile Apps", "UI/UX", "Cooking", "Nutrition",
    "Fitness Training", "Entrepreneurship"
  ],
  france: [
    "Philosophy", "French Literature", "Cooking", "Wine Studies", "Fashion Design",
    "Art", "History", "Architecture", "Coding", "Robotics", "Mathematics",
    "Biology", "Chemistry", "Physics", "Economics", "Business", "Digital Marketing",
    "Music", "Dance", "Theatre", "Film Studies", "Photography", "Fine Arts",
    "Creative Writing", "Law", "Medicine Prep", "Psychology", "Sociology",
    "Entrepreneurship", "Tourism Management"
  ],
  india: [
    "Physics", "Chemistry", "Engineering", "Maths", "Biology", "Medicine Prep",
    "Coding", "Mobile Apps", "Data Science", "Artificial Intelligence", "Robotics",
    "Public Speaking", "Business Studies", "Economics", "Law", "History",
    "Geography", "Sanskrit", "Hindi Language", "English", "TOEFL", "IELTS",
    "Design", "Graphics", "Animation", "Bollywood Dance", "Yoga", "Meditation",
    "Ayurveda", "Cooking", "Cricket Training"
  ],
  germany: [
    "German Language", "Engineering", "Music", "Maths", "Physics", "Chemistry",
    "Biology", "Philosophy", "Law", "Business", "Automobile Engineering",
    "Mechanical Engineering", "Coding", "Cybersecurity", "Data Analysis",
    "AI & Robotics", "Architecture", "History", "Geography", "Art",
    "Creative Writing", "Photography", "Film Studies", "Economics",
    "Project Management", "Public Speaking", "Medicine Prep", "Nursing",
    "Psychology", "Tourism", "Sociology"
  ],
  australia: [
    "Sports", "English", "Science", "Maths", "Coding", "Marine Biology",
    "Environmental Science", "Business Management", "Economics", "Law",
    "Public Speaking", "Art", "Photography", "Videography", "Music",
    "Dance", "Fitness Training", "Yoga", "Surfing", "Cricket",
    "Football", "Rugby", "Psychology", "Tourism", "Data Science",
    "Game Development", "Entrepreneurship", "Marketing", "UI/UX",
    "Cooking"
  ],
  kenya: [
    "Agriculture", "Biology", "Maths", "Physics", "Chemistry", "Coding",
    "Mobile Apps", "Web Development", "Data Science", "Digital Marketing",
    "Entrepreneurship", "Business Studies", "Economics", "Public Speaking",
    "Law", "Medicine Prep", "Nursing", "Environmental Science", "Wildlife Management",
    "Photography", "Videography", "Dance", "Music", "Art", "Fashion Design",
    "Cooking", "Hair Styling", "Makeup Artistry", "Football Training",
    "Athletics", "Tourism"
  ],
  ghana: [
    "Dance", "Economics", "ICT", "Maths", "Physics", "Chemistry", "Biology",
    "Coding", "Mobile Apps", "Entrepreneurship", "Public Speaking", "Digital Marketing",
    "Music", "Art", "Business", "Law", "Fashion Design", "Hair Styling",
    "Makeup Artistry", "Cooking", "Tourism", "Agriculture", "Economics",
    "Football Training", "Basketball", "History", "Geography", "Photography",
    "Videography", "Content Creation"
  ],
  "south-africa": [
    "Art", "Business Studies", "Coding", "Law", "Maths", "Science", "Biology",
    "Physics", "Chemistry", "Psychology", "Music", "Dance", "Film Production",
    "Acting", "Tourism", "Wildlife Management", "Public Speaking", "Entrepreneurship",
    "Digital Marketing", "E-commerce", "Fashion Design", "Cooking", "Football",
    "Rugby", "Cricket", "History", "Sociology", "Photography", "UI/UX",
    "Data Science"
  ],
  china: [
    "Chinese Language", "Maths", "Calligraphy", "Physics", "Chemistry", "Biology",
    "Medicine Prep", "Business Studies", "Entrepreneurship", "Economics",
    "Public Speaking", "Law", "Art", "Design", "Photography", "Videography",
    "Music", "Dance", "Martial Arts", "Cooking", "Robotics", "Artificial Intelligence",
    "Data Science", "Game Development", "Fashion Design", "Tourism",
    "Architecture", "Philosophy", "Film Studies", "Creative Writing"
  ],
  togo: [
    "French", "English", "Maths", "Physics", "Chemistry", "Biology", "Coding",
    "Mobile Apps", "Web Development", "Economics", "Business Studies",
    "Entrepreneurship", "Public Speaking", "Fashion Design", "Music",
    "Dance", "Photography", "Videography", "Cooking", "Hair Styling",
    "Makeup Artistry", "Agriculture", "Tourism", "Digital Marketing",
    "Data Science", "Content Creation", "UI/UX", "Project Management",
    "Football Training", "History"
  ],
  "sierra-leone": [
    "Maths", "English", "Physics", "Chemistry", "Biology", "Coding", "Economics",
    "Business Studies", "Entrepreneurship", "Public Speaking", "Law", "Music",
    "Dance", "Tourism", "Digital Marketing", "UI/UX", "Fashion Design", "Cooking",
    "Photography", "Videography", "Football", "History", "Geography",
    "Hair Styling", "Makeup", "Agriculture", "Fisheries", "Art",
    "Content Creation", "Data Science"
  ],
  liberia: [
    "Maths", "English", "Coding", "Business", "Economics", "Entrepreneurship",
    "Digital Marketing", "Football", "Dance", "Music", "Public Speaking",
    "Cooking", "Fashion Design", "Tourism", "Art", "Photography",
    "Videography", "History", "Law", "Project Management", "ICT",
    "Mobile Apps", "UI/UX", "Data Science", "Accounting", "Agriculture",
    "Makeup Artistry", "Hair Styling", "Content Creation", "Fitness Training"
  ],
  gambia: [
    "Maths", "English", "Coding", "Web Development", "Business", "Economics",
    "ICT", "Digital Marketing", "Music", "Dance", "Art", "Photography",
    "Videography", "Tourism", "Cooking", "Agriculture", "Law", "Public Speaking",
    "History", "Geography", "Fashion Design", "Hair Styling", "Makeup Artistry",
    "Entrepreneurship", "Mobile Apps", "UI/UX", "Football Training",
    "Data Science", "Content Creation", "Project Management"
  ],
  uganda: [
    "Maths", "English", "Biology", "Chemistry", "Physics", "Coding", "Agriculture",
    "Entrepreneurship", "Digital Marketing", "UI/UX", "Web Development",
    "Music", "Dance", "Tourism", "Wildlife Studies", "Public Speaking",
    "History", "Geography", "Law", "Business", "Photography", "Videography",
    "Cooking", "Fashion Design", "Hair Styling", "Makeup Artistry",
    "Football Training", "Athletics", "Data Science", "Project Management"
  ],
  tanzania: [
    "Maths", "English", "Biology", "Chemistry", "Physics", "Coding", "Tourism",
    "Wildlife Management", "Public Speaking", "Entrepreneurship", "Digital Marketing",
    "Photography", "Videography", "Music", "Dance", "Law", "Business Studies",
    "Agriculture", "History", "Geography", "Cooking", "Fashion Design",
    "Hair Styling", "Makeup Artistry", "Content Creation", "Football Training",
    "Athletics", "Data Science", "Project Management", "UI/UX"
  ],
  zambia: [
    "Maths", "English", "Biology", "Chemistry", "Physics", "ICT", "Coding",
    "Web Development", "Business Studies", "Entrepreneurship", "Public Speaking",
    "Tourism", "Agriculture", "Digital Marketing", "Music", "Dance", "Law",
    "Cooking", "Photography", "Videography", "Hair Styling", "Makeup Artistry",
    "History", "Geography", "Football Training", "Basketball", "Data Science",
    "UI/UX", "Content Creation", "Project Management"
  ],
  malawi: [
    "Maths", "English", "Biology", "Chemistry", "Physics", "ICT", "Coding",
    "Entrepreneurship", "Tourism", "Agriculture", "Digital Marketing", "UI/UX",
    "Music", "Dance", "Cooking", "Fashion Design", "Hair Styling",
    "Makeup Artistry", "Photography", "Videography", "Football Training",
    "Athletics", "History", "Geography", "Public Speaking", "Law", "Business",
    "Content Creation", "Data Science", "Project Management"
  ],
};

const CountryPage = () => {
  const router = useRouter();
  const { country } = router.query;

  const auth = useAuth();

  const subjects = featuredSubjects[country] || [];

  const handleCreateAdvert = () => {
    if (!auth.isLoggedIn) {
      router.push(`/login?redirect=/create-advert`);
      return;
    }
    if (auth.hasFreeTrialUsed) {
      router.push(`/membership`);
      return;
    }
    router.push(`/create-advert`);
  };

  // Format country name nicely
  const formattedCountry = country
    ? country
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "";

  return (
    <>
      <Head>
        <title>Learn with Tutors in {formattedCountry} | Baza Academy</title>
        <meta
          name="description"
          content={`Explore top subjects and connect with tutors in ${formattedCountry}. Find lessons in academics, skills, and hobbies.`}
        />
        <link rel="canonical" href={`https://bazaacademy.com/countries/${country}`} />
      </Head>

      <div className="container my-5">
        <h1 className="mb-4 text-center text-warning fw-bold">
          Tutors in {formattedCountry}
        </h1>

        <p className="text-center mb-4 text-muted">
          Browse popular subjects and find the best tutors near you.
        </p>

        {/* Subjects Grid */}
        <div className="row">
          {subjects.length > 0 ? (
            subjects.map((subject, idx) => (
              <div key={idx} className="col-6 col-md-3 mb-4 text-center">
                <Link
                  href={`/tutorials/${subject.toLowerCase()}/${country}`}
                  className="text-decoration-none"
                >
                  <div
                    className="border p-3 rounded shadow-sm h-100"
                    style={{
                      borderColor: "#EAB308",
                      borderWidth: "2px",
                      transition: "transform 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <h6 className="mt-2 fw-semibold text-dark">{subject}</h6>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No subjects available for this country yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Custom Advert CTA */}
        <div className="text-center mt-5">
          <p className="mb-2 text-muted">
            Didn’t find the subject you’re looking for?
          </p>
          <button
            onClick={handleCreateAdvert}
            className="btn btn-outline-warning px-4 py-2"
          >
            Create a Custom Learning Request
          </button>
        </div>

        <div className="text-center mt-4">
          <Link href="/countries" className="btn btn-dark">
            Back to Countries
          </Link>
        </div>
      </div>
    </>
  );
};

export default CountryPage;
