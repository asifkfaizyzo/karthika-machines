import prisma from "../../config/db.js";

export const fetchAllFounders = async (limit) => {
  const takeLimit =
    limit && !isNaN(parseInt(limit)) ? parseInt(limit) : undefined;

  return await prisma.founder.findMany({
    where: { isActive: true },
    take: takeLimit,
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });
};

export const createFounder = async (data) => {
  return await prisma.founder.create({ data });
};

export const createMultipleFounders = async (foundersList) => {
  return await prisma.founder.createMany({
    data: foundersList,
  });
};

export const updateFounder = async (id, data) => {
  return await prisma.founder.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteFounder = async (id) => {
  return await prisma.founder.delete({
    where: { id: parseInt(id) },
  });
};

export const deleteAllFounders = async () => {
  return await prisma.founder.deleteMany({});
};

export const deleteManyByIds = async (ids) => {
  return await prisma.founder.deleteMany({
    where: {
      id: { in: ids },
    },
  });
};