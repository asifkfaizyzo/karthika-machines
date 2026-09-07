import prisma from "../../config/db.js";

export const fetchAllTestimonials = async ({ limit, home, type } = {}) => {
  const takeLimit = limit && !isNaN(parseInt(limit)) ? parseInt(limit) : undefined;

  const where = { isActive: true };
  if (home === "true") where.showOnHome = true;
  if (type) where.type = type.toUpperCase();

  return await prisma.testimonial.findMany({
    where,
    take: takeLimit,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
};

export const fetchTestimonialById = async (id) => {
  return await prisma.testimonial.findFirst({
    where: { id: parseInt(id), isActive: true },
  });
};

export const createTestimonial = async (data) => {
  return await prisma.testimonial.create({ data });
};

export const updateTestimonial = async (id, data) => {
  return await prisma.testimonial.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteTestimonial = async (id) => {
  return await prisma.testimonial.delete({
    where: { id: parseInt(id) },
  });
};

export const toggleTestimonialStatus = async (id) => {
  const item = await prisma.testimonial.findUnique({
    where: { id: parseInt(id) },
  });
  if (!item) return null;

  return await prisma.testimonial.update({
    where: { id: parseInt(id) },
    data: { isActive: !item.isActive },
  });
};