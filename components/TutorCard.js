import React from "react";
import Image from "next/image";
import { Badge } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const TutorCard = ({
  photo,
  firstname,
  title,
  bio,
  qualifications,
  subjects,
  teachesOnline,
  teachesInPerson,
  location,
  ratePerHour,
  rating,
  reviews = [],
}) => {
  return (
    <div className="card h-100 shadow-sm tutor-card">
      {/* Tutor Photo */}
      <Image
        src={photo}
        className="card-img-top"
        alt={title}
        width={400}
        height={220}
        style={{ objectFit: "cover", height: "220px" }}
      />

      {/* Tutor Info */}
      <div className="card-body d-flex flex-column">
        <h4 className="text-primary">{firstname}</h4>

        <div className="d-flex justify-content-between align-items-center mb-1">
          <h5 className="card-title mb-0">{title}</h5>
          <span className="text-success fw-bold">{ratePerHour} $/hr</span>
        </div>

        {/* Location + Availability */}
        <div className="mb-2">
          {teachesInPerson && (
            <Badge bg="primary" className="me-1">
              {location}
            </Badge>
          )}
          {teachesOnline && <Badge bg="success">Webcam</Badge>}
        </div>

        {/* Subjects */}
        <h6 className="text-muted mb-2">
          {subjects && subjects.length > 0
            ? subjects.join(", ")
            : "Various subjects"}
        </h6>

        {/* Short Bio */}
        <p className="card-text flex-grow-1" style={{ fontSize: "0.9rem" }}>
          {bio?.length > 100 ? bio.substring(0, 100) + "..." : bio}
        </p>

        {/* Rating + Reviews */}
        <div
          className="text-muted d-flex align-items-center"
          style={{ fontSize: "0.85rem" }}
        >
          <FaStar color="#f5c518" className="me-1" />
          <span>{rating?.toFixed(1) || "N/A"}</span>
          <span className="ms-1">
            ({reviews.length} review{reviews.length !== 1 && "s"})
          </span>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
