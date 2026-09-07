import React, { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModel";
import contactBg from "../assets/contactBG.png";
import locationImg from "../assets/conlocation.png"; // change filename if different

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const formatted = value.replace(/[^0-9+\s-]/g, "");
      setForm((prev) => ({ ...prev, [name]: formatted }));
      const digits = formatted.replace(/\D/g, "");
      if (digits.length >= 10 && digits.length <= 12) {
        if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 10 || phoneDigits.length > 12) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!form.message.trim() || form.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return;
    if (!validateForm()) return;

    setSubmitting(true);
    setServerError("");
    setErrors({});

    try {
      const response = await api.post("/contacts", form);
      alert(response.data?.message || "Thank you! Your message has been sent.");
      setForm({ name: "", phone: "", email: "", message: "" });
      setAgreed(false);
    } catch (err) {
      console.error("Submission failed:", err);
      const apiErrors = err.response?.data?.errors;
      if (Array.isArray(apiErrors) && apiErrors.length > 0) {
        const backendErrors = {};
        apiErrors.forEach((e) => { backendErrors[e.field] = e.message; });
        setErrors(backendErrors);
      } else {
        setServerError(err.response?.data?.message || "Failed to submit. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const getInputClass = (field) =>
    `w-full bg-transparent border-0 border-b px-0 py-3 text-sm text-black placeholder:text-gray-500 outline-none transition-colors ${
      errors[field] ? "border-red-500 focus:border-red-500" : "border-gray-400 focus:border-[#d49570]"
    }`;


  return (
    <div className="bg-[#f5f5f5] min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ========== HERO ========== */}
      <div className="relative w-full">
        <div className="relative w-full h-[50vh] min-h-[420px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${contactBg})`,
              filter: "brightness(1.15) contrast(1.05)",
            }}
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-20">
            <Navbar
              activeLink="contact"
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
              Contact 
            </h1>
            <p className="text-black/90 text-base md:text-lg leading-relaxed">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
              Industry. Lorem Ipsum Has Been The IndustLorem Ipsum Is Simply
            </p>
          </div>
        </div>
      </div>

      {/* ========== LEFT INFO + RIGHT FORM ========== */}
      <section className="pt-36 md:pt-44 pb-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* ===== LEFT ===== */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
              Let Us Help You
            </h2>
            <p className="text-black/85 text-lg md:text-xl leading-relaxed max-w-xl mb-12">
              Are You An Existing Customer Or Worked With Us In The Past?
              Request Support Through The Client Support Portal. This Form Does
              Not Connect To Our IT Support.
            </p>

            {/* 2x2 info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
              {/* PHONE */}
              <div className="flex items-start gap-4 py-7 border-b border-gray-400">
                <div className="w-11 h-11 rounded-full bg-[#f4c7a8] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.4 21 3 13.6 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-black uppercase tracking-tight mb-1">
                    PHONE
                  </p>
                  <p className="text-base md:text-lg text-black/80 font-normal leading-relaxed">
                    +91-984 670 3555,
                    <br />
                    +91-984 670 3555
                  </p>
                </div>
              </div>

              {/* MAIL */}
              <div className="flex items-start gap-4 py-7 border-b border-gray-400">
                <div className="w-11 h-11 rounded-full bg-[#f4c7a8] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-black uppercase tracking-tight mb-1">
                    MAIL
                  </p>
                  <p className="text-base md:text-lg text-black/80 font-normal leading-relaxed">
                    info@kics.com
                  </p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-4 py-7">
                <div className="w-11 h-11 rounded-full bg-[#f4c7a8] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-black uppercase tracking-tight mb-1">
                    ADDRESS
                  </p>
                  <p className="text-base md:text-lg text-black/80 font-normal leading-relaxed">
                    Lorem Ipsum Is Simply
                    <br />
                    Dummy Text Of Th
                  </p>
                </div>
              </div>

              {/* WORKING HOURS */}
              <div className="flex items-start gap-4 py-7">
                <div className="w-11 h-11 rounded-full bg-[#f4c7a8] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-black uppercase tracking-tight mb-1">
                    WORKING HOURS
                  </p>
                  <p className="text-base md:text-lg text-black/80 font-normal leading-relaxed">
                    Monday - Friday
                    <br />
                    9:00 am - 6:30 pm
                  </p>
                </div>
              </div>
            </div>
          </div>

           {/* ===== RIGHT — FORM CARD ===== */}
          <div className="bg-white rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.12)] p-6 md:p-8 w-full max-w-md lg:max-w-none lg:justify-self-end">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-xl text-gray-500 mb-1">Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className={getInputClass("name")} required />
                {errors.name && <p className="text-xs text-red-500 font-medium mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xl text-gray-500 mb-1">Phone <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" placeholder="Enter 10-digit phone number" value={form.phone} onChange={handleChange} className={getInputClass("phone")} required />
                {errors.phone && <p className="text-xs text-red-500 font-medium mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xl text-gray-500 mb-1">Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className={getInputClass("email")} required />
                {errors.email && <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xl text-gray-500 mb-1">Message <span className="text-red-500">*</span></label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3} className={`${getInputClass("message")} resize-none`} required />
                {errors.message && <p className="text-xs text-red-500 font-medium mt-1">{errors.message}</p>}
              </div>

              {serverError && <p className="text-xs text-red-500 font-medium text-center">{serverError}</p>}

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#d49570] cursor-pointer" />
                <span className="text-xs text-gray-500 leading-relaxed">I agree that my submitted data is being collected and stored.</span>
              </label>

              <button type="submit" disabled={!agreed || submitting} className="self-start bg-[#d4a07a] hover:bg-[#c98358] text-white text-sm font-medium px-6 py-3 rounded-md transition-all duration-200 hover:shadow-[3px_3px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] disabled:opacity-50">
                {submitting ? "Sending..." : "Send Message"}
              </button>
                            {/* <button
                type="submit"
                disabled={!agreed || submitting}
                className="self-start inline-flex items-center justify-center bg-[#d49570] hover:bg-[#c98358] text-white text-xs sm:text-sm font-medium px-5 py-3.5 rounded-md shadow-none hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200 whitespace-nowrap disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button> */}
            </form>
          </div>
        </div>
      </section>

      {/* ========== LOCATION IMAGE ========== */}
      <section className="px-6 md:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200/50">
            <img
              src={locationImg}
              alt="Location Map"
              className="w-full h-auto block"
            />
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

export default Contact;