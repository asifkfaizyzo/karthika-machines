import "dotenv/config";
import prisma from "./src/config/db.js";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.admin.upsert({
    where: { email: "admin@karthika.com" },
    update: {
      password: hashedPassword, // Force update password if record exists
    },
    create: {
      email: "admin@karthika.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("-----------------------------------------");
  console.log("✅ Admin Password Force Updated!");
  console.log(`Email    : ${admin.email}`);
  console.log(`Password : admin123`);
  console.log("-----------------------------------------");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });