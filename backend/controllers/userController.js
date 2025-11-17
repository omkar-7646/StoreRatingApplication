import { User } from "../models/index.js";
import bcrypt from "bcryptjs";

export const updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8 || newPassword.length > 16 || !/[A-Z]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
      return res.status(400).json({ message: "Invalid password format" });
    }
    const user = await User.findByPk(req.user.id);
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserDetails = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: ["id", "name", "email", "address", "role"] });
  res.json(user);
};
