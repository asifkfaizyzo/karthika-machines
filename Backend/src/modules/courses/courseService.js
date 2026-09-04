import prisma from "../../config/db.js";

export const fetchAllCourses = async () => {
  return await prisma.course.findMany({
    where: { isActive: true },
    select: {
      id: true,
      title: true,
      slug: true,
      shortDescription: true,
      mainImage: true,
      duration: true,
      qualification: true,
      rating: true,
    },
    orderBy: { id: "asc" },
  });
};

export const fetchCourseByIdOrSlug = async (identifier) => {
  const isNumeric = !isNaN(identifier);

  const course = await prisma.course.findFirst({
    where: {
      OR: [
        ...(isNumeric ? [{ id: parseInt(identifier) }] : []),
        { slug: identifier },
      ],
      isActive: true,
    },
    include: {
      keyPoints: { orderBy: { order: "asc" } },
      lessons: { orderBy: { order: "asc" } },
    },
  });

  if (!course) return null;

  const relatedCourses = await prisma.course.findMany({
    where: {
      id: { not: course.id },
      isActive: true,
    },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      shortDescription: true,
      mainImage: true,
      duration: true,
      qualification: true,
      rating: true,
    },
    orderBy: { id: "asc" },
  });

  return {
    ...course,
    relatedCourses,
  };
};



// Add this export to courseService.js:
export const createCourse = async (data) => {
  const { keyPoints, lessons, ...courseData } = data;

  return await prisma.course.create({
    data: {
      ...courseData,
      keyPoints: keyPoints?.length
        ? {
            create: keyPoints.map((k, i) => ({
              text: k.text,
              order: k.order ?? i + 1,
            })),
          }
        : undefined,
      lessons: lessons?.length
        ? {
            create: lessons.map((l, i) => ({
              title: l.title,
              detail: l.detail,
              order: l.order ?? i + 1,
            })),
          }
        : undefined,
    },
    include: {
      keyPoints: { orderBy: { order: "asc" } },
      lessons: { orderBy: { order: "asc" } },
    },
  });
};