import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModel";
import productsPageBg from "../assets/produBackgrnd.png";

const btnCard =
  "flex-1 inline-flex items-center justify-center bg-[#d4a07a] hover:bg-[#c98358] text-white text-sm font-medium px-4 py-3 rounded-md shadow-none hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap";

const StarRating = ({ rating = 4 }) => {
  const fullStars = Math.floor(rating);
  const totalStars = 5;

  return (
    <div className="flex items-center gap-0.5 text-lg mb-2">
      {[...Array(totalStars)].map((_, i) => (
        <span
          key={i}
          className={i < fullStars ? "text-yellow-400" : "text-yellow-200"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch all active products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/products");
        setProducts(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please ensure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
              Explore our industry-leading range of clinical aesthetics, laser
              devices, and dermatological equipment designed for premier clinics.
            </p>
          </div>
        </div>
      </div>

      {/* PRODUCT CARDS */}
      <section className="pt-16 pb-24 px-6 md:px-16">
        {loading ? (
          <div className="max-w-[1200px] mx-auto text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-[#d4a07a] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading aesthetic machines...</p>
          </div>
        ) : error ? (
          <div className="max-w-[1200px] mx-auto text-center py-20">
            <p className="text-red-500 font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#d4a07a] text-white px-5 py-2.5 rounded-md"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="max-w-[1200px] mx-auto text-center py-20">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col min-h-[530px] 
                transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/50 hover:border-gray-400"
              >
                {/* Product Image */}
                <div className="bg-[#f0f0f0] h-[220px] md:h-[240px] w-full overflow-hidden">
                  <img
                    src={product.mainImage}
                    alt={product.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <StarRating rating={product.rating} />

                  <h3 className="text-base md:text-lg font-bold text-black mb-1 leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-base font-semibold text-black mb-2">
                    {product.price}
                  </p>

                  <p className="text-sm text-black/80 leading-relaxed mb-4 line-clamp-3">
                    {product.shortDescription}
                  </p>

                  {/* Buttons */}
                  <div className="border-t border-gray-200 pt-3 mt-auto">
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
                        onClick={() => navigate(`/products/${product.slug}`)}
                      >
                        More About Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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