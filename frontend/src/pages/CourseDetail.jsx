// src/pages/CourseDetail.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Clock3,
  GraduationCap,
  User,
  Phone,
  Mail,
  ChevronDown,
  Check,
} from "lucide-react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModel";
import detailBg from "../assets/courseDetailsBG.webp";

const btnPrimary =
  "inline-flex items-center justify-center bg-[#d4a07a] hover:bg-[#c98358] text-white text-sm font-medium px-5 py-3 rounded-md shadow-none hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap";

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

const CourseDetail = () => {
  const { id } = useParams(); // Accepts slug or numeric ID
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openLesson, setOpenLesson] = useState(null);

  // Fetch single course details dynamically from API
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("Course not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-[#d4a07a] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f7f7] px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
        <button
          onClick={() => navigate("/courses")}
          className="bg-[#d4a07a] text-white px-5 py-3 rounded-md"
        >
          Back to All Courses
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f7] min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      {/* HERO + BACKGROUND IMAGE */}
      <div className="relative w-full">
        <div className="relative w-full h-[50vh] min-h-[420px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${detailBg})`,
              filter: "brightness(1.1) contrast(1.05)",
            }}
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
              {course.title}
            </h1>

            <p className="text-black/90 text-base md:text-lg leading-relaxed mb-6">
              {course.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-black">
              <div className="flex items-center gap-2">
                <Clock3 size={16} strokeWidth={2.5} />
                <span>{course.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <GraduationCap size={17} strokeWidth={2.5} />
                <span>Qualification : {course.qualification}</span>
              </div>

              <div className="flex items-center gap-2">
                <User size={16} strokeWidth={2.5} />
                <span>{course.students || "135 Students"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ABOUT COURSE (left) + SIDEBAR (right) ================= */}
      <section className="pt-28 md:pt-32 pb-8 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* -------- LEFT COLUMN -------- */}
          <div className="lg:col-span-7 pb-4">
            <h2 className="text-3xl md:text-[40px] font-bold text-black mb-6 leading-tight">
              About Course
            </h2>

            <div className="space-y-6 text-black text-[17px] md:text-lg leading-relaxed mb-10 max-w-2xl">
              {course.longDescription ? (
                course.longDescription.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>{course.shortDescription}</p>
              )}
            </div>

            {/* Image under text */}
            <div className="rounded-2xl overflow-hidden w-full h-[260px] md:h-[320px] lg:h-[360px] mb-12 bg-[#eaeaea] flex items-center justify-center p-2">
              <img
                src={course.aboutImage || course.mainImage}
                alt={course.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* ---------- KEY POINTS ---------- */}
            {course.keyPoints && course.keyPoints.length > 0 && (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                  Key Points
                </h2>
                <div className="border-t border-gray-200 mb-6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mb-12">
                  {course.keyPoints.map((point, i) => (
                    <div key={point.id || i} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#e8c4b0] flex items-center justify-center">
                        <Check size={12} strokeWidth={3} className="text-[#c98358]" />
                      </span>
                      <p className="text-[15px] md:text-base text-black leading-snug">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ---------- COURSE LESSONS (accordion) ---------- */}
            {course.lessons && course.lessons.length > 0 && (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                  Course Lessons
                </h2>
                <div className="border-t border-gray-200 mb-6" />

                <div className="flex flex-col text-xl gap-3 pb-2">
                  {course.lessons.map((lesson) => {
                    const isOpen = openLesson === lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                          isOpen
                            ? "bg-white border border-[#d49570]/40 shadow-sm"
                            : "bg-[#f8e6dc]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                          className={`w-full flex items-center justify-between gap-4 text-left px-5 py-5 md:px-6 md:py-5 transition-colors duration-300 ${
                            isOpen
                              ? "bg-[#c48b6a] text-white"
                              : "bg-[#f8e6dc] text-black hover:bg-[#f3ddd0]"
                          }`}
                        >
                          <span className="text-sm md:text-base font-medium pr-4">
                            {lesson.title}
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
                            {lesson.detail}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* -------- RIGHT SIDEBAR -------- */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 w-full max-w-[420px] lg:ml-auto space-y-5 self-start">
              
              {/* Course Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <div className="bg-[#e8e8e8] h-[210px] md:h-[230px] w-full overflow-hidden">
                  <img
                    src={course.mainImage}
                    alt={course.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="p-5 flex flex-col">
                  <StarRating rating={course.rating} />

                  <h3 className="text-lg font-bold text-black mb-2 leading-snug">
                    {course.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-black mb-3">
                    <div className="flex items-center gap-1.5">
                      <Clock3 size={16} strokeWidth={2.5} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap size={17} strokeWidth={2.5} />
                      <span>{course.qualification}</span>
                    </div>
                  </div>

                  <p className="text-sm text-black leading-relaxed mb-5">
                    {course.shortDescription}
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

              {/* Contact Us Card */}
              <div className="bg-[#f8e6dc] rounded-2xl p-6 md:p-7">
                <h3 className="text-3xl font-medium text-black mb-5">
                  Contact Us
                </h3>

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

      {/* ================= RELATED COURSES (3 CARDS FROM DB) ================= */}
      {course.relatedCourses && course.relatedCourses.length > 0 && (
        <section className="pt-24 pb-24 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Related Courses
              </h2>
              <button
                type="button"
                onClick={() => navigate("/courses")} // NAVIGATE TO ALL COURSES
                className={btnPrimary}
              >
                All Courses
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
              {course.relatedCourses.map((rc) => (
                <div
                  key={rc.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col min-h-[480px]
                  transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/50 hover:border-gray-400"
                >
                  <div className="bg-[#e8e8e8] h-[230px] md:h-[250px] w-full overflow-hidden shrink-0">
                    <img
                      src={rc.mainImage}
                      alt={rc.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <StarRating rating={rc.rating} />

                    <h3 className="text-base md:text-lg font-bold text-black mb-2 leading-snug">
                      {rc.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-black mb-3">
                      <div className="flex items-center gap-1.5">
                        <Clock3 size={16} strokeWidth={2.5} />
                        <span>{rc.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GraduationCap size={17} strokeWidth={2.5} />
                        <span>{rc.qualification}</span>
                      </div>
                    </div>

                    <p className="text-sm text-black leading-relaxed mb-4 flex-1 line-clamp-3">
                      {rc.shortDescription}
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
                          onClick={() => navigate(`/courses/${rc.slug}`)} // NAVIGATE TO SPECIFIC COURSE
                          className={btnCard}
                        >
                          Learn About Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CourseDetail;