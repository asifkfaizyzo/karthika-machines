import * as notificationService from "./notificationService.js";

export const getNotifications = async (req, res, next) => {
  try {
    const [data, unreadCount] = await Promise.all([
      notificationService.fetchAllNotifications(),
      notificationService.fetchUnreadCount(),
    ]);

    res.status(200).json({
      success: true,
      count: data.length,
      unreadCount,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const markOneAsRead = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    const updated = await notificationService.markAsRead(id);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const markAllRead = async (req, res, next) => {
  try {
    const result = await notificationService.markAllAsRead();
    res.status(200).json({
      success: true,
      message: `${result.count} notifications marked as read`,
    });
  } catch (error) {
    next(error);
  }
};

export const removeNotification = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    await notificationService.deleteNotification(id);
    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    next(error);
  }
};

export const removeAllNotifications = async (req, res, next) => {
  try {
    await notificationService.deleteAllNotifications();
    res.status(200).json({ success: true, message: "All notifications cleared" });
  } catch (error) {
    next(error);
  }
};