// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Phone,
  Mail,
  ChevronDown,
  Check,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModel";

// --- REPLACE THESE WITH YOUR REAL IMAGES ---
import detailBg from "../assets/frame 455.png";
import aboutProductImg from "../assets/img1.png";
import sidebarProductImg from "../assets/img1.png";
import relatedImg1 from "../assets/prodimg3.png";
import relatedImg2 from "../assets/prodimg2.png";
import relatedImg3 from "../assets/img1.png";

const btnPrimary =
  "inline-flex items-center justify-center bg-[#d4a07a] hover:bg-[#c98358] text-white text-sm font-medium px-5 py-3 rounded-md shadow-none hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap";

const btnCard =
  "flex-1 inline-flex items-center justify-center bg-[#d4a07a] hover:bg-[#c98358] text-white text-sm font-medium px-4 py-3 rounded-md shadow-none hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap";

const relatedProducts = [
  {
    id: 1,
    image: relatedImg1,
    title: "Lorem Ipsum Is Simply Dummy",
    price: "₹1,75,000*",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 2,
    image: relatedImg2,
    title: "Lorem Ipsum Is Simply Dummy",
    price: "₹1,75,000*",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 3,
    image: relatedImg3,
    title: "Lorem Ipsum Is Simply Dummy",
    price: "₹1,75,000*",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
];

const keyFeatures = [
  "Lorem Ipsum Is Simply Dummy Text Of The Printing And",
  "Lorem Ipsum Is Simply Dummy Text Of The Printing And",
  "Lorem Ipsum Is Simply Dummy Text Of The Printing And",
  "Lorem Ipsum Is Simply Dummy Text Of The Printing And",
  "Lorem Ipsum Is Simply Dummy Text Of The Printing And",
  "Lorem Ipsum Is Simply Dummy Text Of The Printing And",
];

const technicalSpecs = [
  { label: "Display", value: "10-Inch Touchscreen" },
  { label: "Power Supply", value: "AC 220V / 50Hz" },
  { label: "Power Consumption", value: "800w" },
  { label: "Vacuum Pressure", value: "Adjustable" },
  { label: "Treatment Handles", value: "6" },
  { label: "Machine Weight", value: "28 Kg" },
  { label: "Material", value: "Medical Grade ABS" },
  { label: "Certifications", value: "CE / ISO (Model Dependant)" },
];

const whyChooseData = [
  {
    id: 1,
    title: "1. Lorem Ipsum Is Simply Dummy Text Of The",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    title: "2. Lorem Ipsum Is Simply Dummy Text Of The",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 3,
    title: "3. Lorem Ipsum Is Simply Dummy Text Of The",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 4,
    title: "4. Lorem Ipsum Is Simply Dummy Text Of The",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 5,
    title: "5. Lorem Ipsum Is Simply Dummy Text Of The",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const StarRating = () => (
  <div className="flex items-center gap-0.5 text-lg mb-2">
    <span className="text-yellow-400">★</span>
    <span className="text-yellow-400">★</span>
    <span className="text-yellow-400">★</span>
    <span className="text-yellow-400">★</span>
    <span className="text-yellow-300">☆</span>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Auto scroll to top on page load
  useEffect(() => {
  window.scrollTo(0, 0);

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = detailBg;
  document.head.appendChild(link);

  return () => {
    document.head.removeChild(link);
  };
}, []);

  // Fallback data if page is accessed directly
  const product = location.state || {
    title: "HydraFacial Machine",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The IndustLorem Ipsum Is Simply Lorem Ipsum Has",
    price: "₹1,75,000*",
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      {/* HERO + BACKGROUND IMAGE */}
      <div className="relative w-full">
      <div className="relative w-full h-[50vh] min-h-[420px] overflow-hidden bg-[#2a2a2a]">
  <img
    src={detailBg}
    alt=""
    fetchPriority="high"
    decoding="async"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-20">
            <Navbar
              activeLink="products"
              onBookConsultation={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {/* PEACH TEXT BAR */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 -mt-36 md:-mt-40 relative z-10">
          <div
            className="rounded-2xl p-10 md:p-16 max-w-3xl min-h-[280px] flex flex-col justify-center"
            style={{
              background:
                "linear-gradient(to top right, rgba(251, 230, 220, 0.97) 0%, rgba(245, 220, 207, 0.94) 50%, rgba(241, 207, 193, 0.68) 100%)",
              boxShadow: "0 10px 40px rgba(230, 150, 120, 0.12)",
            }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-5 tracking-tight leading-tight">
              {product.title}
            </h1>

            <p className="text-black/90 text-base md:text-lg leading-relaxed mb-6">
              {product.desc}
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-black">
              {product.price}
            </h2>
          </div>
        </div>
      </div>

    

     {/* ================= MAIN: left scrolls, right locked ================= */}
  <section className="pt-28 md:pt-32 pb-8 px-6 md:px-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">

    {/* -------- LEFT (page scrolls this) -------- */}
        <div className="lg:col-span-7 pb-4 min-w-0">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 leading-tight">
        About Products
      </h2>

      <div className="space-y-6 text-black text-[17px] md:text-lg leading-relaxed mb-10 max-w-2xl">
        <p>
          Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
          Industry. Lorem Ipsum Has Been The IndustLorem Ipsum Is SimplyLorem
          Ipsum Is Simply Dummy
        </p>
        <p>
          Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
          Industry. Lorem Ipsum Has Been The IndustLorem Ipsum Is Simply Lorem
          Ipsum Is Simply Dummy
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden w-full h-[260px] md:h-[320px] lg:h-[360px] mb-12 bg-[#cccccc]">
        <img
          src={aboutProductImg}
          alt="About Product"
          className="w-full h-full object-contain object-center"
        />
      </div>

      {/* Key Features */}
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
        Key Features
      </h2>
      <div className="border-t border-gray-300 mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 mb-12">
        {keyFeatures.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#e8c4b0] flex items-center justify-center">
              <Check size={12} strokeWidth={3} className="text-[#c98358]" />
            </span>
            <p className="text-lg md:text-xl text-black leading-relaxed">
              {feature}
            </p>
          </div>
        ))}
      </div>

      {/* Technical Specifications */}
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
        Technical Specifications
      </h2>
      <div className="border-t border-gray-300 mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 mb-12">
        {technicalSpecs.map((spec, i) => (
          <div key={i}>
            <p className="text-base md:text-[17px] font-semibold text-black mb-1">
              {spec.label}
            </p>
            <p className="text-base md:text-[17px] text-black">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* Why Choose This Machine */}
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
        Why Choose This Machine?
      </h2>
      <div className="border-t border-gray-300 mb-6" />

      <div className="flex flex-col gap-5 pb-2">
        {whyChooseData.map((item) => {
          const isOpen = openAccordion === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen
                  ? "bg-white border border-[#d49570]/40 shadow-sm"
                  : "bg-[#f8e6dc]"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                className={`w-full flex items-center justify-between gap-4 text-left px-5 py-5 md:px-6 md:py-5 transition-colors duration-300 ${
                  isOpen
                    ? "bg-[#c48b6a] text-white"
                    : "bg-[#f8e6dc] text-black hover:bg-[#f3ddd0]"
                }`}
              >
                <span className="text-sm md:text-base font-medium pr-4">
                  {item.title}
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={2.2}
                  className={`shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 py-4 md:px-6 md:py-5 bg-white text-black/80 text-sm md:text-[15px] leading-relaxed">
                  {item.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* -------- RIGHT (locked while left scrolls) -------- */}
    <div className="lg:col-span-5">
     <div className="lg:sticky lg:top-24 max-w-[420px] lg:ml-auto space-y-5 self-start">
        {/* Product Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
          <div className="bg-[#e8e8e8] h-[210px] md:h-[230px] w-full overflow-hidden">
            <img
              src={sidebarProductImg}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="p-6 flex flex-col">
            <StarRating />

            <h3 className="text-lg font-bold text-black mb-1 leading-snug">
              {product.title}
            </h3>

            <p className="text-base font-semibold text-black mb-3">
              {product.price}
            </p>

            <p className="text-sm text-black leading-relaxed mb-7">
              {product.desc}
            </p>

            <div className="border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full inline-flex items-center justify-center bg-[#d4a07a] hover:bg-[#c98358] text-white text-sm font-medium px-4 py-3.5 rounded-md transition-all duration-200 hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px]"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Contact Us */}
        <div className="bg-[#f8e6dc] rounded-2xl p-6 md:p-7">
          <h3 className="text-3xl font-medium text-black mb-5">Contact Us</h3>

          <p className="text-xl text-black leading-relaxed mb-4">
            201 S. Grand Ave., 1st Floor New York City,
            <br />
            NY 28020
          </p>

          <div className="flex items-center gap-2.5 text-xl text-black mb-2.5">
            <Phone size={15} strokeWidth={2.2} />
            <span>+91-984 670 3555,</span>
          </div>

          <div className="flex items-center gap-2.5 text-xl text-black">
            <Mail size={15} strokeWidth={2.2} />
            <span>info@kics.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* ================= RELATED PRODUCTS ================= */}
      <section className="pt-10 pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Related Products
            </h2>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className={btnPrimary}
            >
              All Products
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
            {relatedProducts.map((rp) => (
              <div
                key={rp.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col min-h-[480px]
                transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/50 hover:border-gray-400"
              >
                <div className="bg-white h-[230px] md:h-[250px] w-full overflow-hidden shrink-0">
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <StarRating />

                  <h3 className="text-base md:text-lg font-bold text-black mb-1 leading-snug">
                    {rp.title}
                  </h3>

                  <p className="text-base font-semibold text-black mb-3">
                    {rp.price}
                  </p>

                  <p className="text-sm text-black leading-relaxed mb-4 flex-1">
                    {rp.desc}
                  </p>

                  <div className="border-t border-gray-200 pt-4 mt-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className={btnCard}
                      >
                        Enroll Now
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className={btnCard}
                      >
                        More About Product
                      </button>
                    </div>
                  </div>
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

export default ProductDetail;