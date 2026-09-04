import prisma from "../../config/db.js";

export const fetchAllProducts = async () => {
  return await prisma.product.findMany({
    where: { isActive: true },
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      shortDescription: true,
      mainImage: true,
      rating: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const fetchProductByIdOrSlug = async (identifier) => {
  const isNumeric = !isNaN(identifier);

  const product = await prisma.product.findFirst({
    where: {
      OR: [
        ...(isNumeric ? [{ id: parseInt(identifier) }] : []),
        { slug: identifier },
      ],
      isActive: true,
    },
    include: {
      features: { orderBy: { order: "asc" } },
      specs: { orderBy: { order: "asc" } },
      whyChoose: { orderBy: { order: "asc" } },
    },
  });

  if (!product) return null;

  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      isActive: true,
    },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      shortDescription: true,
      mainImage: true,
      rating: true,
    },
  });

  return {
    ...product,
    relatedProducts,
  };
};