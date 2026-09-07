import prisma from "../../config/db.js";



// Fetch all active products for the cards grid
export const fetchAllProducts = async (limit) => { 
  // Convert limit string to number safely (e.g. "2" -> 2)
  const takeLimit = limit && !isNaN(parseInt(limit)) ? parseInt(limit) : undefined;

  return await prisma.product.findMany({
    where: { isActive: true },    // Rule 1: Active products only
    take: takeLimit, // <-- Use 'takeLimit' here!
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      shortDescription: true,
      mainImage: true,
      rating: true,
    },
    orderBy: { createdAt: "desc" },     // Rule 2: Newest first (Newest to Oldest)
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


// Full Update (Replaces nested features/specs/accordions if provided)
export const updateProduct = async (id, data) => {
  const { features, specs, whyChoose, ...productData } = data;

  return await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      ...productData,
      // If features are provided, delete old ones and insert new ones
      features: features ? { deleteMany: {}, create: features.map((f, i) => ({ text: f.text, order: f.order ?? i + 1 })) } : undefined,
      specs: specs ? { deleteMany: {}, create: specs.map((s, i) => ({ label: s.label, value: s.value, order: s.order ?? i + 1 })) } : undefined,
      whyChoose: whyChoose ? { deleteMany: {}, create: whyChoose.map((w, i) => ({ title: w.title, detail: w.detail, order: w.order ?? i + 1 })) } : undefined,
    },
    include: { features: true, specs: true, whyChoose: true }
  });
};

// Delete Product
export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id: parseInt(id) },
  });
};

// Toggle Active Status - on DB 
export const toggleProductStatus = async (id) => {
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
  if (!product) return null;

  return await prisma.product.update({
    where: { id: parseInt(id) },
    data: { isActive: !product.isActive },
  });
};