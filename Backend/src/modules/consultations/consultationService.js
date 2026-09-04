import prisma from "../../config/db.js";
import { sendConsultationNotification } from "../../utils/mailer.js";

export const createNewConsultation = async (data) => {
  const consultation = await prisma.consultation.create({
    data,
  });

  // Trigger email in background
  sendConsultationNotification(consultation).catch((err) =>
    console.error("Failed to send consultation email alert:", err)
  );

  return consultation;
};