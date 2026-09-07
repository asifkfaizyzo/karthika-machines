import React, { useState } from "react";
import api from "../api/axios";

const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    role: "",
    city: "",
    interest: "",
    connectionMethods: ["phone"],
    additionalInfo: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  if (!isOpen) return null;

  // Frontend Validation for all required fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 10 || phoneDigits.length > 12) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business / Clinic name is required";
    }

    if (!formData.interest) {
      newErrors.interest = "Please select an interest";
    }

    if (formData.connectionMethods.length === 0) {
      newErrors.connectionMethods = "Select at least one connection method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run frontend validation before hitting API
    if (!validateForm()) return;

    setSubmitting(true);
    setServerError("");
    setErrors({});

    try {
      const response = await api.post("/consultations", formData);

      alert(
        response.data?.message ||
          "Thank you! Your consultation request has been received."
      );

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        businessName: "",
        role: "",
        city: "",
        interest: "",
        connectionMethods: ["phone"],
        additionalInfo: "",
      });

      onClose();
    } catch (err) {
      console.error("Consultation submit failed:", err);

      const apiErrors = err.response?.data?.errors;
      if (Array.isArray(apiErrors) && apiErrors.length > 0) {
        // Map backend errors to our inputs
        const backendErrors = {};
        apiErrors.forEach((err) => {
          backendErrors[err.field] = err.message;
        });
        setErrors(backendErrors);
      } else if (err.response?.data?.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Failed to submit request. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const toggleConnection = (method) => {
    setFormData((prev) => {
      const exists = prev.connectionMethods.includes(method);
      const updatedMethods = exists
        ? prev.connectionMethods.filter((m) => m !== method)
        : [...prev.connectionMethods, method];

      // Clear error if user selects at least one
      if (updatedMethods.length > 0) {
        setErrors((prevErrors) => ({ ...prevErrors, connectionMethods: "" }));
      }

      return { ...prev, connectionMethods: updatedMethods };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/75 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full max-w-xl bg-white shadow-2xl h-[100dvh] max-h-[100dvh] overflow-y-auto text-gray-800 p-5 sm:p-6 flex flex-col">
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-2xl font-light p-1 transition"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#fceee6] flex items-center justify-center shrink-0 text-[#d49570]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              Book Your Free Consultation
            </h3>
            <p className="text-black text-sm mt-1">
              Share your details and our experts will connect with you.
            </p>
          </div>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex-1 flex flex-col justify-between gap-3 min-h-0"
        >
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: "" });
                  }}
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-white border rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none transition ${
                    errors.fullName
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[#d49570] focus:ring-1 focus:ring-[#d49570]"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-white border rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none transition ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[#d49570] focus:ring-1 focus:ring-[#d49570]"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Phone & Business Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={formData.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9+\s-]/g, "");
                    setFormData({ ...formData, phone: val });
                    const digits = val.replace(/\D/g, "");
                    if (digits.length >= 10 && digits.length <= 12) {
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }
                  }}
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-white border rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none transition ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[#d49570] focus:ring-1 focus:ring-[#d49570]"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Business / Clinic Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                Business / Clinic Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Enter business name"
                  value={formData.businessName}
                  onChange={(e) => {
                    setFormData({ ...formData, businessName: e.target.value });
                    if (errors.businessName) setErrors({ ...errors, businessName: "" });
                  }}
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-white border rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none transition ${
                    errors.businessName
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[#d49570] focus:ring-1 focus:ring-[#d49570]"
                  }`}
                />
              </div>
              {errors.businessName && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  {errors.businessName}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Role & City (Optional - standard styling) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                I am a
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Enter your role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#d49570] focus:ring-1 focus:ring-[#d49570] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                City
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#d49570] focus:ring-1 focus:ring-[#d49570] transition"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Dropdown Interest */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
              What are you interested in? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.interest}
                onChange={(e) => {
                  setFormData({ ...formData, interest: e.target.value });
                  if (errors.interest) setErrors({ ...errors, interest: "" });
                }}
                className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-gray-500 outline-none appearance-none cursor-pointer transition ${
                  errors.interest
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:border-[#d49570] focus:ring-1 focus:ring-[#d49570]"
                }`}
              >
                <option value="" disabled hidden>
                  Select treatment / All about product detailing
                </option>
                <option value="diode-laser" className="text-gray-800">
                  Diode Laser Machine
                </option>
                <option value="hydra-facial" className="text-gray-800">
                  Hydra Facial Machine
                </option>
                <option value="rf-tightening" className="text-gray-800">
                  RF Skin Tightening Machine
                </option>
                <option value="ipl-laser" className="text-gray-800">
                  IPL Laser Machine
                </option>
                <option value="cosmetology-course" className="text-gray-800">
                  Cosmetology Training Courses
                </option>
              </select>
              <svg
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {errors.interest && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {errors.interest}
              </p>
            )}
          </div>

          {/* Row 5: Preference Toggles */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
              How would you prefer to connect? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => toggleConnection("phone")}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-md border text-sm font-medium transition ${
                  formData.connectionMethods.includes("phone")
                    ? "bg-gray-100 border-gray-300 text-gray-900"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone Call
              </button>

              <button
                type="button"
                onClick={() => toggleConnection("whatsapp")}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-md border text-sm font-medium transition ${
                  formData.connectionMethods.includes("whatsapp")
                    ? "bg-gray-100 border-gray-300 text-gray-900"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 2c-5.417 0-9.826 4.384-9.826 9.771 0 2.076.678 4.017 1.926 5.592l-1.381 4.637 4.821-1.258c1.517.954 3.284 1.487 5.088 1.487 5.417 0 9.826-4.384 9.826-9.771 0-5.387-4.409-9.771-9.826-9.771zm5.729 13.923c-.244.688-1.233 1.309-1.996 1.393-.523.058-1.205.103-3.522-.858-2.962-1.228-4.869-4.238-5.018-4.436-.148-.198-1.205-1.605-1.205-3.061 0-1.456.764-2.173 1.037-2.467.273-.294.595-.368.793-.368.198 0 .396.002.568.01.182.008.428-.069.67.525.244.594.832 2.033.905 2.181.073.148.123.322.025.518-.098.198-.148.322-.294.495-.148.173-.31.388-.443.521-.148.148-.302.31-.13.571.173.261.768 1.268 1.65 2.052 1.135 1.008 2.091 1.321 2.388 1.469.297.148.471.123.644-.074.173-.198.743-.866.941-1.163.198-.297.396-.247.669-.148.273.098 1.731.816 2.028.964.297.148.495.223.568.347.073.123.073.714-.171 1.402z" />
                </svg>
                WhatsApp
              </button>
            </div>
            {errors.connectionMethods && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {errors.connectionMethods}
              </p>
            )}
          </div>

          {/* Row 6: Textarea (Optional - standard styling) */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
              Additional Requirements (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Please tell us more about your requirements........"
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              className="w-full p-3.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#d49570] focus:ring-1 focus:ring-[#d49570] resize-none transition"
            ></textarea>
          </div>

          {serverError && (
            <p className="text-xs text-red-500 font-medium text-center mt-1">
              {serverError}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#d49570] hover:bg-[#c98358] text-white font-medium py-3.5 px-4 rounded-md flex items-center justify-center gap-2 text-base shadow-none hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200 mt-2 disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {submitting ? "Submitting..." : "Book Our Consultation"}
          </button>

          {/* Confidentiality Footer */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 pt-1">
            <svg className="w-3.5 h-3.5 text-[#d49570]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Your information 100% secure and confidential.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationModal;