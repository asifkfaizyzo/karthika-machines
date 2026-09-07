import prisma from "../src/config/db.js";

async function main() {
  console.log("🌱 Seeding Founders...");
  await prisma.founder.deleteMany({});

  await prisma.founder.createMany({
    data: [
      {
        name: "Somjith",
        role: "Founder & CEO",
        image: "https://res.cloudinary.com/of49cdto/image/upload/v1788763601/founderimg.png",
        order: 1,
      },
      {
        name: "Karthik",
        role: "Managing Director",
        image: "https://res.cloudinary.com/of49cdto/image/upload/v1788763613/founder2.png",
        order: 2,
      },
      {
        name: "Loki",
        role: "Head of Sales",
        image: "https://res.cloudinary.com/of49cdto/image/upload/v1788763623/founder3.png",
        order: 3,
      },
      {
        name: "Savio",
        role: "Sales Executive",
        image: "https://res.cloudinary.com/of49cdto/image/upload/v1788763637/founder4.png",
        order: 4,
      },
      {
        name: "Samjith",
        role: "Sales Executive",
        image: "https://res.cloudinary.com/of49cdto/image/upload/v1788763651/founder5.png",
        order: 5,
      },
    ],
  });

  console.log("✅ Seeded 5 Founders successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });