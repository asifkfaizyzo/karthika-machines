import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/kicslogo.png";

const btnPrimary =
  "inline-flex items-center justify-center bg-[#d49570] hover:bg-[#c98358] text-xs sm:text-sm font-medium px-3 sm:px-5 py-3 sm:py-4 rounded-md shadow-none hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200 whitespace-nowrap";

const Navbar = ({ onBookConsultation, activeLink = "home" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = (name) =>
    `transition ${
      activeLink === name
        ? "text-[#c98358] font-semibold"
        : "hover:text-[#c98358]"
    }`;

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 md:px-16 py-4 sm:py-6 w-full max-w-7xl mx-auto relative z-20">
      {/* Logo */}
      <div className="w-20 sm:w-32 flex items-center">
        <Link to="/">
          <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
  <img
    src={logo}
    alt="KICS Logo"
    className="w-full h-full object-contain"
  />
</div>
        </Link>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8 text-xl font-medium text-gray-200">
        <Link to="/" className={linkClass("home")}>
          Home
        </Link>
        <Link to="/products" className={linkClass("products")}>
          Products
        </Link>
        <Link to="/about" className={linkClass("about")}>
          About
        </Link>
        <Link to="/testimonials" className={linkClass("testimonials")}>
          Testimonials
        </Link>
        <Link to="/contact" className={linkClass("contact")}>
          Contact
        </Link>
      </div>

      {/* Mobile menu */}
      <button
        type="button"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/40 text-white"
      >
        <span className="sr-only">Menu</span>
        <span className="flex flex-col gap-1.5">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </span>
      </button>

           {isMenuOpen && (
        <div className="absolute left-4 right-4 top-full mt-2 flex flex-col gap-4 rounded-md bg-black/95 p-5 text-lg font-medium text-white shadow-lg md:hidden">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className={linkClass("home")}>
            Home
          </Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} className={linkClass("products")}>
            Products
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className={linkClass("about")}>
            About
          </Link>
          <Link to="/testimonials" onClick={() => setIsMenuOpen(false)} className={linkClass("testimonials")}>
            Testimonials
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={linkClass("contact")}>
            Contact
          </Link>

          {/* Book Consultation button inside 3-line mobile menu */}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              onBookConsultation();
            }}
            className={`${btnPrimary} w-full mt-2`}
          >
            Book a Consultation
          </button>
        </div>
      )}

      {/* CTA - Desktop Only */}
      <div className="hidden md:block">
        <button
          type="button"
          onClick={onBookConsultation}
          className={btnPrimary}
        >
          Book a Consultation
        </button>
      </div>

    </nav>
  );
};

export default Navbar;