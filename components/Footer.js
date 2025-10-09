"use client";
import Link from 'next/link';
import React from 'react';
import  Image  from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faPinterest, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
  return (
    <div className='mt-5' style={{ backgroundColor: '#e8f0fe' }}>
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-2 mb-3">
              <h5 className='fw-bold'>About</h5>
              <hr className='w-50 border-warning border-2' />

              <ul className="nav flex-column">
                <li className="nav-item mb-2"><Link href="/about-us" className="nav-link p-0 text-body-secondary">Who are we?</Link></li>
                <li className="nav-item mb-2"><Link href="/terms-and-conditions" className="nav-link p-0 text-body-secondary">Terms & Conditions</Link></li>
                <li className="nav-item mb-2"><Link href="/privacy-policy" className="nav-link p-0 text-body-secondary">Privacy Policy</Link></li>
                <li className="nav-item mb-2"><Link href="/countries" className="nav-link p-0 text-body-secondary">Baza Academy Worldwide</Link></li>
                <li className="nav-item mb-2"><Link href="/tutorials" className="nav-link p-0 text-body-secondary">Online-Tutorials</Link></li>
                <li className="nav-item mb-2"><Link href="/states" className="nav-link p-0 text-body-secondary">States</Link></li>
                <li className="nav-item mb-2"><Link href="/careers" className="nav-link p-0 text-body-secondary">Baza Academy Careers</Link></li>
              </ul>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <h5 className='fw-bold'>Subjects </h5>
              <hr className='w-50 border-warning border-2' />

              <ul className="nav flex-column">
                <li className="nav-item mb-2"><Link href="/type-of-tutorial/arts-and-hobbies" className="nav-link p-0 text-body-secondary">Arts & Hobbies</Link></li>
                <li className="nav-item mb-2"><Link href="/type-of-tutorial/career-development" className="nav-link p-0 text-body-secondary">Career-Development</Link></li>
                <li className="nav-item mb-2"><Link href="/type-of-tutorial/computer-sciences" className="nav-link p-0 text-body-secondary">Computer-Sciences</Link></li>
                <li className="nav-item mb-2"><Link href="/type-of-tutorial/languages" className="nav-link p-0 text-body-secondary">Languages</Link></li>
                <li className="nav-item mb-2"><Link href="/type-of-tutorial/languages" className="nav-link p-0 text-body-secondary">Languages</Link></li>
                <li className="nav-item mb-2"><Link href="/type-of-tutorial/music" className="nav-link p-0 text-body-secondary">Music</Link></li>
                <li className="nav-item mb-2"><Link href="/type-of-tutorial/languages" className="nav-link p-0 text-body-secondary">Health & Wellness</Link></li>
                <li className="nav-item mb-2"><Link href="/type-of-tutorial/languages" className="nav-link p-0 text-body-secondary">Academic Lessons</Link></li>
                <li className="nav-item mb-2"><Link href="/type-of-tutorial/languages" className="nav-link p-0 text-body-secondary">Sports</Link></li>
              </ul>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <h5 className='fw-bold'>Share Point</h5>
              <hr className='w-50 border-warning border-2' />
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><Link href="/bog" className="nav-link p-0 text-body-secondary">Baza Academy Blog</Link></li>
                <li className="nav-item mb-2"><Link href="/teaching-resources" className="nav-link p-0 text-body-secondary">Teaching Resources</Link></li>
                <li className="nav-item mb-2"><Link href="/upgrade/membership" className="nav-link p-0 text-body-secondary">Pricing</Link></li>
                <li className="nav-item mb-2"><Link href="/faqs" className="nav-link p-0 text-body-secondary">FAQs</Link></li>
                <li className="nav-item mb-2"><Link href="/ready-learners/custom-request" className="nav-link p-0 text-body-secondary">Create Request</Link></li>
              </ul>
            </div>
            <div className="col-md-5 offset-md-1 mb-3 border border-2 border-warning">
              <h5 className='fw-bold'>Baza Academy</h5>
              <hr className='w-25 border-warning border-1' />

              <p>Your trusted partner for tutorial connects.</p>
              <p>Baxa Academy is a dynamic educational platform dedicated to connecting passionate tutors with eager learners from all walks of life. We believe that personalized learning has the power to transform lives, which is why we make it easy for students to find skilled, trusted tutors who match their specific goals and interests. </p>
              <p>Whether you are looking to master a new language, improve your academic performance, or develop valuable career skills, Baxa Academy offers a seamless way to access high-quality instruction tailored to your needs.</p>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center py-4 my-4 border-top">

            {/* Copyright text - text-center on xs, text-start on sm and up */}
            <p className="text-center text-sm-start mb-2 mb-sm-0">
              {new Date().getFullYear()} Baza Academy, Inc. All rights reserved.
            </p>

            {/* Social Media Icons - d-flex for horizontal, mb-2 on xs before the image */}
            <ul className="list-unstyled d-flex mb-2 mb-sm-0">
              <li className="ms-3">
                <Link className="link-body-emphasis" href="#" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} size="2xl" className="highlight" color='red' />
                </Link>
              </li>
              <li className="ms-3">
                <Link className="link-body-emphasis" href="#" aria-label="X (Twitter)">
                  <FontAwesomeIcon icon={faXTwitter} size="2xl" />
                </Link>
              </li>
              <li className="ms-3">
                <Link className="link-body-emphasis" href="#" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedin} size="2xl" className='text-primary' />
                </Link>
              </li>
              <li className="ms-3">
                <Link className="link-body-emphasis" href="#" aria-label="WhatsApp">
                  <FontAwesomeIcon icon={faWhatsapp} size="2xl" className='text-success' />
                </Link>
              </li>
              <li className="ms-3">
                <Link className="link-body-emphasis" href="#" aria-label="Pinterest">
                  <FontAwesomeIcon icon={faPinterest} size="2xl" className='text-danger' />
                </Link>
              </li>
              <li className="ms-3">
                <Link className="link-body-emphasis" href="https://www.facebook.com/people/Baza-Academy/100066410817001/" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebook} className="text-primary" size="2xl" />
                </Link>
              </li>
            </ul>

            {/* Payment Image - No bottom margin on sm and up as it's in a row */}
            <Image src='/securepayment.jpeg' width={150} height={60} alt='Secure Payment' />
          </div>
        </footer>
      </div>
    </div>
  );
}