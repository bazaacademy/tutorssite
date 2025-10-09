import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const categories = [
  { subject: "english", image: "/flaticons/072-eng.png" },
  { subject: "maths", image: "/flaticons/011-puzzle.png" },
  { subject: "physics", image: "/flaticons/013-light-bulb.png" },
  { subject: "chemistry", image: "/flaticons/055-microscope.png" },
  { subject: "biology", image: "/flaticons/057-science.png" },
  { subject: "computer-science", image: "/flaticons/033-digitalization.png" },
    { subject: "coding", image: "/flaticons/062-programming.png" },

  { subject: "french", image: "/flaticons/061-languages-1.png" },
  { subject: "chinese", image: "/flaticons/060-languages.png" },
  { subject: "music", image: "/tutor3.jpg" },
  { subject: "economics", image: "/flaticons/018-reading-book.png" },
  { subject: "geography", image: "/flaticons/079-analysis.png" },
  { subject: "history", image: "/flaticons/016-hat.png" },
  { subject: "literature", image: "/flaticons/018-reading-book.png" },
  { subject: "accounting", image: "/flaticons/077-analytics.png" },
  { subject: "law", image: "/flaticons/009-education-2.png" },
  { subject: "medicine", image: "/flaticons/056-biology.png" },
  { subject: "dance", image: "/flaticons/068-hello.png" },
  { subject: "sports", image: "/flaticons/083-info.png" },
  { subject: "agriculture", image: "/flaticons/054-plant-cell.png" },
  { subject: "ielts", image: "/flaticons/006-training.png" },
    { subject: "writing", image: "/flaticons/063-languages-2.png" },

];

const availableCountries = [
  { name: "Select Country", flag: "" },
  { name: "nigeria", flag: "🇳🇬" },
  { name: "ghana", flag: "🇬🇭" },
  { name: "kenya", flag: "🇰🇪" },
  { name: "united-states", flag: "🇺🇸" },
  { name: "canada", flag: "🇨🇦" },
  { name: "uk", flag: "🇬🇧" },
  { name: "france", flag: "🇫🇷" },
  { name: "germany", flag: "🇩🇪" },
  { name: "india", flag: "🇮🇳" },
  { name: "china", flag: "🇨🇳" },
  { name: "australia", flag: "🇦🇺" },
];

const TutorialCategoriesSlider = () => {
  const [userCountry, setUserCountry] = useState("");
  const [loadingCountry, setLoadingCountry] = useState(true);

  useEffect(() => {
    // Check local storage first
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) {
      setUserCountry(savedCountry);
      setLoadingCountry(false);
      return;
    }

    // Otherwise, fetch from IP API
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_name) {
          const formatted = data.country_name.toLowerCase().replace(/\s+/g, "-");
          setUserCountry(formatted);
          localStorage.setItem("selectedCountry", formatted);
        } else {
          setUserCountry("nigeria");
        }
      })
      .catch(() => {
        setUserCountry("nigeria");
      })
      .finally(() => setLoadingCountry(false));
  }, []);

  const handleCountryChange = (e) => {
    setUserCountry(e.target.value);
    localStorage.setItem("selectedCountry", e.target.value);
  };

  return (
    <div className="container my-4">
      <h3 className="mb-2 text-center fs-2">Explore Tutorials:</h3>

      <div className="text-center mb-3">
        {loadingCountry ? (
          <p>🌎 Loading country...</p>
        ) : (
          <select
            value={userCountry}
            onChange={handleCountryChange}
            className="form-select w-auto d-inline-block"
          >
            {availableCountries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.flag} {country.name.replace("-", " ").toUpperCase()}
              </option>
            ))}
          </select>
        )}
      </div>

      <div
        className="d-flex overflow-auto pb-3"
        style={{ gap: "1rem", whiteSpace: "nowrap" }}
      >
        {categories.map((cat, index) => (
          <Link
            href={`/tutorials/${cat.subject}/${userCountry}`}
            key={index}
            className="text-decoration-none"
          >
            <div
              className="card shadow-sm"
              style={{ minWidth: "150px", maxWidth: "150px", cursor: "pointer" }}
            >
              <Image
                src={cat.image}
                alt={cat.subject}
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
              />
              <div className="card-body p-2 text-center">
                <h6 className="mb-0" style={{ fontSize: "0.9rem" }}>
                  {cat.subject.replace("-", " ").toUpperCase()}
                </h6>
                <small className="text-muted">{userCountry.toUpperCase()}</small>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TutorialCategoriesSlider;
