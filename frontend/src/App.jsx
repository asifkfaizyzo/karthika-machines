import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";

import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
        <ScrollToTop />
      <Routes>
        {/* URL: http://localhost:5173/ -> Shows Home */}
        <Route path="/" element={<Home />} />

        {/* URL: http://localhost:5173/products -> Shows Products */}
        <Route path="/products" element={<Products />} />
         <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;