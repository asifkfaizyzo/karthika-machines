import prisma from "../../config/db.js";

export const createNotification = async ({ type, title, message, relatedId, link }) => {
  return await prisma.notification.create({
    data: { type, title, message, relatedId, link },
  });
};

export const fetchAllNotifications = async () => {
  return await prisma.notification.findMany({
    orderBy: { createdAt: "desc" },
    take: 50, // limit to latest 50
  });
};

export const fetchUnreadCount = async () => {
  return await prisma.notification.count({
    where: { isRead: false },
  });
};

export const markAsRead = async (id) => {
  return await prisma.notification.update({
    where: { id: parseInt(id) },
    data: { isRead: true },
  });
};

export const markAllAsRead = async () => {
  return await prisma.notification.updateMany({
    where: { isRead: false },
    data: { isRead: true },
  });
};

export const deleteNotification = async (id) => {
  return await prisma.notification.delete({
    where: { id: parseInt(id) },
  });
};

export const deleteAllNotifications = async () => {
  return await prisma.notification.deleteMany({});
};