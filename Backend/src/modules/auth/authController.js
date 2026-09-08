import prisma from "../../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const secret = process.env.JWT_SECRET || "karthika_super_secret_admin_key_2024";
    const token = jwt.sign({ id: admin.id }, secret, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      data: { id: admin.id, name: admin.name, email: admin.email, token },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: req.admin });
  } catch (error) {
    next(error);
  }
};