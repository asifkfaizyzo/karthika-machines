import prisma from "../src/config/db.js";

// ⚠️ PASTE YOUR 12 CLOUDINARY COURSE IMAGE URLS
const C1 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519474/course1.png";
const C2 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519490/course2.png";
const C3 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519514/course3.png";
const C4 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519539/course4.png";
const C5 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519570/course5.png";
const C6 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519599/course6.png";
const C7 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519631/course7.png";
const C8 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519687/course8.png";
const C9 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519718/course9.png";
const C10 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519752/course10.png";
const C11 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519820/course11.png";
const C12 = "https://res.cloudinary.com/of49cdto/image/upload/v1788519863/course12.png";

// Optional left-side about image (or reuse main image)
const ABOUT = "https://res.cloudinary.com/of49cdto/image/upload/v1788520795/courseDetailsimg.png";

const toSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function main() {
  console.log("🌱 Cleaning courses...");
  await prisma.course.deleteMany({});

  const courses = [
    {
      title: "Non Surgical Facial Aesthetics",
      duration: "3 Months",
      qualification: "MBBS / BDS / MDS",
      mainImage: C1,
      aboutImage: ABOUT,
      shortDescription:
        "Hands-on clinical training in injectables, skin boosters, and non-surgical facial rejuvenation protocols for medical practitioners.",
      longDescription:
        "This advanced medical aesthetics program is designed for qualified doctors seeking structured training in non-surgical facial rejuvenation. You will learn patient assessment, facial anatomy mapping, product selection, and safe injection protocols used in modern aesthetic clinics.\n\nThe course combines theory with supervised practical sessions so you can confidently deliver natural-looking results while following medical safety standards and documentation best practices.",
      keyPoints: [
        "Facial anatomy and danger-zone mapping",
        "Patient consultation and treatment planning",
        "Injectables and skin booster protocols",
        "Complication prevention and management",
        "Clinical photography and case documentation",
        "Clinic setup and ethical practice guidelines",
      ],
      lessons: [
        { title: "1. Foundations of Facial Aesthetics", detail: "Core principles of facial aging, harmony, and patient-centered aesthetic planning." },
        { title: "2. Anatomy for Safe Aesthetic Practice", detail: "Vascular mapping, facial layers, and high-risk zones for injectables." },
        { title: "3. Consultation & Treatment Design", detail: "Medical history, consent, expectation management, and personalized protocols." },
        { title: "4. Practical Injection Techniques", detail: "Supervised technique practice with product handling and aseptic workflow." },
        { title: "5. Aftercare, Complications & Case Review", detail: "Post-treatment care, adverse event response, and clinical case discussion." },
      ],
    },
    {
      title: "Advanced Diploma In Cosmetology",
      duration: "3 Months",
      qualification: "10 Pass / +2",
      mainImage: C2,
      shortDescription:
        "Comprehensive professional cosmetology training covering skin, hair, advanced facial techniques, and salon-ready service delivery.",
      longDescription:
        "The Advanced Diploma in Cosmetology builds complete professional skills for modern beauty and aesthetic service environments. Learners develop strong foundations in skin analysis, treatment sequencing, product knowledge, and client communication.\n\nBy the end of the program, you will be ready to perform advanced beauty services confidently and work in salons, med-spas, or independent practice setups.",
      keyPoints: [
        "Professional skin analysis methods",
        "Advanced facial treatment routines",
        "Hair and scalp care fundamentals",
        "Hygiene and sterilization standards",
        "Client handling and retail skills",
        "Salon workflow and service packaging",
      ],
      lessons: [
        { title: "1. Cosmetology Fundamentals", detail: "Industry overview, professional ethics, and core service standards." },
        { title: "2. Skin Science & Product Chemistry", detail: "Skin types, common concerns, and active ingredient selection." },
        { title: "3. Advanced Facial Protocols", detail: "Step-by-step treatment flow for cleansing, extraction, and rejuvenation." },
        { title: "4. Hair & Scalp Treatments", detail: "Assessment methods and corrective care routines for common concerns." },
        { title: "5. Professional Practice & Career Skills", detail: "Client retention, service menu design, and workplace readiness." },
      ],
    },
    {
      title: "Diploma In Cosmetology",
      duration: "3 Months",
      qualification: "10 Pass / +2",
      mainImage: C3,
      shortDescription:
        "Beginner-to-pro diploma focused on essential beauty therapy skills, facial services, and professional salon techniques.",
      longDescription:
        "This diploma is ideal for beginners who want a strong start in cosmetology. It covers essential facial services, basic skin care science, hygiene standards, and practical client service skills.\n\nYou will complete practical training that prepares you for entry-level roles in beauty clinics and salons with confidence and professional finishing standards.",
      keyPoints: [
        "Basic to intermediate facial techniques",
        "Skin type identification",
        "Product application methods",
        "Salon hygiene and safety",
        "Client consultation basics",
        "Professional grooming standards",
      ],
      lessons: [
        { title: "1. Introduction to Professional Beauty Care", detail: "Career pathways, tools, and professional conduct in cosmetology." },
        { title: "2. Skin Basics & Facial Preparation", detail: "Cleansing, analysis, and preparation steps before treatment." },
        { title: "3. Core Facial Service Techniques", detail: "Practical methods for common salon facial services." },
        { title: "4. Hygiene, Safety & Tools Handling", detail: "Sterilization, tool care, and infection-control practices." },
        { title: "5. Client Service Excellence", detail: "Communication, service timing, and finishing presentation." },
      ],
    },
    {
      title: "Advanced Diploma In Micropigmentation",
      duration: "3 Months",
      qualification: "10 Pass / +2",
      mainImage: C4,
      shortDescription:
        "Specialized training in permanent makeup techniques, pigment theory, machine handling, and brow/lip procedures.",
      longDescription:
        "This advanced program trains you in professional micropigmentation with a strong focus on safety, symmetry, pigment selection, and machine control. You will learn mapping methods and procedure flow used in modern PMU studios.\n\nPractical modules help you build precision and consistency for brows, lips, and corrective work under professional standards.",
      keyPoints: [
        "Pigment theory and color matching",
        "Brow mapping and symmetry techniques",
        "Machine setup and needle selection",
        "Skin undertone analysis",
        "Procedure hygiene protocols",
        "Healed-result evaluation methods",
      ],
      lessons: [
        { title: "1. PMU Foundations & Safety", detail: "Workstation setup, consent, and infection-control essentials." },
        { title: "2. Color Theory for Micropigmentation", detail: "Undertones, pigment behavior, and correction basics." },
        { title: "3. Brow Design & Mapping", detail: "Face shape analysis and precise brow architecture." },
        { title: "4. Machine Techniques & Practice", detail: "Speed, depth control, and stroke consistency drills." },
        { title: "5. Aftercare & Result Management", detail: "Client aftercare, touch-up planning, and outcome review." },
      ],
    },
    {
      title: "Diploma In SMPU",
      duration: "3 Months",
      qualification: "10 Pass / +2",
      mainImage: C5,
      shortDescription:
        "Focused semi-permanent makeup diploma covering core SMPU procedures, safety standards, and client customization.",
      longDescription:
        "The Diploma in SMPU provides structured training for semi-permanent makeup services with emphasis on natural results and safe technique. Learners practice consultation, design planning, and controlled pigment implantation.\n\nThis course prepares you to deliver consistent SMPU services with professional finishing and proper aftercare guidance.",
      keyPoints: [
        "SMPU service workflow",
        "Client suitability assessment",
        "Design and pre-draw methods",
        "Pigment implantation control",
        "Sanitation and cross-contamination prevention",
        "Touch-up and maintenance planning",
      ],
      lessons: [
        { title: "1. Introduction to SMPU Practice", detail: "Scope of services, tools, and professional standards." },
        { title: "2. Consultation & Design Planning", detail: "Client goals, facial assessment, and pre-draw techniques." },
        { title: "3. Core Procedure Techniques", detail: "Step-by-step practical process for standard SMPU services." },
        { title: "4. Safety & Pigment Handling", detail: "Sterile workflow, pigment preparation, and machine hygiene." },
        { title: "5. Healing Process & Client Follow-up", detail: "Expected healing stages and retention improvement tips." },
      ],
    },
    {
      title: "Diploma In Skin Therapy",
      duration: "3 Months",
      qualification: "10 Pass / +2",
      mainImage: C6,
      shortDescription:
        "Clinical-style skin therapy training for acne, pigmentation, sensitivity, and corrective facial treatment planning.",
      longDescription:
        "This diploma develops practical skin therapy skills for common dermatological-cosmetic concerns. You will learn structured skin analysis and corrective treatment planning based on condition severity and skin tolerance.\n\nThe program emphasizes safe protocol selection so you can deliver visible improvement while protecting the skin barrier.",
      keyPoints: [
        "Advanced skin analysis",
        "Acne and congestion protocols",
        "Pigmentation care pathways",
        "Barrier repair strategies",
        "Treatment sequencing and layering",
        "Home-care prescription basics",
      ],
      lessons: [
        { title: "1. Skin Therapy Foundations", detail: "Skin barrier science and condition classification." },
        { title: "2. Diagnostic Facial Analysis", detail: "Visual and tactile assessment methods for treatment planning." },
        { title: "3. Corrective Treatment Protocols", detail: "Condition-based facial routines and product selection." },
        { title: "4. Device-Assisted Skin Therapy Basics", detail: "Safe use of supportive aesthetic devices in therapy plans." },
        { title: "5. Result Tracking & Client Education", detail: "Progress evaluation and sustainable home-care guidance." },
      ],
    },
    {
      title: "Diploma In Medi-Facial",
      duration: "3 Months",
      qualification: "10 Pass / +2",
      mainImage: C7,
      shortDescription:
        "Medical facial techniques training focused on clinical protocols, peels support care, and result-driven facial services.",
      longDescription:
        "The Medi-Facial diploma trains you to perform result-oriented facial services used in clinical beauty environments. You will understand indication-based protocol building and safe combination of active products.\n\nPractical sessions help you deliver medi-facial services with professional timing, hygiene, and post-care standards.",
      keyPoints: [
        "Medi-facial protocol design",
        "Active ingredient understanding",
        "Pre- and post-care standards",
        "Sensitive skin handling",
        "Combination treatment planning",
        "Clinic-ready service presentation",
      ],
      lessons: [
        { title: "1. Introduction to Medi-Facial Services", detail: "Differences between classic and clinical facial approaches." },
        { title: "2. Skin Indication Mapping", detail: "Selecting protocols based on concern and tolerance level." },
        { title: "3. Practical Medi-Facial Techniques", detail: "Hands-on service flow from prep to finishing mask." },
        { title: "4. Actives, Peel Support & Safety", detail: "Safe use of actives and supportive peel-care methods." },
        { title: "5. Aftercare & Maintenance Plans", detail: "Client guidance for longer-lasting treatment outcomes." },
      ],
    },
    {
      title: "Diploma In Laser Aesthetics",
      duration: "3 Months",
      qualification: "10 Pass / +2",
      mainImage: C8,
      shortDescription:
        "Laser aesthetics foundation covering hair reduction, pigmentation support protocols, safety parameters, and machine handling.",
      longDescription:
        "This diploma introduces professional laser aesthetic practice with a strong safety-first approach. You will learn parameter selection, skin typing, and indication-based laser service planning.\n\nTraining includes practical machine handling so you can assist or perform laser aesthetic services under proper clinical guidelines.",
      keyPoints: [
        "Laser physics basics",
        "Fitzpatrick skin typing",
        "Parameter selection principles",
        "Hair reduction protocols",
        "Pigmentation laser support care",
        "Laser safety and eye protection",
      ],
      lessons: [
        { title: "1. Laser Science for Aesthetic Practice", detail: "Wavelengths, chromophores, and tissue interaction basics." },
        { title: "2. Skin Typing & Candidate Selection", detail: "Safety screening and contraindication checks." },
        { title: "3. Hair Reduction Protocols", detail: "Session planning, fluence concepts, and practical workflow." },
        { title: "4. Pigmentation & Skin Rejuvenation Support", detail: "Indication-based supportive laser aesthetic approaches." },
        { title: "5. Safety, Documentation & Client Care", detail: "Protective standards, records, and post-laser care." },
      ],
    },
    {
      title: "Acne Master Class",
      duration: "3 Months",
      qualification: "Cosmetologist / Beauty Therapist",
      mainImage: C9,
      shortDescription:
        "Specialized master class for acne assessment, corrective facial protocols, and long-term skin clarity maintenance.",
      longDescription:
        "The Acne Master Class is designed for beauty professionals who want advanced competence in acne-focused treatments. You will learn to identify acne types, triggers, and suitable corrective routines.\n\nThe program focuses on practical protocols that improve clarity while minimizing irritation and rebound breakouts.",
      keyPoints: [
        "Acne type classification",
        "Trigger and lifestyle assessment",
        "Corrective facial protocols",
        "Extraction safety standards",
        "Barrier-friendly product planning",
        "Maintenance program design",
      ],
      lessons: [
        { title: "1. Acne Pathology for Therapists", detail: "Causes, grades, and clinical presentation patterns." },
        { title: "2. Consultation & Skin Mapping", detail: "History taking and zone-based acne assessment." },
        { title: "3. In-Clinic Corrective Protocols", detail: "Stepwise treatment plans for mild to moderate acne." },
        { title: "4. Product Strategy & Home Care", detail: "Actives selection and sustainable daily routines." },
        { title: "5. Relapse Prevention & Case Handling", detail: "Follow-up structure and long-term clarity plans." },
      ],
    },
    {
      title: "Anti-Ageing Master Class",
      duration: "3 Months",
      qualification: "Cosmetologist / Beauty Therapist",
      mainImage: C10,
      shortDescription:
        "Advanced anti-ageing training focused on lifting facial methods, collagen-support care, and age-group treatment design.",
      longDescription:
        "This master class helps professionals deliver structured anti-ageing facial services with visible firmness and glow outcomes. You will study aging patterns and build age-appropriate treatment plans.\n\nPractical modules cover advanced techniques and product layering strategies used in premium aesthetic skincare services.",
      keyPoints: [
        "Facial aging pattern analysis",
        "Collagen-support treatment design",
        "Lifting massage and protocol flow",
        "Premium anti-age product layering",
        "Eye and neck care integration",
        "Result photography and tracking",
      ],
      lessons: [
        { title: "1. Science of Skin Aging", detail: "Intrinsic and extrinsic aging factors affecting treatment choice." },
        { title: "2. Assessment by Age Group", detail: "Custom planning for early, mid, and advanced aging concerns." },
        { title: "3. Advanced Anti-Ageing Facial Methods", detail: "Hands-on techniques for firmness and radiance improvement." },
        { title: "4. Device & Product Combination Basics", detail: "Safe supportive combinations for enhanced outcomes." },
        { title: "5. Maintenance Programs for Long-Term Results", detail: "Monthly plans and home-care alignment strategies." },
      ],
    },
    {
      title: "Chemical Peeling Master Class",
      duration: "3 Months",
      qualification: "Cosmetologist / Beauty Therapist",
      mainImage: C11,
      shortDescription:
        "Professional peeling master class covering peel types, layering methods, neutralization, and complication management.",
      longDescription:
        "This master class provides structured knowledge of cosmetic chemical peels used for glow, texture, and pigmentation improvement. You will learn peel selection by skin type and concern intensity.\n\nEmphasis is placed on safety, endpoint recognition, and correct aftercare so results remain controlled and professional.",
      keyPoints: [
        "Peel classification and strengths",
        "Skin priming methods",
        "Layering and timing control",
        "Endpoint recognition",
        "Neutralization and post-peel care",
        "Complication prevention protocols",
      ],
      lessons: [
        { title: "1. Peel Chemistry Essentials", detail: "Acids, depth concepts, and indication matching." },
        { title: "2. Candidate Selection & Priming", detail: "Preparation routines that improve peel safety and results." },
        { title: "3. Practical Peel Application", detail: "Step-by-step application, timing, and observation methods." },
        { title: "4. Neutralization & Immediate Aftercare", detail: "Post-procedure handling and recovery support." },
        { title: "5. Complications & Correction Planning", detail: "Identifying adverse responses and corrective actions." },
      ],
    },
    {
      title: "Skin Brightening Master Class",
      duration: "3 Months",
      qualification: "Cosmetologist / Beauty Therapist",
      mainImage: C12,
      shortDescription:
        "Targeted brightening program for dullness, uneven tone, and glow-focused facial protocols with safe active usage.",
      longDescription:
        "The Skin Brightening Master Class trains professionals to correct dullness and uneven tone using structured facial protocols. You will learn to identify tone concerns and choose suitable brightening pathways.\n\nThe course balances effective glow results with barrier safety, making your brightening services more consistent and client-friendly.",
      keyPoints: [
        "Tone and undertone assessment",
        "Dullness correction protocols",
        "Safe brightening actives usage",
        "Glow facial sequencing",
        "Sun-care and maintenance guidance",
        "Sensitive-skin brightening adaptations",
      ],
      lessons: [
        { title: "1. Brightening Science for Therapists", detail: "Melanin basics and causes of uneven skin tone." },
        { title: "2. Diagnostic Glow Assessment", detail: "Identifying dehydration, dullness, and pigmentation overlap." },
        { title: "3. In-Clinic Brightening Protocols", detail: "Practical facial routines for visible radiance improvement." },
        { title: "4. Actives, Masks & Layering Strategy", detail: "Product selection and safe combination methods." },
        { title: "5. Maintenance & Client Home Care", detail: "Sustainable glow plans and photo-protection guidance." },
      ],
    },
  ];

  for (const c of courses) {
    await prisma.course.create({
      data: {
        title: c.title,
        slug: toSlug(c.title),
        duration: c.duration,
        qualification: c.qualification,
        students: "135 Students",
        shortDescription: c.shortDescription,
        longDescription: c.longDescription,
        mainImage: c.mainImage,
        aboutImage: ABOUT || c.mainImage,
        rating: 4.0,
        keyPoints: {
          create: c.keyPoints.map((text, i) => ({ text, order: i + 1 })),
        },
        lessons: {
          create: c.lessons.map((l, i) => ({
            title: l.title,
            detail: l.detail,
            order: i + 1,
          })),
        },
      },
    });
  }

  console.log("✅ Seeded 12 courses with exact titles + key points + lessons");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });