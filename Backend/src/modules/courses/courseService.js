import prisma from "../../config/db.js";

//Get all Course
export const fetchAllCourses = async (limit) => {
  return await prisma.course.findMany({
    where: { isActive: true },
     take: limit ? parseInt(limit) : undefined, // <-- Added limit
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


//Get course by id or slug
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


// Create Course
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


// 2. ADD THESE 3 NEW FUNCTIONS:
export const updateCourse = async (id, data) => {
  const { keyPoints, lessons, ...courseData } = data;

  return await prisma.course.update({
    where: { id: parseInt(id) },
    data: {
      ...courseData,
      keyPoints: keyPoints ? { deleteMany: {}, create: keyPoints.map((k, i) => ({ text: k.text, order: k.order ?? i + 1 })) } : undefined,
      lessons: lessons ? { deleteMany: {}, create: lessons.map((l, i) => ({ title: l.title, detail: l.detail, order: l.order ?? i + 1 })) } : undefined,
    },
    include: { keyPoints: true, lessons: true }
  });
};

export const deleteCourse = async (id) => {
  return await prisma.course.delete({ where: { id: parseInt(id) } });
};

export const toggleCourseStatus = async (id) => {
  const course = await prisma.course.findUnique({ where: { id: parseInt(id) } });
  if (!course) return null;
  return await prisma.course.update({
    where: { id: parseInt(id) },
    data: { isActive: !course.isActive },
  });
};


// 👇 Add these 3 service operations
export const createMultipleCourses = async (coursesList) => {
  return await prisma.$transaction(
    coursesList.map((data) => {
      const { keyPoints, lessons, ...courseData } = data;
      return prisma.course.create({
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
    })
  );
};

export const deleteManyCoursesByIds = async (ids) => {
  return await prisma.course.deleteMany({
    where: {
      id: { in: ids },
    },
  });
};

export const deleteAllCourses = async () => {
  return await prisma.course.deleteMany({});
};