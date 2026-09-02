// src/pages/Courses.jsx
import React, { useState } from "react";
import { Clock3, GraduationCap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModel";
import { useNavigate } from "react-router-dom";

// --- YOUR ASSETS ---
import topBackgroundImg from "../assets/courseBG.png";
import cardImg1 from "../assets/course1.png";
import cardImg2 from "../assets/course2.png";
import cardImg3 from "../assets/course3.png";
import cardImg4 from "../assets/course4.png";
import cardImg5 from "../assets/course5.png";
import cardImg6 from "../assets/course6.png";
import cardImg7 from "../assets/course7.png";
import cardImg8 from "../assets/course8.png";
import cardImg9 from "../assets/course9.png";
import cardImg10 from "../assets/course10.png";
import cardImg11 from "../assets/course11.png";
import cardImg12 from "../assets/course12.png";

const btnCard =
  "flex-1 inline-flex items-center justify-center bg-[#d4a07a] hover:bg-[#c98358] text-white text-sm font-medium px-4 py-3 rounded-md shadow-none hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap";

const courseList = [
  // --- REAL DATA (1 to 3) ---
  {
    id: 1,
    image: cardImg1,
    title: "Non Surgical Facial Aesthetics",

    duration: "3 Months",
    qualification: "MBBS / BDS / MDS",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 2,
    image: cardImg2,
    title: "Advanced Diploma In Cosmetology",

    duration: "3 Months",
    qualification: "10 Pass / +2",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 3,
    image: cardImg3,
    title: "Diploma In Cosmetology",

    duration: "3 Months",
    qualification: "10 Pass / +2",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },

  // --- READY FOR YOUR REAL DATA (4 to 12) ---
  {
    id: 4,
    image: cardImg4,
    title: "Advanced Diploma In Micropigmentation",
    duration: "3 Months",
    qualification: "10 Pass / +2",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 5,
    image: cardImg5,
    title: "Diploma In SMPU",
    duration: "3 Months",
    qualification: "10 Pass / +2",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 6,
    image: cardImg6,
    title: "Diploma In Skin Therapy",
    duration: "3 Months",
    qualification: "10 Pass / +2",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 7,
    image: cardImg7,
    title: "Diploma In Medi-Facial",
    duration: "3 Months",
    qualification: "10 Pass / +2",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 8,
    image: cardImg8,
    title: "Diploma In Laser Aesthetics",
    duration: "3 Months",
    qualification: "10 Pass / +2",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 9,
    image: cardImg9,
    title: "Acne Master Class",
    duration: "3 Months",
    qualification: "Cosmetologist / Beauty Therapist",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 10,
    image: cardImg10,
    title: "Anti-Ageing Master Class",
    duration: "3 Months",
    qualification: "Cosmetologist / Beauty Therapist",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 11,
    image: cardImg11,
    title: "Chemical Peeling Master Class",
    duration: "3 Months",
    qualification: "Cosmetologist / Beauty Therapist",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been...",
  },
  {
    id: 12,
    image: cardImg12,
    title: "Skin Brightening Master Class",
    duration: "3 Months",
    qualification: "Cosmetologist / Beauty Therapist",
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

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();

  return (
    <div className="bg-[#f7f7f7] min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      {/* HERO SECTION */}
      <div className="relative w-full">
        <div className="relative w-full h-[50vh] min-h-[420px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${topBackgroundImg})`,
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
             Demonstration
            </h1>
            <p className="text-black/90 text-base md:text-lg leading-relaxed">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
              Industry. Lorem Ipsum Has Been The IndustLorem Ipsum Is Simply
            </p>
          </div>
        </div>
      </div>

      {/* COURSE CARDS */}
      <section className="pt-16 pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {courseList.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col min-h-[450px] 
              transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/50 hover:border-gray-400"
            >
              {/* Image */}
              <div className="bg-[#e8e8e8] h-[230px] md:h-[230px] w-full overflow-hidden shrink-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <StarRating />

                <h3 className="text-base md:text-lg font-bold text-black mb-1 leading-snug">
                  {course.title}
                </h3>

                <p className="text-base font-semibold text-black mb-2">
                  {course.price}
                </p>

                {/* Duration + Qualification */}
                {(course.duration || course.qualification) && (
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-black mb-3">
                    {course.duration && (
                      <div className="flex items-center gap-1.5 text-black">
                        <Clock3
                          size={16}
                          strokeWidth={2.5}
                          className="text-black"
                        />
                        <span className="text-black font-semibold">
                          {course.duration}
                        </span>
                      </div>
                    )}

                    {course.qualification && (
                      <div className="flex items-center gap-1.5 text-black">
                        <GraduationCap
                          size={17}
                          strokeWidth={2.5}
                          className="text-black"
                        />
                        <span className="text-black font-semibold">
                          {course.qualification}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-sm text-black leading-relaxed mb-4 flex-1">
                  {course.desc}
                </p>

                {/* Line above buttons */}
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
                      // onClick={() => navigate(`/courses/${course.id}`)}
                      onClick={() =>
                        navigate(`/courses/${course.id}`, {
                          state: {
                            title: course.title,
                            desc: course.desc,
                            duration: course.duration,
                            qualification: course.qualification,
                            students: "135 Students",
                          },
                        })
                      }
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
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Courses;
