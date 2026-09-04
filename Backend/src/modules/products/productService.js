import prisma from "../../config/db.js";

// Fetch all active products for the cards grid
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

// Fetch single product by ID or Slug with all details + 3 related products
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

  // Fetch up to 3 other active products for the "Related Products" section
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

// Create a new product with all its nested relations in 1 atomic query
export const createProduct = async (data) => {
  const { features, specs, whyChoose, ...productData } = data;

  return await prisma.product.create({
    data: {
      ...productData,
      features: features?.length
        ? {
            create: features.map((f, i) => ({
              text: f.text,
              order: f.order ?? i + 1,
            })),
          }
        : undefined,
      specs: specs?.length
        ? {
            create: specs.map((s, i) => ({
              label: s.label,
              value: s.value,
              order: s.order ?? i + 1,
            })),
          }
        : undefined,
      whyChoose: whyChoose?.length
        ? {
            create: whyChoose.map((w, i) => ({
              title: w.title,
              detail: w.detail,
              order: w.order ?? i + 1,
            })),
          }
        : undefined,
    },
    include: {
      features: { orderBy: { order: "asc" } },
      specs: { orderBy: { order: "asc" } },
      whyChoose: { orderBy: { order: "asc" } },
    },
  });
};