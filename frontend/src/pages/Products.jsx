import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModel";
import productsPageBg from "../assets/produBackgrnd.png";
import { useNavigate } from "react-router-dom";

import machine1 from "../assets/img1.png";
import machine2 from "../assets/product.png";
import machine3 from "../assets/prodimg3.png";

const btnCard =
  "flex-1 inline-flex items-center justify-center bg-[#d4a07a] hover:bg-[#c98358] text-white text-sm font-medium px-4 py-3 rounded-md shadow-none hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap";

const productList = [
  {
    id: 1,
    image: machine1,
    title: "Lorem Ipsum Is Simply Dummy",
    price: "₹1,75,000*",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 2,
    image: machine2,
    title: "Lorem Ipsum Is Simply Dummy",
    price: "₹1,75,000*",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 3,
    image: machine3,
    title: "Lorem Ipsum Is Simply Dummy",
    price: "₹1,75,000*",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 4,
    image: machine1,
    title: "Lorem Ipsum Is Simply Dummy",
    price: "₹1,75,000*",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 5,
    image: machine2,
    title: "Lorem Ipsum Is Simply Dummy",
    price: "₹1,75,000*",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 6,
    image: machine3,
    title: "Lorem Ipsum Is Simply Dummy",
    price: "₹1,75,000*",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
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

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const navigate = useNavigate(); 

  return (
    <div className="bg-[#f7f7f7] min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      {/* HERO */}
      <div className="relative w-full">
        <div className="relative w-full h-[50vh] min-h-[420px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${productsPageBg})`,
              filter: "brightness(1.25) contrast(1.05)",
            }}
          />
          <div className="absolute inset-0 bg-black/10" />
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
            className="rounded-2xl p-10 md:p-16 max-w-2xl min-h-[280px] flex flex-col justify-center"
            style={{
              background:
                "linear-gradient(to top right, rgba(251, 230, 220, 0.97) 0%, rgba(245, 220, 207, 0.94) 50%, rgba(241, 207, 193, 0.68) 100%)",
              boxShadow: "0 10px 40px rgba(230, 150, 120, 0.12)",
            }}
          >
            <h1 className="text-4xl md:text-4xl font-bold text-black mb-5 tracking-tight">
              Our Products
            </h1>
            <p className="text-black/90 text-base md:text-lg leading-relaxed">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
              Industry. Lorem Ipsum Has Been The IndustLorem Ipsum Is Simply
            </p>
          </div>
        </div>
      </div>

      {/* PRODUCT CARDS */}
      <section className="pt-16 pb-24 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {productList.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col min-h-[530px] 
              transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/50 hover:border-gray-400"
            >
              {/* Image — full bleed, no padding/frame */}
              <div className="bg-white h-[220px] md:h-[240px] w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <StarRating />

                <h3 className="text-base md:text-lg font-bold text-black mb-1 leading-snug">
                  {product.title}
                </h3>

                <p className="text-base font-semibold text-black mb-2">
                  {product.price}
                </p>

                <p className="text-sm text-black leading-relaxed mb-2">
                  {product.desc}
                </p>

                {/* Line above buttons */}
                <div className="border-t border-gray-400 pt-3 mt-2">
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
  className={btnCard}
  onClick={() => navigate(`/products/${product.id}`, {
    state: {
      title: product.title,
      price: product.price,
      desc: product.desc
    }
  })}
>
  More About Product
</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default Products;