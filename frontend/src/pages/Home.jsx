// src/App.jsx

import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ConsultationModal from "../components/ConsultationModel";

// --- SECTION 1, 2, 3 IMAGES ---
import bgImage from "../assets/machines.webp";
import clinicImage from "../assets/homeimg2.webp";
import machine1 from "../assets/frame1.webp";
import machine2 from "../assets/rectangle-7.webp";
import machine3 from "../assets/rectangle-6.webp";
import machine4 from "../assets/rectangle-8.webp";
import productsBg from "../assets/backgrnd3.webp";

// --- CAROUSEL IMAGES ---
import carousel1 from "../assets/carousel1.webp";
import carousel2 from "../assets/carousel2.webp";
import carousel3 from "../assets/carousel3.webp";
import carousel4 from "../assets/carousel4.webp";
import carousel5 from "../assets/carousel5.webp";

import testimonialsBg from "../assets/testimonials.webp";

// UNIVERSAL BUTTON STYLES
const btnPrimary =
  "inline-flex items-center justify-center bg-[#d49570] hover:bg-[#c98358] text-white text-sm font-medium px-5 py-4 rounded-md shadow-none hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200 whitespace-nowrap";

const btnOutline =
  "inline-flex items-center justify-center border border-gray-400 hover:border-white hover:bg-white/10 text-white text-sm font-medium px-5 py-4 rounded-md shadow-none hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200 whitespace-nowrap";

// STATIC ARRAYS DECLARED OUTSIDE COMPONENT (Avoids reallocation during renders)
const carouselItems = [
  {
    id: 1,
    title: "DIODE LASER MACHINE",
    image: carousel1,
    overviewTitle: "Module Overview",
    overviewText:
      "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  {
    id: 2,
    title: "HYDRA FACIAL MACHINE",
    image: carousel2,
    overviewTitle: "Module Overview",
    overviewText:
      "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  {
    id: 3,
    title: "RF SKIN TIGHTENING MACHINE",
    image: carousel3,
    overviewTitle: "Module Overview",
    overviewText:
      "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  {
    id: 4,
    title: "IPL LASER MACHINE",
    image: carousel4,
    overviewTitle: "Module Overview",
    overviewText:
      "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
  },
  {
    id: 5,
    title: "HIFU MACHINE",
    image: carousel5,
    overviewTitle: "Module Overview",
    overviewText:
      "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
  },
];

const testimonialsFallback = [
  {
    id: 1,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has",
    name: "Archana Raveendran",
    role: "Beautician",
  },
  {
    id: 2,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has",
    name: "John Doe",
    role: "Skin Therapist",
  },
  {
    id: 3,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has",
    name: "Sara Khan",
    role: "Clinic Owner",
  },
  {
    id: 4,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has",
    name: "Dr. Ananya Sharma",
    role: "Dermatologist",
  },
  {
    id: 5,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has",
    name: "Vikram Mehta",
    role: "Aesthetic Specialist",
  },
];

