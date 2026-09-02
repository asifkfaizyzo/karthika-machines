import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModel";
import testimonialsBg from "../assets/TestiBGimg.png";
import clientImg from "../assets/testimg.png";

const imageTestimonials = [
  {
    id: 1,
    image: clientImg,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and ty Lorem Ipsum is simply...",
    name: "Sandra Jacob",
    role: "Bella Beauty Lounge",
    rating: 5,
  },
  {
    id: 2,
    image: clientImg,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and ty Lorem Ipsum is simply...",
    name: "Sandra Jacob",
    role: "Beautician",
    rating: 5,
  },
  {
    id: 3,
    image: clientImg,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and ty Lorem Ipsum is simply...",
    name: "Sandra Jacob",
    role: "Bloom Beauty Care",
    rating: 5,
  },
];

const textTestimonials = [
  {
    id: 1,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    name: "Mary Sandra",
    role: "Actress",
  },
  {
    id: 2,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    name: "Mary Sandra",
    role: "Actress",
  },
  {
    id: 3,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    name: "Mary Sandra",
    role: "Actress",
  },
  {
    id: 4,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    name: "Mary Sandra",
    role: "Actress",
  },
  {
    id: 5,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    name: "Mary Sandra",
    role: "Actress",
  },
  {
    id: 6,
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    name: "Mary Sandra",
    role: "Actress",
  },
];

const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#f7f7f7] min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      {/* HERO */}
      <div className="relative w-full">
        <div className="relative w-full h-[50vh] min-h-[420px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${testimonialsBg})`,
              filter: "brightness(1.15) contrast(1.05)",
            }}
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-20">
            <Navbar
              activeLink="testimonials"
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
              Testimonials
            </h1>
            <p className="text-black/90 text-base md:text-lg leading-relaxed">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
              Industry. Lorem Ipsum Has Been The IndustLorem Ipsum Is Simply
            </p>
          </div>
        </div>
      </div>

      {/* CARDS SECTION */}
      <section className="pt-20 pb-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* ROW 1 — Image Testimonial Cards (Gentle Hover Effect) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageTestimonials.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200"
              >
                {/* Image & Video Controls Overlay */}
                <div className="relative h-[200px] md:h-[210px] w-full overflow-hidden bg-gray-200 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Overlays — fade in softly on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {/* Playing badge */}
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Playing
                    </div>

                    {/* Sound icon */}
                    <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md text-white p-1.5 rounded-full shadow-sm">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.536 8.464a5 5 0 010 7.072M12 6l-4 4H4v4h4l4 4V6z"
                        />
                      </svg>
                    </div>

                    {/* Fullscreen icon */}
                    <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md text-white p-1.5 rounded-full shadow-sm">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 8V4m0 0h6M4 4l5 5m11-1V4m0 0h-6m6 0l-5 5M4 16v4m0 0h6m-6 0l5-5m11 5l-5-5m5 5v-4m0 4h-6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xl text-black/80 leading-relaxed mb-4">
                    {item.quote}
                  </p>

                  <div className="border-t border-gray-400 pt-3 mt-auto flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-black">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-light">
                        {item.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-black">
                      <span className="text-yellow-400 text-base">★</span>
                      {item.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ROWS 2 & 3 — Quote Cards (Soft Hover & Natural Height) */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {textTestimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 md:p-7 border border-gray-100 flex flex-col justify-between h-[340px] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200"
              >
                <div>
                  {/* Thin outlined double quotation mark */}
                  <div className="mb-3">
                    <svg
                      className="w-10 h-9 text-gray-500"
                      viewBox="0 0 52 42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 22 10 C 22 5.2, 18.9 2, 14 2 C 8.3 2, 5 6.1, 5 12 C 5 18.5, 8.9 22.5, 14.8 22.5 C 18.4 22.5, 20.8 20.1, 22 16 C 21.3 25, 17.9 33.5, 11 38.5 C 10 39.2, 9.1 39.4, 8.3 39.2 C 12.8 38, 17.1 33.7, 19.5 27.5 C 22 21.5, 24 14.5, 22 10 Z" />
                      <path d="M 48 10 C 48 5.2, 44.9 2, 40 2 C 34.3 2, 31 6.1, 31 12 C 31 18.5, 34.9 22.5, 40.8 22.5 C 44.4 22.5, 46.8 20.1, 48 16 C 47.3 25, 43.9 33.5, 37 38.5 C 36 39.2, 35.1 39.4, 34.3 39.2 C 38.8 38, 43.1 33.7, 45.5 27.5 C 48 21.5, 50 14.5, 48 10 Z" />
                    </svg>
                  </div>

                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 mt-auto">
                  <h4 className="text-lg font-bold text-black">
                    {item.name}
                  </h4>
                  <p className="text-lg text-gray-400 font-light mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Testimonials;