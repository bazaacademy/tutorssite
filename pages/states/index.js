import Link from "next/link";
import React from "react";

const states = [
  { name: "Lagos", country: "nigeria" },
  { name: "Abuja", country: "nigeria" },
  { name: "California", country: "united-states" },
  { name: "Texas", country: "united-states" },
  { name: "Ontario", country: "canada" },
  { name: "Quebec", country: "canada" },
  { name: "Greater Accra", country: "ghana" },
  { name: "Gauteng", country: "south-africa" },
  // add more as you like
];

const StatesPage = () => {
  return (
    <div className="container my-4">
      <h2 className="mb-3 text-center">Explore Tutors by State</h2>
      <div className="row">
        {states.map((state, idx) => (
          <div key={idx} className="col-md-3 mb-3">
            <Link
              href={`/tutorials/all/${state.country}/${state.name.toLowerCase()}`}
              className="text-decoration-none"
            >
              <div className="card shadow-sm p-3 text-center h-100">
                <h5 className="mb-1">{state.name}</h5>
                <small className="text-muted">{state.country.toUpperCase()}</small>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatesPage;
