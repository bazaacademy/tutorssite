import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import TutorProfile from "@/models/TutorProfile";
import Session from "@/models/Session";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ message: "Dev only" });
  }

  await dbConnect();

  // optional: clear collections
  await Promise.all([User.deleteMany({}), TutorProfile.deleteMany({}), Session.deleteMany({})]);

  const pwd = await bcrypt.hash("Password123!", 10);

  // students
  const [s1, s2,s3,s4] = await User.insertMany([
    {
      name: "Jane Student",
      email: "jane@student.com",
      password: pwd,
      role: "student",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      freeSessionUsed: false,
       membership: {
    status: "free",
    
  }
    },
    {
      name: "Sam Student",
      email: "sam@student.com",
      password: pwd,
      role: "student",
      imageUrl: "https://randomuser.me/api/portraits/men/71.jpg",
      freeSessionUsed: true,
      membership: { status: "premium"},
    },{
      name: "Jazy Obot",
      email: "jazy@student.com",
      password: pwd,
      role: "student",
      imageUrl: "https://randomuser.me/api/portraits/women/69.jpg",
      freeSessionUsed: false,
       membership: {
    status: "free",
    
  }
    },
    {
      name: "Samy Dick",
      email: "samy@student.com",
      password: pwd,
      role: "student",
      imageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
      freeSessionUsed: true,
      membership: { status: "premium"},
    }
  ]);

  // tutors
  const [t1u, t2u, t3u, t4u,t5u,t6u,t7u,t8u,t9u,t10u,t11u,t12u,t13u,t14u,t15u,t16u,t17u,t18u,t19u,t20u] = await User.insertMany([
    {
      name: "John Tutor",
      email: "john@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      membership: { status: "premium"},

    },
    {
      name: "Mary Tutor",
      email: "mary@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
            membership: { status: "premium"},

    },  {
      name: "Camy Gab",
      email:  "cam@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/men/33.jpg",
            membership: { status: "premium"},

    },
    {
      name: "Daby May",
      email: "may@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
            membership: { status: "premium"},

    },  {
      name: "Johny Ja",
      email: "johny@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/men/34.jpg",
            membership: { status: "premium"},

    },
    {
      name: "Daa Alam",
      email: "daa@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
            membership: { status: "premium"},

    },  {
      name: "Joa Zam",
      email: "joa@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      name: "Kya Mla",
      email: "Kya@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/women/46.jpg",
    },  {
      name: "BB Aba",
      email: "bb@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    {
      name: "KK Dam",
      email: "kk@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/women/47.jpg",
    },  {
      name: "Zmm La",
      email: "zmm@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/men/37.jpg",
    },
    {
      name: "Ya Za",
      email: "ya@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/women/48.jpg",
    },  {
      name: "Joh Dll",
      email: "joh@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/men/38.jpg",
    },
    {
      name: "Maray Tuto",
      email: "maray@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/women/49.jpg",
    },  {
      name: "Kohn Tutor",
      email: "kohn@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/men/39.jpg",
    },
    {
      name: "Asa Tuator",
      email: "asa@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/women/50.jpg",
    },  {
      name: "Asas Nl",
      email: "asas@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/men/40.jpg",
    },
    {
      name: "Kaax Kax",
      email: "kax@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/women/51.jpg",
    },  {
      name: "Jon Tor",
      email: "jon@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      name: "Mary Tu",
      email: "tu@tutor.com",
      password: pwd,
      role: "tutor",
      imageUrl: "https://randomuser.me/api/portraits/women/52.jpg",
    },
  ]);


  // 1. Create reviewers (students)
  const reviewers = await User.insertMany([
    { name: "Alice Johnson", email: "alice@example.com", password: "Password123!", role: "student" },
    { name: "Brian Kim", email: "brian@example.com", password: "Password123!", role: "student" },
    { name: "Chloe Adams", email: "chloe@example.com", password: "Password123!", role: "student" },
      { name: "David Lee", email: "david@example.com", password: "Password123!", role: "student" },
      { name: "Eva Green", email: "eva@example.com", password: "Password123!", role: "student" },

    ]);

    // Map for easy lookup
    const [alice, brian, chloe, david, eva] = reviewers;

  // extended tutor profiles
  await TutorProfile.insertMany([
    {
  user: t1u._id,
  bio: "Experienced in Mathematics & Physics with 10+ years of teaching high school and university students.",
  title: "Senior Math & Physics Instructor",
  qualifications: "B.Sc in Physics, M.Sc in Applied Mathematics",
  subjects: ["Math", "Physics"],
  experience: "10 years of teaching in private schools and online platforms.",
  teachesOnline: true,
  teachesInPerson: true,
  location: {
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    },
  abouttheclass: "My classes are interactive, problem-solving focused, and tailored to individual needs. I emphasize understanding concepts rather than rote learning.",
  ratePerHour: 8000,
  photo: t1u.imageUrl,
  reviews: [
    { user: alice._id, rating: 5, comment: "John is an exceptional tutor who made complex topics easy to understand." },
    { user: brian._id, rating: 4, comment: "Great teaching style and very patient." },
    { user: chloe._id, rating: 5, comment: "Helped me improve my grades significantly!" },
    { user: david._id, rating: 5, comment: "Highly recommend John for anyone struggling with Math or Physics." },
    { user: eva._id, rating: 4, comment: "Very knowledgeable and supportive tutor." },
  ],
  rating: 4.6,
},
{
  user: t2u._id,
  bio: "English and Literature coach specializing in exam prep and creative writing.",
  title: "English Language & Literature Tutor",
  qualifications: "B.A in English, Certified IELTS Trainer",
  subjects: ["English", "Literature"],
  experience: "5 years experience coaching high school and undergraduate students.",
  teachesOnline: true,
  teachesInPerson: false,
   location:{ city: "Abuja", state: "FCT", country: "Nigeria" },
  abouttheclass: "I make literature come alive through discussions and real-world applications. I also help students improve writing and speaking for exams.",
  ratePerHour: 7000,
  photo: t2u.imageUrl,
  reviews: [
    { user: chloe._id, rating: 5, comment: "Sarah is patient and encouraging!" },
    { user: alice._id, rating: 4, comment: "Loved her essay tips." },
  ],
  rating: 4.7,
},
{
  user: t3u._id,
  bio: "Full-stack developer and coding coach who also tutors exam English and academic writing.",
  title: "Coding & English Tutor",
  qualifications: "B.Sc Computer Science, CELTA",
  subjects: ["Coding", "English", "IELTS", "Research Writing"],
  experience: "4 years mentoring bootcamp students and high school learners.",
  teachesOnline: true,
  teachesInPerson: false,
  location:  { city: "New York", state: "New York", country: "United States" },
  abouttheclass: "Hands-on coding lessons with project-based learning; IELTS practice integrated with English skills.",
  ratePerHour: 6000,
  photo: t3u.imageUrl,
  reviews: [
    { user: alice._id, rating: 5, comment: "Camy made coding fun and accessible!" },
    { user: brian._id, rating: 4, comment: "Great practical approach to learning." },
  ],
  rating: 4.5,
},

  {
    user: t4u._id,
    bio: "IELTS specialist who also teaches academic research writing and Business Studies.",
    title: "IELTS & Research Writing Tutor",
    qualifications: "M.A. Applied Linguistics, IELTS Examiner (Trained)",
    subjects: ["IELTS", "Research Writing", "Business"],
    experience: "6 years preparing students for international exams and thesis supervision.",
    teachesOnline: true,
    teachesInPerson: true,
    location: { city: "Port Harcourt", state: "Rivers", country: "Nigeria" },
    abouttheclass: "Focused exam strategies, timed practice tests, and step-by-step research paper guidance.",
    ratePerHour: 9000,
    photo: t4u.imageUr,
    reviews: [
      { user: chloe._id, rating: 5, comment: "Daby's strategies got me a band 8!" },
      { user: david._id, rating: 4, comment: "Very thorough and supportive." },
    ],
    rating: 4.6,
  },
  {
    user: t5u._id,
    bio: "Business practitioner and accounting tutor with practical case study approach.",
    title: "Business & Accounting Tutor",
    qualifications: "B.Sc Accounting, ACCA Part-Qualified",
    subjects: ["Business", "Accounting", "Economics"],
    experience: "7 years teaching students and running small business workshops.",
    teachesOnline: false,
    teachesInPerson: true,
    location:  { city: "Los Angeles", state: "California", country: "United States" },
    abouttheclass: "Real-world business scenarios, simple models for pricing, profit and reporting.",
    ratePerHour: 8000,
    photo: t5u.imageUr,
    reviews: [
      { user: alice._id, rating: 5, comment: "Excellent insights into business strategies." },
      { user: brian._id, rating: 4, comment: "Very practical and engaging sessions." },
    ],
    rating: 4.5,
  },
  {
    user: t6u._id,
    bio: "Research writer and academic editor who coaches students through dissertations and journal articles.",
    title: "Research Writing & Editing Tutor",
    qualifications: "M.Sc Research Methods, Certified Academic Editor",
    subjects: ["Research Writing", "English", "Statistics"],
    experience: "5 years supporting undergraduates and postgraduates to publish.",
    teachesOnline: true,
    teachesInPerson: false,
    location: { city: "Ibadan", state: "Oyo", country: "Nigeria" },

    abouttheclass: "From topic selection to literature review and APA/MLA formatting — practical, checklist-driven sessions.",
    ratePerHour: 10000,
    photo: t6u.imageUr,
    reviews: [
      { user: alice._id, rating: 5, comment: "Incredibly helpful with my thesis!" },
      { user: brian._id, rating: 4, comment: "Great feedback on my research proposal." },
    ],
    rating: 4.5,
  },
  {
    user: t7u._id,
    bio: "Creative writing coach who also prepares learners for literature exams and IELTS writing.",
    title: "Literature & Creative Writing Tutor",
    qualifications: "B.A. English Literature, Creative Writing Certificate",
    subjects: ["Literature", "Creative Writing", "IELTS"],
    experience: "3 years teaching secondary and tertiary students.",
    teachesOnline: true,
    teachesInPerson: true,
    location:  { city: "Chicago", state: "Illinois", country: "United States" },
    abouttheclass: "Interactive text analysis, creative prompts, and essay structuring for exams.",
    ratePerHour: 5000,
    photo: t7u.imageUr,
    reviews: [
      { user: chloe._id, rating: 5, comment: "Engaging and insightful sessions!" },
      { user: david._id, rating: 4, comment: "Helped me with my creative writing." },
    ],
    rating: 4.5,
  },
  {
    user: t8u._id,
    bio: "Software engineer and algorithm tutor — from Python beginner lessons to data structures.",
    title: "Coding & Algorithms Tutor",
    qualifications: "B.Eng Software Engineering",
    subjects: ["Coding", "Mathematics", "Physics"],
    experience: "6 years tutoring programming and university CS courses.",
    teachesOnline: true,
    teachesInPerson: false,
    location:  { city: "Enugu", state: "Enugu", country: "Nigeria" },
    abouttheclass: "Practice-first approach: small projects, algorithm challenges and interview prep.",
    ratePerHour: 7000,
    photo: t8u.imageUr,
    reviews: [
      {user: brian._id, rating: 5, comment: "Kya made learning to code enjoyable!" },
      {user: eva._id, rating: 4, comment: "Clear explanations and practical exercises." },
    ],
    rating: 4.5,
  },
  {
    user: t9u._id,
    bio: "Business studies teacher focused on entrepreneurship, marketing and financial basics.",
    title: "Business, Marketing & Entrepreneurship Tutor",
    qualifications: "MBA, Certified Digital Marketer",
    subjects: ["Business", "Marketing", "Economics"],
    experience: "8 years mentoring startups and teaching business courses.",
    teachesOnline: true,
    teachesInPerson: true,
    location: { city: "Houston", state: "Texas", country: "United States" },
    abouttheclass: "Practical business planning, market research, and low-cost marketing strategies.",
    ratePerHour: 9500,
    photo: t9u.imageUr,
    reviews: [
      { user: alice._id, rating: 5, comment: "Excellent insights into business strategies." },
      { user: brian._id, rating: 4, comment: "Very practical and engaging sessions." },
    ],
    rating: 4.5,

  },
  {
    user: t10u._id,
    bio: "Exam-focused English tutor with strong experience in grammar, reading and IELTS speaking.",
    title: "English Language & IELTS Tutor",
    qualifications: "B.A English, IELTS Trainer",
    subjects: ["English", "IELTS", "Literature"],
    experience: "5 years working with exam candidates and private students.",
    teachesOnline: true,
    teachesInPerson: false,
    location: { city: "Kano", state: "Kano", country: "Nigeria" },
    abouttheclass: "Practical speaking drills, reading strategies and high-score writing templates.",
    ratePerHour: 6500,
    photo: t10u.imageUr,
    reviews: [
      { user: chloe._id, rating: 5, comment: "Helped me achieve my target IELTS score!" },
      { user: eva._id, rating: 4, comment: "Very effective exam strategies." },
    ],
    rating: 4.5,
  },
  {
    user: t11u._id,
    bio: "Quantitative researcher who teaches statistics, data analysis and research methods.",
    title: "Statistics & Research Methods Tutor",
    qualifications: "M.Sc Statistics",
    subjects: ["Statistics", "Research Writing", "Economics"],
    experience: "4 years supervising undergraduate projects and academic workshops.",
    teachesOnline: true,
    teachesInPerson: false,
    location:{ city: "San Francisco", state: "California", country: "United States" },
    abouttheclass: "Clear, example-led sessions on inferential stats, SPSS basics and thesis methodology.",
    ratePerHour: 8500,
    photo: t11u.imageUr,
    reviews: [
      { user: chloe._id, rating: 5, comment: "Very clear explanations!" },
      { user: david._id, rating: 4, comment: "Helpful with my data analysis." },
    ],
    rating: 4.5,
  },
  {
    user: t12u._id,
    bio: "High school science teacher who covers Physics and Chemistry alongside math fundamentals.",
    title: "Physics & Chemistry Tutor",
    qualifications: "B.Sc Physical Sciences, Teaching Cert.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    experience: "6 years classroom teaching and private tutoring.",
    teachesOnline: false,
    teachesInPerson: true,
    location:  { city: "Owerri", state: "Imo", country: "Nigeria" },
    abouttheclass: "Conceptual lessons, worked examples and exam practice papers.",
    ratePerHour: 4000,
    photo: t12u.imageUr,
    reviews: [
      { user: alice._id, rating: 5, comment: "Very engaging and knowledgeable!" },
      { user: brian._id, rating: 4, comment: "Helped me understand complex concepts." },
    ],
    rating: 4.5,
  },
  {
    user: t13u._id,
    bio: "UX developer teaching front-end coding, HTML/CSS and JavaScript fundamentals.",
    title: "Front-End Development & UX Tutor",
    qualifications: "B.Sc HCI, Frontend Bootcamp Instructor",
    subjects: ["Coding", "Design", "Project Work"],
    experience: "5 years building websites and teaching web design.",
    teachesOnline: true,
    teachesInPerson: true,
    location:  { city: "Boston", state: "Massachusetts", country: "United States" },
    abouttheclass: "Practical UI projects with guided code reviews and deployable portfolios.",
    ratePerHour: 7500,
    photo: t13u.imageUr,
    reviews: [
      { user: chloe._id, rating: 5, comment: "Great at explaining complex concepts!" },
      { user: david._id, rating: 4, comment: "Very patient and helpful." },
    ],
    rating: 4.5,
  },
  {
    user: t14u._id,
    bio: "Academic English teacher focusing on essay structure, comprehension and research skills.",
    title: "Academic English & Research Tutor",
    qualifications: "M.A English, Academic Writing Certificate",
    subjects: ["English", "Research Writing", "Literature"],
    experience: "7 years tutoring school and university students.",
    teachesOnline: true,
    teachesInPerson: false,
    location: { city: "Jos", state: "Plateau", country: "Nigeria" },
    abouttheclass: "Structured essay practice, citation guidance and literature review workshops.",
    ratePerHour: 7000,
    photo: t14u.imageUr,
    reviews: [
      { user: alice._id, rating: 5, comment: "Very helpful with my dissertation!" },
      { user: brian._id, rating: 4, comment: "Great feedback on my research paper." },
    ],
    rating: 4.5,
  },
  {
    user: t15u._id,
    bio: "Small business accountant and Excel specialist who teaches bookkeeping and financial literacy.",
    title: "Accounting & Excel Tutor",
    qualifications: "HND Accounting, Certified Excel Trainer",
    subjects: ["Accounting", "Business", "Excel"],
    experience: "6 years helping SMEs with books and reporting.",
    teachesOnline: true,
    teachesInPerson: true,
    location:{ city: "Seattle", state: "Washington", country: "United States" },
    abouttheclass: "Hands-on ledger practice, reconciliations and useful Excel templates for business.",
    ratePerHour: 8000,
    photo: t15u.imageUr,
  },
  {
    user: t16u._id,
    bio: "Language tutor preparing students for TOEFL and IELTS, with emphasis on academic vocabulary.",
    title: "English Exam Preparation Tutor",
    qualifications: "B.A Linguistics, TOEFL/IELTS Certified",
    subjects: ["IELTS", "English", "Study Skills"],
    experience: "4 years focused on international exam prep.",
    teachesOnline: true,
    teachesInPerson: false,
    location:  { city: "Abeokuta", state: "Ogun", country: "Nigeria" },
    abouttheclass: "Customized study plans, vocabulary building and mock exams with feedback.",
    ratePerHour: 6000,
    photo: t16u.imageUr,
  },
  {
    user: t17u._id,
    bio: "Data analyst who teaches Python for data, SQL and research data handling.",
    title: "Python, SQL & Data Analysis Tutor",
    qualifications: "B.Sc Economics, Data Science Bootcamp",
    subjects: ["Coding", "Statistics", "Research Writing"],
    experience: "5 years turning raw data into reports for students and businesses.",
    teachesOnline: true,
    teachesInPerson: true,
    location: { city: "Dallas", state: "Texas", country: "United States" },
    abouttheclass: "Project based data lessons: collect, clean, analyze and present.",
    ratePerHour: 10000,
    photo: t17u.imageUr,
  },
  {
    user: t18u._id,
    bio: "Secondary school teacher with strengths in English, Literature and civic education.",
    title: "English & Civic Education Tutor",
    qualifications: "B.Ed English, Teacher Registration",
    subjects: ["English", "Literature", "Civic Education"],
    experience: "9 years classroom experience and exam coaching.",
    teachesOnline: false,
    teachesInPerson: true,
    location:   { city: "Benin City", state: "Edo", country: "Nigeria" },
    abouttheclass: "Discussion-led literature classes and practice exam essays for high scores.",
    ratePerHour: 4500,
    photo: t18u.imageUr,
  },
  {
    user: t19u._id,
    bio: "Entrepreneur and marketing consultant teaching business planning, branding and pitching.",
    title: "Business Strategy & Marketing Tutor",
    qualifications: "MBA, Brand Consultant",
    subjects: ["Business", "Marketing", "Pitching"],
    experience: "10 years working with startups and small businesses.",
    teachesOnline: true,
    teachesInPerson: true,
    location: { city: "Atlanta", state: "Georgia", country: "United States" },
    abouttheclass: "Build a business model canvas, marketing plan and investor pitch during sessions.",
    ratePerHour: 12000,
    photo: t19u.imageUr,
  },
  {
    user: t20u._id,
    bio: "Versatile tutor covering core school subjects plus research writing and digital skills.",
    title: "Multi-Subject Tutor: Science, Maths & Academic Writing",
    qualifications: "B.Sc Biology, PGD Education",
    subjects: ["Biology", "Mathematics", "Research Writing", "Coding (Basic)"],
    experience: "6 years across secondary and tertiary tutoring.",
    teachesOnline: true,
    teachesInPerson: false,
    location:  { city: "Miami", state: "Florida", country: "United States" },
    abouttheclass: "Balanced lessons that combine theory, practical examples and assessment practice.",
    ratePerHour: 5500,
    photo: t20u.imageUr,
  },


  ]);

  
  
  
  
  // sessions
  const now = new Date();
  const addH = (h) => new Date(now.getTime() + h * 3600 * 1000);

  await Session.insertMany([
  // Existing
  { tutor: t1u._id, student: s1._id, subject: "Math", startsAt: addH(24), endsAt: addH(25) },
  { tutor: t2u._id, student: s1._id, subject: "English", startsAt: addH(72), endsAt: addH(73) },
  { tutor: t1u._id, student: s2._id, subject: "Physics", startsAt: addH(48), endsAt: addH(49) },

  // New with s2
  { tutor: t3u._id, student: s2._id, subject: "Coding", startsAt: addH(96), endsAt: addH(98) },
  { tutor: t4u._id, student: s2._id, subject: "IELTS", startsAt: addH(120), endsAt: addH(121) },

  // With s3
  { tutor: t5u._id, student: s3._id, subject: "Business", startsAt: addH(36), endsAt: addH(37) },
  { tutor: t6u._id, student: s3._id, subject: "Research Writing", startsAt: addH(60), endsAt: addH(62) },
  { tutor: t7u._id, student: s3._id, subject: "Literature", startsAt: addH(84), endsAt: addH(85) },

  // With s4
  { tutor: t8u._id, student: s4._id, subject: "Coding", startsAt: addH(24), endsAt: addH(26) },
  { tutor: t9u._id, student: s4._id, subject: "Marketing", startsAt: addH(48), endsAt: addH(49) },
  { tutor: t10u._id, student: s4._id, subject: "English", startsAt: addH(72), endsAt: addH(73) },
]);


  res.json({
    ok: true,
    loginExamples: [
      { email: "jane@student.com", password: "Password123!" },
      { email: "john@tutor.com", password: "Password123!" },
      { email: "mary@tutor.com", password: "Password123!" },
    ],
  });
}
