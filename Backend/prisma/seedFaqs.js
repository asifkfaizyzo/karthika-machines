import prisma from "../src/config/db.js";

async function main() {
  console.log("🌱 Cleaning FAQs...");
  await prisma.faq.deleteMany({});

  await prisma.faq.createMany({
    data: [
      {
        question: "DB FAQ 1: What products do you offer?",
        answer:
          "DB FAQ ANSWER 1: We provide aesthetic machines, clinical devices, and professional training support for clinics.",
        order: 1,
      },
      {
        question: "DB FAQ 2: Do you provide machine installation support?",
        answer:
          "DB FAQ ANSWER 2: Yes, installation guidance and basic operational training are included with eligible machines.",
        order: 2,
      },
      {
        question: "DB FAQ 3: Are courses suitable for beginners?",
        answer:
          "DB FAQ ANSWER 3: Yes, we offer beginner-to-advanced modules based on qualification and career goals.",
        order: 3,
      },
      {
        question: "DB FAQ 4: How can I book a free consultation?",
        answer:
          "DB FAQ ANSWER 4: Click Book a Consultation, submit your details, and our team will contact you quickly.",
        order: 4,
      },
      {
        question: "DB FAQ 5: Do you provide after-sales service?",
        answer:
          "DB FAQ ANSWER 5: Yes, technical support and service coordination are available after purchase.",
        order: 5,
      },
    ],
  });

  console.log("✅ Seeded 5 trackable FAQs");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });