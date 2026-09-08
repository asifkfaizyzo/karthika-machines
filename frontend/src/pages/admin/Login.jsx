import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  // Validation function
  const validate = (data) => {
    const errs = {};

    if (!data.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!data.password) {
      errs.password = "Password is required";
    } else if (data.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    // Live validation only if field was touched once
    if (touched[name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validate(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    // Validate all
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate("/admin");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FAF6F0] via-[#F4ECE1] to-[#EFE4D6] px-4 font-sans">
      
      {/* Brand Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-serif font-bold text-[#111111] tracking-tight">
          Karthika
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mt-2 font-medium">
          ADMIN PANEL
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.05)] p-8 md:p-10">
        <h2 className="text-2xl font-bold text-[#111111] mb-1">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-8">
          Sign in to manage your dashboard
        </p>

        {serverError && (
          <div className="mb-6 p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate autoComplete="off">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Email Address"
              autoComplete="off"
              className={`w-full px-4 py-3.5 rounded-xl border text-sm transition placeholder:text-gray-400 focus:outline-none focus:ring-1
                ${errors.email 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                  : "border-gray-200 focus:border-gray-800 focus:ring-gray-800"
                }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password"
              autoComplete="new-password"
              className={`w-full px-4 py-3.5 rounded-xl border text-sm transition placeholder:text-gray-400 focus:outline-none focus:ring-1
                ${errors.password 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                  : "border-gray-200 focus:border-gray-800 focus:ring-gray-800"
                }`}
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#18181b] hover:bg-black text-white py-3.5 rounded-xl font-medium transition disabled:opacity-60 text-sm mt-2 shadow-sm"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>

      <p className="mt-12 text-xs text-gray-400">
        © 2026 Karthika Cosmetics. All rights reserved.
      </p>
    </div>
  );
};

export default Login;