const faqsFallback = [
  {
    id: 1,
    question: "Lorem Ipsum is simply dummy text of the printing",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industLorem Ipsum iLorem Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    question: "Lorem Ipsum is simply dummy text of the printing",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industLorem Ipsum iLorem Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 3,
    question: "Lorem Ipsum is simply dummy text of the printing",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industLorem Ipsum iLorem Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 4,
    question: "Lorem Ipsum is simply dummy text of the printing",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industLorem Ipsum iLorem Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 5,
    question: "Lorem Ipsum is simply dummy text of the printing",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industLorem Ipsum iLorem Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const featuresList = [
  {
    id: 1,
    icon: (
      <svg
        className="w-10 h-10 group-hover:w-5 group-hover:h-5 text-black transition-all duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M2 9.5 12 4l10 5.5-10 5.5L2 9.5Z" />
        <path d="M6 12.2v4.1c0 .9 2.7 2.7 6 2.7s6-1.8 6-2.7v-4.1" />
        <path d="M20 10.2v5.3" />
        <path d="M20 15.5c0 .8.4 1.2 1 1.2" />
      </svg>
    ),
  },
  {
    id: 2,
    icon: (
      <svg
        className="w-10 h-10 group-hover:w-5 group-hover:h-5 text-black transition-all duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="3.5" y="3.5" width="13" height="11" rx="1.5" />
        <path d="M6.5 7h7M6.5 10h5" />
        <circle cx="16.8" cy="15.2" r="2.6" />
        <path d="M15.4 17.2 14.5 21l2.3-1.3 2.3 1.3-.9-3.8" />
      </svg>
    ),
  },
  {
    id: 3,
    icon: (
      <svg
        className="w-10 h-10 group-hover:w-5 group-hover:h-5 text-black transition-all duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="5.2" r="2.1" />
        <path d="M8.2 11.2h7.6c.9 0 1.6.7 1.6 1.6v.7c0 2.1-2.4 3.6-5.4 3.6s-5.4-1.5-5.4-3.6v-.7c0-.9.7-1.6 1.6-1.6Z" />
        <path d="M9.2 17.8h5.6" />
        <path d="M10.2 17.8v2.4M13.8 17.8v2.4" />
        <path d="M9.5 20.2h5" />
      </svg>
    ),
  },
  {
    id: 4,
    icon: (
      <svg
        className="w-10 h-10 group-hover:w-5 group-hover:h-5 text-black transition-all duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M5 15.2V7.6A2.6 2.6 0 0 1 7.6 5h8.8A2.6 2.6 0 0 1 19 7.6v5.2a2.6 2.6 0 0 1-2.6 2.6H9.1L5 18.8v-3.6Z" />
        <path d="M12 8.4c.8-.7 2.2-.5 2.6.5.3.7-.1 1.4-.8 1.8-.4.2-.7.6-.7 1.1" />
        <circle
          cx="12"
          cy="13.7"
          r="0.75"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(carouselItems.length);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const navigate = useNavigate();
  const resizeRef = useRef(null);

  const [testimonials, setTestimonials] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseCount = carouselItems.length;

  // Memoize loops so we don't recalculate massive arrays on every single frame update
  const loopItems = useMemo(
    () => Array.from({ length: 100 }, () => carouselItems).flat(),
    []
  );

  const loopTestimonials = useMemo(() => {
    if (!testimonials.length) return [];
    return Array.from({ length: 50 }, () => testimonials).flat();
  }, [testimonials]);

  // Throttled Window Resize to maintain smooth responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (resizeRef.current) cancelAnimationFrame(resizeRef.current);
      resizeRef.current = requestAnimationFrame(() => {
        setViewportWidth(window.innerWidth);
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeRef.current) cancelAnimationFrame(resizeRef.current);
    };
  }, []);

  // Carousel Auto Move
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Fetch Home testimonials from DB
  useEffect(() => {
    let isMounted = true;
    const loadHomeTestimonials = async () => {
      try {
        const res = await api.get("/testimonials?home=true");
        const data = res.data?.data || [];
        if (isMounted) {
          setTestimonials(data.length ? data : testimonialsFallback);
        }
      } catch (err) {
        console.error("Error loading home testimonials:", err);
        if (isMounted) setTestimonials(testimonialsFallback);
      }
    };
    loadHomeTestimonials();
    return () => {
      isMounted = false;
    };
  }, []);

  // Testimonial Auto Move Timer
  useEffect(() => {
    if (!testimonials.length) return;

    const id = setInterval(() => {
      setActiveTestimonial((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(id);
  }, [testimonials.length]);

  // Fetch FAQs from DB
  useEffect(() => {
    let isMounted = true;
    const loadFaqs = async () => {
      try {
        const res = await api.get("/faqs");
        const data = res.data?.data || [];
        if (isMounted) {
          setFaqs(data.length ? data : faqsFallback);
        }
      } catch (err) {
        console.error("Error loading FAQs:", err);
        if (isMounted) setFaqs(faqsFallback);
      }
    };
    loadFaqs();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-[#f7f7f7]">
      {/* ================= 1. HERO SECTION ================= */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat text-white flex flex-col justify-between"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar
          activeLink="home"
          onBookConsultation={() => setIsModalOpen(true)}
        />

        <main className="px-8 md:px-16 py-12 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
          <div className="max-w-2xl">
            <p className="text-xs md:text-sm text-[#c98358] tracking-wide mb-4 font-light">
              Trusted by Clinics • Certified Academy • Premium Equipment
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6">
              Master <span className="text-[#c98358]">Aesthetic Medicine.</span>
              <br />
              Own Premium Technology.
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-light">
              Hands-on cosmetology training, internationally recognised
              certifications, and advanced aesthetic machines for clinics and
              beauty professionals.
            </p>

             <div className="flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className={btnPrimary}
              >
                📞 Get in Touch ➔
              </button>
              <button
                type="button"
                onClick={() => navigate("/products")}
                className={btnOutline}
              >
                🛒 Shop Machines ➔
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ================= 2. ABOUT / FEATURES SECTION ================= */}
      <section
        id="about"
        className="bg-[#f7f7f7] text-white min-h-screen flex items-center py-16 px-8 md:px-16"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
                <span className="text-black">
                  Lorem Ipsum has been simply dummy text
                </span>
              </h2>
              <br/>
              <p className="!text-black text-xl leading-relaxed font-light">
                Hands-on cosmetology training, internationally recognised
                certifications, and advanced aesthetic machines built for
                clinics and beauty professionals.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/courses")}
              className={btnPrimary}
            >
              Explore More
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative w-full max-w-[580px]">
                {/* Brown Offset Frame */}
                <div className="absolute inset-0 bg-[#f3ddd0] rounded-2xl transform -translate-x-3 translate-y-3 md:-translate-x-4 md:translate-y-4" />

                {/* Square Image Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-square w-full">
                  <img
                    src={clinicImage}
                    alt="Clinic treatment"
                    loading="lazy"
                    className="w-full h-full object-cover block rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuresList.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white hover:bg-[#f6d5c3] border border-transparent hover:border-black/70 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
                >
                  <div className="mb-4 w-10 h-10 rounded-full border border-transparent group-hover:border-black group-hover:bg-white flex items-center justify-center transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-black">
                    Lorem Ipsum
                  </h3>
                  <p className="text-lg text-black/70 leading-relaxed">
                    simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been simply dummy text of the printing and
                    typesetting i...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. PRODUCTS SHOWCASE SECTION ================= */}
      <section
        id="products"
        className="min-h-screen flex items-center py-12 px-8 md:px-16 overflow-hidden bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: `url(${productsBg})` }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-14">
            <div className="w-full lg:w-[48%] flex gap-3 md:gap-4 items-start lg:pl-4">
              <div className="w-1/2 flex flex-col gap-3 md:gap-4 mt-8 lg:mt-10">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] max-h-[40vh]">
                  <img
                    src={machine3}
                    alt="Machine 3"
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] max-h-[40vh]">
                  <img
                    src={machine4}
                    alt="Machine 4"
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-3 md:gap-4">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] max-h-[40vh]">
                  <img
                    src={machine1}
                    alt="Machine 1"
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] max-h-[40vh]">
                  <img
                    src={machine2}
                    alt="Machine 2"
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[54%] font-['Plus_Jakarta_Sans',sans-serif] lg:translate-x-20">
              <h2
                className="text-lg sm:text-3xl lg:text-[36px] font-medium text-white tracking-normal mb-8"
                style={{ lineHeight: "1.35" }}
              >
                Lorem Ipsum Is Simply Dummy
                <br />
                Text Of The Lorem Ipsum Is
                <br />
                Simply Dummy
              </h2>

              <p className="text-white/85 text-base sm:text-[19px] font-light leading-[1.65] mb-9 max-w-[590px]">
                Lorem Ipsum is simply dummy text of the printing and
                <br className="hidden sm:block" />
                typesetting industry. Lorem Ipsum has been the industLorem
                <br className="hidden sm:block" />
                Ipsum is simply dummy text of the printing and typesetting
                <br className="hidden sm:block" />
                industry. Lorem Ipsum has been the industLorem Ipsum is
                <br className="hidden sm:block" />
                simply dummy text of the printing
              </p>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className={btnPrimary}
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. PRODUCT CAROUSEL SECTION ================= */}
      <section
        id="carousel-section"
        className="bg-[#f3ddd0] text-black pt-32 md:pt-40 pb-16 overflow-hidden min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif]"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium leading-tight text-black">
              Lorem Ipsum Is Simply Dummy
              <br />
              Text Of The
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className={btnPrimary}
          >
            Explore Products
          </button>
        </div>

        {/* Product Rating */}
        <div className="max-w-7xl mx-auto px-8 md:px-16 w-full mb-4 flex justify-center">
          <div className="bg-white rounded-2xl px-4 sm:px-10 py-6 shadow-sm flex items-center gap-3 sm:gap-8 justify-between w-full max-w-[460px]">
            <span className="font-semibold text-sm sm:text-base text-black tracking-wide">
              Product Rating
            </span>

            <div className="flex items-center gap-1 text-xl">
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>

              <span className="relative inline-block w-[1em] h-[1em] text-xl leading-none">
                <span className="text-yellow-200">★</span>
                <span className="absolute left-0 top-0 w-1/2 overflow-hidden text-yellow-400">
                  ★
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Infinite carousel */}
        <div className="w-full overflow-hidden py-6">
          <div
            className="home-carousel-track flex items-start gap-6 transition-transform duration-700 ease-in-out will-change-transform"
            style={{
              transform:
                viewportWidth < 640
                  ? `translateX(calc(50% - ${activeIndex * (viewportWidth - 24)}px - ${(viewportWidth - 48) / 2}px))`
                  : `translateX(calc(50% - ${activeIndex * 444}px - 210px ))`,
            }}
          >
            {loopItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => setActiveIndex(index)}
                  className="flex-none w-[calc(100vw-3rem)] sm:w-[420px] flex flex-col gap-4 cursor-pointer"
                >
                  {/* WHITE IMAGE CARD */}
                  <div
                    className={`bg-white p-4 rounded-2xl shadow-sm flex flex-col transition-all duration-500 ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[0.96] opacity-75"
                    }`}
                  >
                    <div className="w-full h-[300px] sm:h-[360px] rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover block"
                      />
                    </div>
                  </div>

                  {/* OVERVIEW BAR */}
                  <div
                    className={`bg-white p-5 rounded-2xl shadow-sm transition-all duration-500 ${
                      isActive ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    <p className="text-base font-semibold text-gray-400 mb-2">
                      {item.overviewTitle}
                    </p>
                    <p className="text-lg text-black font-semibold leading-relaxed mb-4">
                      {item.overviewText}
                    </p>
                    <p className="text-base font-medium text-gray-700">
                      Explore Products
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 5. TESTIMONIALS SECTION ================= */}
      <section
        id="testimonials"
        className="bg-[#f3ddd0] pt-8 pb-0 w-full font-['Plus_Jakarta_Sans',sans-serif]"
      >
        <div
          className="relative w-full h-[480px] md:h-[520px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white overflow-hidden saturate-125 brightness-105"
          style={{ backgroundImage: `url(${testimonialsBg})` }}
        >
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium text-white mb-6">
              What Our Clients Say?
            </h2>

            <div className="relative h-[200px] overflow-hidden w-full max-w-2xl mx-auto">
              <div
                className="flex flex-col transition-transform duration-700 ease-in-out w-full"
                style={{
                  transform: `translateY(-${activeTestimonial * 200}px)`,
                }}
              >
                {loopTestimonials.map((t, idx) => (
                  <div
                    key={`${t.id}-${idx}`}
                    className="h-[200px] w-full flex flex-col justify-center items-center text-center shrink-0 px-4"
                  >
                    <p className="text-base sm:text-lg text-white/95 font-light leading-relaxed max-w-2xl mb-4">
                      {t.text}
                    </p>
                    <h4 className="text-lg sm:text-xl font-medium text-white tracking-wide">
                      {t.name}
                    </h4>
                    <p className="text-sm text-white/80 font-light mt-0.5">
                      {t.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2">
            {testimonials.map((_, index) => {
              const len = testimonials.length;
              if (!len) return null;
              
              const realIndex = ((activeTestimonial % len) + len) % len;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    const currentSet = Math.floor(activeTestimonial / len);
                    setActiveTestimonial(currentSet * len + index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full bg-white ${
                    realIndex === index
                      ? "w-1.5 h-5 opacity-100"
                      : "w-1.5 h-1.5 opacity-60 hover:opacity-100"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 6. FAQ SECTION ================= */}
      <section
        id="faq"
        className="min-h-screen bg-[#f7f7f7] flex items-center justify-center py-16 px-6 md:px-10 font-['Plus_Jakarta_Sans',sans-serif]"
      >
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold text-center text-black mb-12">
            FAQ
          </h2>

          <div className="flex flex-col gap-5">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "bg-white border border-[#d49570]/40 shadow-sm"
                      : "bg-[#f3ddd0]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className={`w-full flex items-center justify-between gap-4 text-left px-6 py-4 md:px-7 md:py-5 transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#c48b6a] text-white"
                        : "bg-[#f8e6dc] text-black hover:bg-[#f3ddd0]"
                    }`}
                  >
                    <span className="text-sm md:text-base font-medium pr-4">
                      {faq.question}
                    </span>
                    <span className="text-2xl leading-none shrink-0 font-light">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 py-5 md:px-7 md:py-6 bg-white text-black/80 text-sm md:text-[15px] leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reusable Footer */}
      <Footer />

      {/* Consultation Modal Popup */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;