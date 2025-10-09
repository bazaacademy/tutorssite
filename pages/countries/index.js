import Head from "next/head";
import Link from "next/link";
import React from "react";

const countries = [
  { name: "Nigeria", slug: "nigeria", flag: "🇳🇬" },
  { name: "United States", slug: "united-states", flag: "🇺🇸" },
  { name: "United Kingdom", slug: "uk", flag: "🇬🇧" },
  { name: "Canada", slug: "canada", flag: "🇨🇦" },
  { name: "Australia", slug: "australia", flag: "🇦🇺" },
  { name: "India", slug: "india", flag: "🇮🇳" },
  { name: "Kenya", slug: "kenya", flag: "🇰🇪" },
  { name: "Ghana", slug: "ghana", flag: "🇬🇭" },
  { name: "South Africa", slug: "south-africa", flag: "🇿🇦" },
  { name: "Togo", slug: "togo", flag: "🇹🇬" },
  { name: "Ireland", slug: "ireland", flag: "🇮🇪" },
  { name: "New Zealand", slug: "new-zealand", flag: "🇳🇿" },
  { name: "Jamaica", slug: "jamaica", flag: "🇯🇲" },
  { name: "Sierra Leone", slug: "sierra-leone", flag: "🇸🇱" },
  { name: "Liberia", slug: "liberia", flag: "🇱🇷" },
  { name: "Uganda", slug: "uganda", flag: "🇺🇬" },
  { name: "Tanzania", slug: "tanzania", flag: "🇹🇿" },
  { name: "Zimbabwe", slug: "zimbabwe", flag: "🇿🇼" },
  { name: "Botswana", slug: "botswana", flag: "🇧🇼" },
  { name: "Malawi", slug: "malawi", flag: "🇲🇼" },
];


const CountriesPage = () => {
  return (
    <>
      <Head>
        <title>Ba za Academy Around the World</title>
        <meta
          name="description"
          content="Discover Baza Academy in different countries around the world and connect with tutors near you."
        />
      </Head>

      <div className="container my-5">
        <h1
          className="mb-4 text-center"
          style={{ color: "#EAB308" }} // gold yellow title
        >
          Baza Academy Around the World
        </h1>
        <p
          className="text-center mb-5"
          style={{ color: "#6B7280" }} // gray subtitle
        >
          Discover qualified tutors and courses in different countries. Choose your country to get started!
        </p>

        <div className="row">
          {countries.map((country, index) => (
            <div key={index} className="col-6 col-md-3 mb-4 text-center">
              <Link
                href={`/countries/${country.slug}`}
                className="text-decoration-none"
              >
                <div
                  className="border p-3 rounded shadow-sm h-100"
                  style={{
                    borderColor: "#EAB308", // gold border
                    borderWidth: "2px",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>{country.flag}</div>
                  <h6
                    className="mt-2"
                    style={{ color: "#000000", fontWeight: "600" }}
                  >
                    {country.name}
                  </h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CountriesPage;
