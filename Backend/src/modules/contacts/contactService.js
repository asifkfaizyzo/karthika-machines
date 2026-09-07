import prisma from "../../config/db.js";

export const saveInquiry = async (data) => {
  return await prisma.inquiry.create({ data });
};

export const fetchAllInquiries = async () => {
  return await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const deleteInquiry = async (id) => {
  return await prisma.inquiry.delete({
    where: { id: parseInt(id) },
  });
};