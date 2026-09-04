import prisma from "../src/config/db.js";

// ⚠️ PASTE YOUR 3 CLOUDINARY URLs HERE:
const IMG_1 = "https://res.cloudinary.com/of49cdto/image/upload/v1788511804/img1.png";
const IMG_2 = "https://res.cloudinary.com/of49cdto/image/upload/v1788511975/prodimg2.png";
const IMG_3 = "https://res.cloudinary.com/of49cdto/image/upload/v1788511993/prodimg3.png";

async function main() {
  console.log("🌱 Cleaning existing products...");
  await prisma.product.deleteMany({});

  console.log("🌱 Seeding products with Cloudinary URLs & exact design requirements...");

  const products = [
    // ============ PRODUCT 1 ============
    {
      title: "HydraFacial 7-in-1 Smart Machine",
      slug: "hydrafacial-7-in-1-smart-machine",
      price: "₹1,75,000*",
      shortDescription: "Deep pore cleansing, hydro-dermabrasion, oxygen infusion, and RF tightening in one professional clinic unit.",
      longDescription: "The HydraFacial 7-in-1 Smart Machine is a professional-grade aesthetic device engineered for modern dermatology and cosmetology clinics. It seamlessly integrates hydro-microdermabrasion, ultrasound nutrient infusion, bi-polar radiofrequency, cold hammer therapy, oxygen spray, and ultrasonic skin scrubber technologies into one unified platform.\n\nDesigned to deliver complete facial rejuvenation in a single session, this machine helps practitioners offer premium multi-step facials that combine cleansing, exfoliation, extraction, hydration, and antioxidant infusion with instant visible results and zero downtime for the client.",
      mainImage: IMG_1,
      aboutImage: IMG_1,
      rating: 4.8,
      features: [
        { text: "7 interchangeable clinical treatment handles" },
        { text: "Smart water circulation & vacuum sensor system" },
        { text: "HD skin diagnostics camera integration ready" },
        { text: "Medical grade ABS enclosure with anti-leak seals" },
        { text: "Silent operating dual-piston suction motor" },
        { text: "Full touch capacitive intuitive control interface" }
      ],
      specs: [
        { label: "Display", value: "10-Inch Touchscreen" },
        { label: "Power Supply", value: "AC 220V / 50Hz" },
        { label: "Power Consumption", value: "800W" },
        { label: "Vacuum Pressure", value: "Adjustable" },
        { label: "Treatment Handles", value: "7" },
        { label: "Machine Weight", value: "28 Kg" },
        { label: "Material", value: "Medical Grade ABS" },
        { label: "Certifications", value: "CE / ISO (Model Dependant)" }
      ],
      whyChoose: [
        { title: "1. Clinical Grade Performance with Zero Downtime", detail: "Enables multi-step facials combining deep cleansing, physical exfoliation, vacuum extraction, and localized hydration with zero post-session healing time." },
        { title: "2. Highly Cost-Effective Consumables & Fast ROI", detail: "Designed with low operational overheads per treatment, allowing clinic owners to recover capital investment within 3 to 5 months of operation." },
        { title: "3. German & Japanese Core Engineered Components", detail: "Fitted with silent dual-piston vacuum pumps and heavy-duty ultrasonic transducers, guaranteeing continuous performance under high daily clinical loads." },
        { title: "4. Intuitive Interactive Graphical Interface", detail: "Features a modern 10-inch capacitive color touchscreen with smart predefined settings for skin types, allowing quick and safe operational adjustments." },
        { title: "5. Comprehensive Warranty & Hands-on Training", detail: "Backed by a 1-year warranty, clinical protocol materials, full user training certification, and rapid 24/7 technical support response." }
      ]
    },

    // ============ PRODUCT 2 ============
    {
      title: "Diode Laser 808nm Hair Removal Machine",
      slug: "diode-laser-808nm-hair-removal",
      price: "₹2,50,000*",
      shortDescription: "Gold-standard 808nm diode laser system for permanent and painless hair reduction across all Fitzpatrick skin types.",
      longDescription: "The Diode Laser 808nm Hair Removal Machine is engineered with German-imported laser diode bars and high-power micro-channel cooling technology. It offers continuous sapphire contact cooling at -5°C for maximum patient comfort and rapid treatment coverage across large body areas.\n\nWith its clinically proven 808nm wavelength, this machine effectively targets melanin in the hair follicle while completely protecting surrounding skin tissues, delivering permanent hair reduction results safe for all skin tones from Fitzpatrick I through VI.",
      mainImage: IMG_2,
      aboutImage: IMG_2,
      rating: 4.9,
      features: [
        { text: "German micro-channel laser bar with 20 million shots" },
        { text: "Sapphire crystal contact cooling down to -5°C" },
        { text: "Fast in-motion gliding treatment mode up to 10Hz" },
        { text: "Intelligent preset skin tone & hair thickness modes" },
        { text: "Real-time water temperature safety monitoring" },
        { text: "Ergonomic lightweight handpiece with LED display" }
      ],
      specs: [
        { label: "Wavelength", value: "808nm Diode Laser" },
        { label: "Power Supply", value: "AC 220V / 50Hz" },
        { label: "Power Output", value: "1200W" },
        { label: "Spot Size", value: "12mm x 20mm" },
        { label: "Repetition Rate", value: "1 - 10 Hz Adjustable" },
        { label: "Machine Weight", value: "45 Kg" },
        { label: "Cooling System", value: "Semiconductor + Water + Air" },
        { label: "Certifications", value: "CE / FDA / ISO 13485" }
      ],
      whyChoose: [
        { title: "1. Painless Clinical Experience for Patients", detail: "Active thermoelectric contact cooling keeps the handpiece tip at a steady -5°C, numbing the skin surface to deliver high-fluence pulses painlessly." },
        { title: "2. Unmatched Laser Lifespan & Performance", detail: "Equipped with high-performance gold-tin welded laser bars imported directly from Germany, offering up to 20 million reliable flashes." },
        { title: "3. High Velocity Treatment Delivery Mode", detail: "Utilizes an advanced in-motion sweep technique with adjustable firing rates up to 10Hz, reducing session duration for large body parts to minutes." },
        { title: "4. Safe & Effective on All Skin Types (I - VI)", detail: "Smart internal software adjusts pulse width and cooling parameters automatically based on skin profiles, minimizing risk of epidermal burns." },
        { title: "5. Internal Self-Diagnostic Sensor System", detail: "Dual temperature, water-flow, and electrical safety sensors actively monitor the system in real-time, preventing fiber or bar breakdown." }
      ]
    },

    // ============ PRODUCT 3 ============
    {
      title: "RF Fractional Microneedling System",
      slug: "rf-fractional-microneedling-system",
      price: "₹2,10,000*",
      shortDescription: "Minimally invasive RF energy delivery for deep acne scar remodeling, skin tightening, and pore reduction.",
      longDescription: "The RF Fractional Microneedling System combines precision gold-plated microneedles with fractional radiofrequency energy to stimulate deep collagen synthesis in the reticular dermis without causing epidermal burns.\n\nThis dual-technology platform delivers superior clinical results for acne scars, stretch marks, wrinkles, and skin laxity by triggering controlled thermal coagulation zones deep within the tissue while keeping the outer skin layer safe and intact for rapid recovery.",
      mainImage: IMG_3,
      aboutImage: IMG_3,
      rating: 4.7,
      features: [
        { text: "Insulated & non-insulated gold-plated needle tips" },
        { text: "Adjustable needle penetration from 0.5mm to 3.5mm" },
        { text: "Vacuum-assisted suction for secure skin contact" },
        { text: "Bi-polar and mono-polar RF energy modes" },
        { text: "Real-time impedance monitoring for safety" },
        { text: "Multiple cartridge tips (10, 25, 64 pin & nano)" }
      ],
      specs: [
        { label: "RF Frequency", value: "2 MHz Bi-polar / Mono-polar" },
        { label: "Power Supply", value: "AC 220V / 50Hz" },
        { label: "Needle Depth", value: "0.5mm - 3.5mm (0.1mm Step)" },
        { label: "Cartridge Types", value: "10, 25, 64 Pin & Nano" },
        { label: "Treatment Speed", value: "0.5 - 2 seconds/shot" },
        { label: "Machine Weight", value: "22 Kg" },
        { label: "Material", value: "Medical Grade Gold-Plated" },
        { label: "Certifications", value: "CE / ISO 13485" }
      ],
      whyChoose: [
        { title: "1. Precise Multi-Depth Scar & Wrinkle Remodeling", detail: "Step-controlled motor adjusts needle depth from 0.5mm to 3.5mm with 0.1mm increments, allowing precise mapping of acne scars and stretch marks." },
        { title: "2. Dual Treatment Modes (Insulated / Non-Insulated)", detail: "Insulated needles protect the outer epidermis while discharging energy deep into targets; non-insulated needles treat multi-level tissue layers uniformly." },
        { title: "3. Vacuum-Assisted Skin Attachment Technology", detail: "The smart built-in vacuum system draws target areas tightly against the handpiece tip for secure needle insertion and uniform energy depth." },
        { title: "4. Medical-Grade Gold-Plated Micro-needles", detail: "Engineered with hypoallergenic gold plating, reducing localized skin irritation and accelerating post-treatment epithelial cell recovery." },
        { title: "5. Safe RF Thermal Delivery Without Downtime", detail: "Microscopic thermal coagulation points in the dermis trigger massive collagen contraction, offering visible lifting with minimal social downtime." }
      ]
    },

    // ============ PRODUCT 4 ============
    {
      title: "Q-Switched Nd:YAG Laser Machine",
      slug: "q-switched-nd-yag-laser-machine",
      price: "₹2,85,000*",
      shortDescription: "High-power tattoo removal, carbon laser peel, and pigmentation correction system with dual 1064nm/532nm wavelengths.",
      longDescription: "The Q-Switched Nd:YAG Laser Machine is a professional-grade laser platform engineered for effective tattoo ink dispersion, melasma management, birthmark removal, and Hollywood carbon laser facials.\n\nBy generating extremely short nanosecond pulses with high peak energy, this machine produces powerful photoacoustic shockwaves that shatter unwanted pigments into microscopic particles for natural elimination through the body's lymphatic system, without causing thermal burns or scarring.",
      mainImage: IMG_1,
      aboutImage: IMG_1,
      rating: 4.9,
      features: [
        { text: "Dual wavelength switching (1064nm & 532nm)" },
        { text: "Nanosecond pulse for photoacoustic fragmentation" },
        { text: "Specialized Carbon Laser Peel collimator tip" },
        { text: "Red aiming beam for millimeter targeting accuracy" },
        { text: "Closed-loop water & air cooling system" },
        { text: "High-energy solid-state Nd:YAG crystal rod" }
      ],
      specs: [
        { label: "Wavelength", value: "1064nm & 532nm" },
        { label: "Power Supply", value: "AC 220V / 50Hz" },
        { label: "Pulse Energy", value: "Up to 2000 mJ" },
        { label: "Pulse Width", value: "6 - 8 ns" },
        { label: "Repetition Rate", value: "1 - 10 Hz" },
        { label: "Machine Weight", value: "38 Kg" },
        { label: "Cooling", value: "Water + Air Closed-loop" },
        { label: "Certifications", value: "CE / ISO 13485" }
      ],
      whyChoose: [
        { title: "1. Highly Effective Photoacoustic Treatment", detail: "Generates high-energy acoustic shockwaves in nanosecond pulse intervals, shattering stubborn tattoo pigments safely without heat scarring." },
        { title: "2. Versatile Dual Wavelengths (1064nm & 532nm)", detail: "The 1064nm wavelength treats dark black, blue, and grey inks, while the 532nm targets warm pigments like red, orange, and brown." },
        { title: "3. Hollywood Carbon Laser Peel Ready", detail: "Comes with a specialized collimator handpiece tip to perform active deep carbon facials, shrinking skin pores and controlling sebum production." },
        { title: "4. Red Aiming Pointer for Safe Targeting", detail: "Equipped with a low-power red laser aiming beam, allowing exact treatment targeting down to single millimeter spots." },
        { title: "5. Stable Closed-Loop Water Flow System", detail: "Fitted with intelligent water temperature sensors and high-volume circulation filters to protect the solid-state Nd:YAG crystal rod." }
      ]
    },

    // ============ PRODUCT 5 ============
    {
      title: "HIFU 7D Ultra Skin Lifting Device",
      slug: "hifu-7d-ultra-skin-lifting-device",
      price: "₹3,40,000*",
      shortDescription: "High-Intensity Focused Ultrasound for non-invasive SMAS layer face lifting, neck tightening, and body contouring.",
      longDescription: "The HIFU 7D Ultra Skin Lifting Device utilizes advanced multi-depth ultrasound cartridges to create microscopic thermal coagulation zones deep within SMAS tissue, delivering non-surgical face lift results comparable to traditional surgical procedures.\n\nWith 7 interchangeable cartridges targeting different depths from 1.5mm to 13mm, this platform effectively addresses face lifting, neck tightening, double chin reduction, and body contouring in a single non-invasive session with zero recovery downtime.",
      mainImage: IMG_2,
      aboutImage: IMG_2,
      rating: 4.8,
      features: [
        { text: "7 interchangeable depth cartridges (Face & Body)" },
        { text: "Micro and Macro focused ultrasound capability" },
        { text: "High shot speed with uniform energy distribution" },
        { text: "Real-time energy monitoring & safety feedback" },
        { text: "Non-invasive with zero social recovery downtime" },
        { text: "Ergonomic lightweight handpiece design" }
      ],
      specs: [
        { label: "Energy Type", value: "High Intensity Focused Ultrasound" },
        { label: "Power Supply", value: "AC 220V / 50Hz" },
        { label: "Shot Energy", value: "0.1 - 3.0 J (0.1 J/step)" },
        { label: "Cartridge Depths", value: "1.5 / 3.0 / 4.5 / 6 / 9 / 13 mm" },
        { label: "Shots Per Cartridge", value: "20,000 shots" },
        { label: "Machine Weight", value: "35 Kg" },
        { label: "Display", value: "10-Inch Touchscreen" },
        { label: "Certifications", value: "CE / ISO 13485" }
      ],
      whyChoose: [
        { title: "1. Complete Multi-Depth SMAS Tightening", detail: "Targets deep superficial muscular aponeurotic layers up to 4.5mm deep, inducing permanent thermal coagulation to lift facial structures naturally." },
        { title: "2. High Velocity Line & Shot Firing Capabilities", detail: "Advanced mechanical transducers deliver uniform shot patterns faster, reducing treatment times and clinical fatigue on operators." },
        { title: "3. Body Contouring Multi-Depth Cartridges", detail: "Includes high-frequency cartridges up to 13mm deep to systematically dissolve localized subcutaneous fat deposits on limbs and abdomen." },
        { title: "4. Minimal Post-Session Social Recovery", detail: "The non-invasive acoustic focus bypasses the outer skin surface, ensuring instant mechanical lifting without raw lesions or swelling." },
        { title: "5. High Patient Satisfaction & Retention", detail: "Immediate post-treatment visible firming, followed by progressive cellular lifting that matures beautifully over 3 to 6 months." }
      ]
    },

    // ============ PRODUCT 6 ============
    {
      title: "CO2 Fractional Laser Resurfacing Unit",
      slug: "co2-fractional-laser-resurfacing-unit",
      price: "₹3,75,000*",
      shortDescription: "Ablative skin resurfacing, surgical mole removal, deep wrinkle correction, and surgical scar remodeling system.",
      longDescription: "The CO2 Fractional Laser Resurfacing Unit uses advanced 10600nm RF-excited tube technology to create microscopic thermal ablation columns, stimulating deep dermal collagen remodeling with minimal downtime.\n\nThis versatile platform seamlessly switches between ablative fractional resurfacing modes and precision surgical cutting modes, making it ideal for aesthetic clinics performing scar revision, wrinkle correction, mole excision, and advanced skin tightening procedures with unmatched clinical precision.",
      mainImage: IMG_3,
      aboutImage: IMG_3,
      rating: 4.9,
      features: [
        { text: "Ablative fractional & continuous surgical modes" },
        { text: "Articulated 7-joint lightweight balance arm" },
        { text: "Multiple scan patterns (Square, Circle, Triangle)" },
        { text: "Adjustable spot energy from 1 to 100mJ" },
        { text: "Premium RF-excited sealed metal laser tube" },
        { text: "Vaginal tightening probe accessory included" }
      ],
      specs: [
        { label: "Laser Type", value: "RF-Excited Sealed Metal CO2" },
        { label: "Power Supply", value: "AC 220V / 50Hz" },
        { label: "Wavelength", value: "10.6 μm" },
        { label: "Power Output", value: "60W Maximum" },
        { label: "Spot Size", value: "0.12mm Adjustable" },
        { label: "Machine Weight", value: "55 Kg" },
        { label: "Display", value: "10-Inch Touchscreen" },
        { label: "Certifications", value: "CE / ISO 13485" }
      ],
      whyChoose: [
        { title: "1. Premium RF-Excited Sealed Metal Laser Tube", detail: "Equipped with an advanced RF-excited metal laser tube, providing consistent, ultra-fine spot patterns that promote faster clinical healing." },
        { title: "2. Comprehensive Multi-Scan Modes & Patterns", detail: "Adjusts output patterns (squares, triangles, circles) to precisely treat uneven skin contours, scars, or targeted clinical zones." },
        { title: "3. Professional Dual-Mode Application Capability", detail: "Allows seamless switching between ablative skin resurfacing modes and precision surgical cutting modes for excising skin lesions." },
        { title: "4. Ergonomic Articulated 7-Joint Balance Arm", detail: "Fitted with a balanced articulated arm that minimizes wrist strain for operators during long resurfacing procedures." },
        { title: "5. Unmatched Clinical Efficacy for Scar Tissue", detail: "Highly effective for deep acne ice-pick scars, burn contractures, and severe stretch marks by triggering deep cellular regeneration." }
      ]
    }
  ];

  for (const prod of products) {
    const { features, specs, whyChoose, ...prodData } = prod;
    await prisma.product.create({
      data: {
        ...prodData,
        features: {
          create: features.map((f, i) => ({ text: f.text, order: i + 1 })),
        },
        specs: {
          create: specs.map((s, i) => ({ label: s.label, value: s.value, order: i + 1 })),
        },
        whyChoose: {
          create: whyChoose.map((w, i) => ({ title: w.title, detail: w.detail, order: i + 1 })),
        },
      },
    });
  }

  console.log("✅ Seeded 6 products with Cloudinary URLs!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });