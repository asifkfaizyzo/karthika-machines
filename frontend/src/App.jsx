import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Public pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./components/ScrollToTop";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/products/ProductList";
import CourseList from "./pages/admin/courses/CourseList";
import TestimonialList from "./pages/admin/testimonials/TestimonialList";
import FounderList from "./pages/admin/founders/FounderList";
import ContactList from "./pages/admin/contacts/ContactList";
import ConsultationList from "./pages/admin/consultations/ConsultationList";
import FaqList from "./pages/admin/faqs/FaqList";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* -------- PUBLIC ROUTES -------- */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          {/* -------- ADMIN ROUTES -------- */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* All /admin/* routes wrapped cleanly */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductList />} />
              <Route path="courses" element={<CourseList />} />
              <Route path="testimonials" element={<TestimonialList />} />
              <Route path="founders" element={<FounderList />} />
              <Route path="contacts" element={<ContactList />} />
               <Route path="consultations" element={<ConsultationList />} />
               <Route path="faqs" element={<FaqList />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;