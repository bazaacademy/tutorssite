// dummyUsers.js

export const dummyUsers = [
  {
    id: "u1",
    name: "Ben John",
    email: "ben.john@example.com",
    role: "tutor",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Lagos",
    firstFreeUsed: false,
    membership: "premium",
    subjects: ["Mathematics", "Physics"],
    teachesOnline: true,
    teachesInPerson: true,
    ratePerHour: 4000,
    bio: "I have 10 years of experience teaching math and physics to students of all levels.",
    reviews: [
      { studentName: "Mike", comment: "Excellent tutor", rating: 5 },
      { studentName: "Sasha", comment: "Very patient and skilled", rating: 4 },
    ],
    createdAt: "2025-07-01T10:00:00Z",
  },
  {
    id: "u2",
    name: "Prudence Mary",
    email: "prudence.mary@example.com",
    role: "student",
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    location: "Abuja",
    firstFreeUsed: true,
    membership: "free",
    enrolledSubjects: ["Chemistry", "Biology"],
    createdAt: "2025-06-15T14:30:00Z",
  },
  {
    id: "u3",
    name: "Admin Alice",
    email: "admin.alice@example.com",
    role: "admin",
    imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    location: "Uyo",
    firstFreeUsed: false,
    membership: "premium",
    createdAt: "2025-05-20T08:45:00Z",
  },
];




