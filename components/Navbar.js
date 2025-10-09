"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faQuestionCircle, faUser, faDashboard } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="container navbar bg-body-light navbar-expand-lg">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand text-decoration-none">
          <Image src="/bazalogo.png" alt="logo of the website" width={120} height={120} />
        </Link>

        {/* Login button (visible on mobile only when not logged in) */}
        {!session && (
          <Link href="/login" className="d-none d-sm-inline d-md-none">
            <button className="btn btn-warning px-4 text-dark">Login</button>
          </Link>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Baza Academy
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className="offcanvas-body text-align-center">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3 ">
              <li className="nav-item">
                <Link className="nav-link active mt-2" aria-current="page" href="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active mt-2" aria-current="page" href="/ready-learners/tutorial-requests">
                  Search Ready Learners
                </Link>
              </li>

              <li className="nav-item dropdown mt-2 active">
                <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Search Tutors
                </span>
                <ul className="dropdown-menu">
                  <li className="m-2">
                    <Link className="dropdown-item" href="/countries">
                      Search Tutors By Location
                    </Link>
                  </li>
                      <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="m-2">
                    <Link className="dropdown-item" href="/tutorials">
                      Explore Tutorials
                    </Link>
                  </li>
              
                </ul>
              </li>

              <li className="nav-item dropdown mt-2">
                <span className="nav-link dropdown-toggle active" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Information
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/about-us">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/privacy-policy">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="terms-and-conditions" >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/upgrade/membership">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item mt-2">
                <Link className="nav-link active" href="/contact-us">
                  Contact
                </Link>
              </li>

              {!session && (
                <li className="nav-item justify-content-center">
                  <Link className="nav-link" href="/auth/signup">
                    <button className="btn btn-warning">Sign Up</button>
                  </Link>
                </li>
              )}
            </ul>

            {/* Right Side: Dashboard/Profile */}
            {session ? (
              <Link className="ms-3" href="/dashboard">
                <Image
                  src={session.user.image || "/default-avatar.png"}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-circle border border-warning"
                />
              </Link>
            ) : (
              <Link className="ms-3" href="/dashboard">
                <FontAwesomeIcon icon={faDashboard} className="fa-2xl text-warning" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
