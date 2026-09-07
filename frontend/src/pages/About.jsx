import React, { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModel";

import aboutBg from "../assets/aboutBGimg.png";
import approachImg from "../assets/aboutimg1.png";
import missionImg from "../assets/aboutimg2.png";

import founder1 from "../assets/founderimg.png";
import founder2 from "../assets/founder2.png";
import founder3 from "../assets/founder3.png";
import founder4 from "../assets/founder4.png";
import founder5 from "../assets/founder5.png";

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [founderStart, setFounderStart] = useState(0);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const res = await api.get("/faqs");
        const data = res.data?.data || [];
        setFaqs(data.length ? data : faqsFallback);
      } catch (err) {
        console.error("Error loading FAQs:", err);
        setFaqs(faqsFallback);
      }
    };
    loadFaqs();
  }, []);

  
  // ================= FAQ DATA =================
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

  // ================= FOUNDERS DATA =================
  const founders = [
    {
      id: 1,
      name: "Somjith",
      role: "Founder & CEO",
      image: founder1,
    },
    {
      id: 2,
      name: "Karthik",
      role: "Managing Director",
      image: founder2,
    },
    {
      id: 3,
      name: "Loki",
      role: "Head of Sales",
      image: founder3,
    },
    {
      id: 4,
      name: "Savio",
      role: "Sales Executive",
      image: founder4,
    },
    {
      id: 5,
      name: "Samjith",
      role: "Sales Executive",
      image: founder5,
    },
  ];

  // ================= FOUNDERS CAROUSEL =================

  // Keep a continuous loop: 1,2,3,4,5,1,2,3,...
  // const loopFounders = [...founders, ...founders];
  const loopFounders = Array.from({ length: 100 }, () => founders).flat();
  const baseCount = founders.length;

  // Next button
  const nextFounders = () => {
    // setFounderStart((prev) => (prev + 1) % baseCount);
      setFounderStart((prev) => prev + 1);
  };

  // Previous button
  const prevFounders = () => {
    // setFounderStart((prev) => (prev - 1 + baseCount) % baseCount);
    setFounderStart((prev) => Math.max(0, prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // setFounderStart((prev) => (prev + 1) % baseCount);
      setFounderStart((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [baseCount]);

  return (
    <div className="bg-[#f7f7f7] min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <div className="relative w-full">
        <div className="relative w-full h-[50vh] min-h-[420px] overflow-hidden">

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${aboutBg})`,
              filter: "brightness(1.15) contrast(1.05)",
            }}
          />

          <div className="absolute inset-0 bg-black/10" />

          {/* Navbar */}
          <div className="relative z-20">
            <Navbar
              activeLink="about"
              onBookConsultation={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {/* PEACH TEXT BOX */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 -mt-36 md:-mt-40 relative z-10">
          <div
            className="rounded-2xl p-10 md:p-16 max-w-2xl min-h-[280px] flex flex-col justify-center"
            style={{
              background:
                "linear-gradient(to top right, rgba(251, 230, 220, 0.97) 0%, rgba(245, 220, 207, 0.94) 50%, rgba(241, 207, 193, 0.68) 100%)",
              boxShadow: "0 10px 40px rgba(230, 150, 120, 0.12)",
            }}
          >
            <h1 className="text-4xl md:text-4xl font-bold text-black mb-5 tracking-tight">
              About Us
            </h1>

            <p className="text-black/90 text-base md:text-lg leading-relaxed">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
              Industry. Lorem Ipsum Has Been The IndustLorem Ipsum Is Simply
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          SECTION 1: INTRO TEXT
      ========================================================= */}
      <section className="bg-[#f7f7f7] pt-20 pb-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">

          <p className="text-black text-base md:text-xl leading-relaxed mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industLorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the
          </p>

          <p className="text-black text-base md:text-xl leading-relaxed">
            the industLorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industLorem Ipsum
            is simply dummy text of the printing and is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            industLorem Ipsum is simply dummy text of the printing and
          </p>

        </div>
      </section>

      {/* =========================================================
          SECTION 2: STATS BAR
      ========================================================= */}
      <section className="w-full bg-[#e8d5b7] py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-6">

          {/* Stat 1 */}
          <div className="text-center flex-1">
            <p className="text-5xl md:text-6xl font-bold text-white mb-2">
              100+
            </p>

            <p className="text-white/90 text-xs md:text-sm font-medium tracking-widest uppercase">
              Clients
            </p>
          </div>

          {/* Stat 2 */}
          <div className="text-center flex-1">
            <p className="text-5xl md:text-6xl font-bold text-white mb-2">
              #1
            </p>

            <p className="text-white/90 text-xl md:text-sm font-medium tracking-widest uppercase">
              Most Advanced Aesthetic Technology
            </p>
          </div>

          {/* Stat 3 */}
          <div className="text-center flex-1">
            <p className="text-5xl md:text-6xl font-bold text-white mb-2">
              40+
            </p>

            <p className="text-white/90 text-xs md:text-sm font-medium tracking-widest uppercase">
              Years Of History
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 3: OUR APPROACH
      ========================================================= */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-16">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — Image */}
          <div className="w-full lg:w-[48%]">
            <div className="rounded-sm overflow-hidden w-full h-[450px] md:h-[600px]">
              <img
                src={approachImg}
                alt="Our Approach"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right — Text */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center lg:pl-10 xl:pl-16">

            <h2 className="text-3xl md:text-4xl font-bold text-black mb-5 tracking-tight">
              Our Approach
            </h2>

            <p className="text-black text-base md:text-xl leading-[1.75]">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the
              industLorem Ipsum iLorem Ipsum is simply dummy text of
              the printing and typesetting industry. Lorem Ipsum has
              been the industLorem Ipsum iLorem Ipsum is simply dummy
              text of the printing and typesetting industry. Lorem Ipsum
              has been the industLorem Ipsum i
            </p>

          </div>

        </div>
      </section>

      {/* =========================================================
          MISSION & VALUES
      ========================================================= */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-16 overflow-hidden">

        <div className="max-w-7xl mx-auto relative min-h-[820px] md:min-h-[900px]">

          {/* RIGHT IMAGE */}
          <div className="relative md:absolute md:top-[-40px] md:right-0 w-full md:w-[52%] h-[490px] md:h-[680px] z-20">

            <img
              src={missionImg}
              alt="Mission and Values"
              className="w-full h-full object-cover"
            />

          </div>

          {/* LEFT BEIGE TEXT BOX */}
          <div className="relative md:absolute md:left-0 md:top-24 w-full md:w-[65%] min-h-[580px] md:min-h-[740px] bg-[#e8d5b7] p-8 md:p-14 lg:p-16 z-10 mt-6 md:mt-0 flex items-center">

            <div className="max-w-md space-y-3">

              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-[1.15] tracking-tight">
                Mission &amp;
                <br />
                Values
              </h2>

            <p className="text-black font-extrabold text-base md:text-lg leading-[2]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industLorem Ipsum iLorem
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industLorem Ipsum iLorem
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industLorem Ipsum iLorem
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          OUR FOUNDERS CAROUSEL
      ========================================================= */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-16">

        <div className="max-w-7xl mx-auto">

          <p className="text-xl text-black/70 mb-6 md:mb-8">
            Our Founders
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-black leading-tight mb-14 md:mb-16 max-w-2xl">
            Lorem Ipsum has been the indust
            <br />
            Lorem Ipsum iLorem
          </h2>

          <div className="relative flex items-center gap-3 md:gap-4">

            {/* =================================================
                LEFT ARROW
            ================================================= */}
            <button
              type="button"
              onClick={prevFounders}
              aria-label="Previous founders"
              className="shrink-0 z-30 w-12 h-12 rounded-full bg-[#e8d5b7] hover:bg-[#dcc4a0] flex items-center justify-center shadow-sm transition"
            >
              <svg
                className="w-5 h-5 text-black/70"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* =================================================
                FOUNDERS CARDS
            ================================================= */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <div
                className="founder-carousel-track flex transition-transform duration-700 ease-in-out"
                style={{
                  "--founder-index": founderStart,
                }}
              >
                {loopFounders.map((person, index) => (
                  <div
                    key={`${person.id}-${index}`}
                    className="w-1/2 md:w-1/4 flex-shrink-0 px-3"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Founder Image */}
                      <div className="relative w-full max-w-[260px] mx-auto aspect-square rounded-full overflow-hidden shadow-md mb-5 bg-white">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover object-top"
                        />

                        {/* Name Overlay */}
                        <div className="absolute left-0 right-0 bottom-[18%] z-10 bg-white py-2.5 px-3">
                          <p className="text-sm md:text-base font-semibold text-black truncate text-center">
                            {person.name}
                          </p>
                        </div>
                      </div>

                      {/* Role */}
                      <p className="text-sm md:text-base font-medium text-black">
                        {person.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                RIGHT ARROW
            ================================================= */}
            <button
              type="button"
              onClick={nextFounders}
              aria-label="Next founders"
              className="shrink-0 z-30 w-12 h-12 rounded-full bg-[#e8d5b7] hover:bg-[#dcc4a0] flex items-center justify-center shadow-sm transition"
            >
              <svg
                className="w-5 h-5 text-black/70"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ SECTION
      ========================================================= */}
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

                  {/* FAQ QUESTION */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : faq.id)
                    }
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

                  {/* FAQ ANSWER */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-60 opacity-100"
                        : "max-h-0 opacity-0"
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

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <Footer />

      {/* =========================================================
          CONSULTATION MODAL
      ========================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};

export default About;