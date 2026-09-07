import prisma from "../../config/db.js";

export const fetchAllFaqs = async (limit) => {
  const takeLimit =
    limit && !isNaN(parseInt(limit)) ? parseInt(limit) : undefined;

  return await prisma.faq.findMany({
    where: { isActive: true },
    take: takeLimit,
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });
};

export const createFaq = async (data) => {
  return await prisma.faq.create({ data });
};

// 👇 Bulk create in database
export const createMultipleFaqs = async (faqsList) => {
  return await prisma.faq.createMany({
    data: faqsList,
  });
};

export const updateFaq = async (id, data) => {
  return await prisma.faq.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteFaq = async (id) => {
  return await prisma.faq.delete({
    where: { id: parseInt(id) },
  });
};

// 1. Delete all FAQs
export const deleteAllFaqs = async () => {
  return await prisma.faq.deleteMany({});
};

// 2. Delete selected FAQs by ID list
export const deleteManyByIds = async (ids) => {
  return await prisma.faq.deleteMany({
    where: {
      id: { in: ids },
    },
  });
};