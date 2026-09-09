import prisma from "../../config/db.js";
import { sendConsultationNotification } from "../../utils/mailer.js";

// CREATE NEW
export const createNewConsultation = async (data) => {
  const consultation = await prisma.consultation.create({
    data,
  });

  // Trigger email in background without blocking response
  sendConsultationNotification(consultation).catch((err) =>
    console.error("Failed to send consultation email alert:", err)
  );

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