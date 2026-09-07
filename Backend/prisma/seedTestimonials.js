import prisma from "../src/config/db.js";

// ⚠️ Paste Cloudinary URL of testimg.png
const CLIENT_IMG =
  "https://res.cloudinary.com/of49cdto/image/upload/v1788599567/testimg.png";

async function main() {
  console.log("🌱 Cleaning testimonials...");
  await prisma.testimonial.deleteMany({});

  await prisma.testimonial.createMany({
    data: [
      // ===== Testimonials page: 3 IMAGE cards (same image, different text/name) =====
      {
        name: "Aisha Rahman",
        role: "Bella Beauty Lounge",
        text: "DB IMAGE CARD 1: Training quality improved my facial results and client retention within one month.",
        image: CLIENT_IMG,
        rating: 5,
        type: "IMAGE",
        showOnHome: false,
        order: 1,
      },
      {
        name: "Neha Kapoor",
        role: "Beautician",
        text: "DB IMAGE CARD 2: Practical machine demos helped me handle laser and medi-facial protocols confidently.",
        image: CLIENT_IMG,
        rating: 5,
        type: "IMAGE",
        showOnHome: false,
        order: 2,
      },
      {
        name: "Sara Fernandes",
        role: "Bloom Beauty Care",
        text: "DB IMAGE CARD 3: Setup support was smooth and our clinic started advanced treatments faster than expected.",
        image: CLIENT_IMG,
        rating: 5,
        type: "IMAGE",
        showOnHome: false,
        order: 3,
      },

      // ===== Testimonials page: 6 TEXT cards (all different) =====
      {
        name: "Dr. Ananya Sharma",
        role: "Dermatologist",
        text: "DB TEXT CARD 1: Clinical equipment quality is reliable and suitable for daily aesthetic procedures.",
        type: "TEXT",
        showOnHome: false,
        order: 4,
      },
      {
        name: "Vikram Mehta",
        role: "Aesthetic Specialist",
        text: "DB TEXT CARD 2: Course structure is practical, clear, and immediately usable in real client sessions.",
        type: "TEXT",
        showOnHome: false,
        order: 5,
      },
      {
        name: "Priya Nair",
        role: "Clinic Owner",
        text: "DB TEXT CARD 3: We upgraded our treatment menu quickly with strong after-sales guidance.",
        type: "TEXT",
        showOnHome: false,
        order: 6,
      },
      {
        name: "Rohan Das",
        role: "Skin Therapist",
        text: "DB TEXT CARD 4: Hands-on modules boosted my confidence in anti-ageing and brightening protocols.",
        type: "TEXT",
        showOnHome: false,
        order: 7,
      },
      {
        name: "Meera Iyer",
        role: "Beauty Educator",
        text: "DB TEXT CARD 5: Content is industry-focused and easy to teach to junior therapists.",
        type: "TEXT",
        showOnHome: false,
        order: 8,
      },
      {
        name: "Arjun Pillai",
        role: "Spa Director",
        text: "DB TEXT CARD 6: Excellent value machines and training support for multi-branch operations.",
        type: "TEXT",
        showOnHome: false,
        order: 9,
      },

      // ===== Home Section 5 carousel (different descriptions) =====
      {
        name: "Home User One",
        role: "Beautician",
        text: "DB HOME 1: After training, my facial results became more consistent and clients rebooked faster.",
        type: "TEXT",
        showOnHome: true,
        order: 10,
      },
      {
        name: "Home User Two",
        role: "Clinic Manager",
        text: "DB HOME 2: Machine installation support was quick, and our team started treatments the same week.",
        type: "TEXT",
        showOnHome: true,
        order: 11,
      },
      {
        name: "Home User Three",
        role: "Skin Therapist",
        text: "DB HOME 3: Practical sessions helped me perform advanced protocols with much more confidence.",
        type: "TEXT",
        showOnHome: true,
        order: 12,
      },
      {
        name: "Home User Four",
        role: "Dermatology Assistant",
        text: "DB HOME 4: Clear guidance and reliable devices improved our daily clinic workflow significantly.",
        type: "TEXT",
        showOnHome: true,
        order: 13,
      },
      {
        name: "Home User Five",
        role: "Aesthetic Specialist",
        text: "DB HOME 5: From demo to service support, everything was professional and easy to implement.",
        type: "TEXT",
        showOnHome: true,
        order: 14,
      },
    ],
  });

  console.log("✅ Seeded unique testimonials for DB confirmation");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });