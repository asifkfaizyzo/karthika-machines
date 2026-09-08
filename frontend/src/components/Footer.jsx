import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/kicslogo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white w-full font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20 md:py-24">
        {/* Main Layout: Separated into Left (Brand) and Right (Navigation Columns) with a large gap */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
          
          {/* ================= LEFT: BRAND & CONTACT SECTION ================= */}
          <div className="w-full lg:max-w-[360px] shrink-0">
            {/* Logo + KICS Name */}
            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-flex items-center gap-3 mb-5 cursor-pointer"
            >
              <div className="w-16 h-16 flex items-center justify-center shrink-0">
                <img
                  src={logo}
                  alt="KICS Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[40px] md:text-[44px] font-bold tracking-wide leading-none">
                KICS
              </span>
            </Link>

            {/* Description (Exact 2 lines) */}
            <p className="text-white/80 text-[15px] font-normal leading-relaxed mb-10">
              simply dummy text of the printing
              <br />
              and typesetting industry. Lorem
            </p>

            {/* Contact Details */}
            <div className="space-y-3 text-[15px] text-white">
              {/* Phone 1 */}
              <a
                href="tel:26564458562"
                className="flex items-center gap-3 hover:text-[#d49570] transition"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                    fill="white"
                  />
                </svg>
                <span>26564458562</span>
              </a>

              {/* Phone 2 */}
              <a
                href="tel:26564458562"
                className="flex items-center gap-3 hover:text-[#d49570] transition"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                    fill="white"
                  />
                </svg>
                <span>26564458562</span>
              </a>

              {/* Email */}
              <a
                href="mailto:kics@gmail.com"
                className="flex items-center gap-3 hover:text-[#d49570] transition"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
                    fill="white"
                  />
                </svg>
                <span>kics@gmail.com</span>
              </a>
            </div>
          </div>

          {/* ================= RIGHT: LINKS / PRODUCTS / LEGAL COLUMNS ================= */}
          <div className="w-full lg:flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12">
            {/* MAIN LINKS */}
            <div>
              <h4 className="text-[17px] md:text-[18px] font-bold tracking-[0.14em] uppercase mb-8 text-white">
                MAIN LINKS
              </h4>
              <ul className="space-y-5 text-[14px] md:text-[15px] font-normal text-white/90">
                <li>
                  <Link
                    to="/"
                    onClick={scrollToTop}
                    className="hover:text-[#d49570] transition"
                  >
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onClick={scrollToTop}
                    className="hover:text-[#d49570] transition"
                  >
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link
                    to="/testimonials"
                    onClick={scrollToTop}
                    className="hover:text-[#d49570] transition"
                  >
                    TESTIMONIALS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={scrollToTop}
                    className="hover:text-[#d49570] transition"
                  >
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>

            {/* PRODUCTS */}
            <div>
              <h4 className="text-[17px] md:text-[18px] font-bold tracking-[0.14em] uppercase mb-8 text-white">
                PRODUCTS
              </h4>
              <ul className="space-y-5 text-[14px] md:text-[15px] font-normal text-white/90">
                <li>
                  <Link
                    to="/products"
                    onClick={scrollToTop}
                    className="hover:text-[#d49570] transition"
                  >
                    ALL MACHINES
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    onClick={scrollToTop}
                    className="hover:text-[#d49570] transition"
                  >
                    COURSES
                  </Link>
                </li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="text-[17px] md:text-[18px] font-bold tracking-[0.14em] uppercase mb-8 text-white">
                LEGAL
              </h4>
              <ul className="space-y-5 text-[14px] md:text-[15px] font-normal text-white/90">
                <li>
                  <a href="#terms" className="hover:text-[#d49570] transition">
                    TERMS & CONDITIONS
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="hover:text-[#d49570] transition"
                  >
                    PRIVACY POLICY
                  </a>
                </li>
                <li>
                  <a
                    href="#cookies"
                    className="hover:text-[#d49570] transition"
                  >
                    COOKIES
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM ROW: COPYRIGHT & DESIGN ATTRIBUTION ================= */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] md:text-[14px] text-white/60">
          <p className="font-light tracking-wide">
            Copyright © 2026 KICS. All Rights Reserved
          </p>
        <p className="font-light tracking-wide">
            Designed by Your Zeros and Ones
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;