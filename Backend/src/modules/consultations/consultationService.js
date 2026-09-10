import prisma from "../../config/db.js";
import { sendConsultationNotification } from "../../utils/mailer.js";

// CREATE NEW
export const createNewConsultation = async (data) => {
  const consultation = await prisma.consultation.create({
    data,
  });

  // Await the email so the live server finishes sending before terminating the connection
  try {
    await sendConsultationNotification(consultation);
    console.log("📧 Consultation email sent successfully to company!");
  } catch (err) {
    console.error("❌ Failed to send consultation email alert:", err.message);
  }

  return consultation;
};

// GET ALL (For Admin Panel)
export const fetchAllConsultations = async () => {
  return await prisma.consultation.findMany({
    orderBy: { createdAt: "desc" }, // Newest first
  });
};

// DELETE (For Admin Panel)
export const deleteConsultation = async (id) => {
  return await prisma.consultation.delete({
    where: { id: parseInt(id) },
  });
};