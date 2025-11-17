import { User, Store, Rating } from "../models/index.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const { q, role, sortBy = "name", order = "ASC", page = 1, limit = 20 } = req.query;
    const where = {};
    if (role) where.role = role;
    if (q) where.name = { [Op.like]: `%${q}%` };
    const offset = (page - 1) * limit;
    const users = await User.findAndCountAll({
      where,
      attributes: ["id","name","email","address","role"],
      order: [[sortBy, order]],
      limit: +limit,
      offset
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, address, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listStores = async (req, res) => {
  try {
    const { q, sortBy = "name", order = "ASC", page = 1, limit = 20 } = req.query;
    const where = {};
    if (q) where.name = { [Op.like]: `%${q}%` };
    const offset = (page - 1) * limit;
    const stores = await Store.findAndCountAll({
      where,
      include: [{ model: User, as: "owner", attributes: ["id", "name", "email", "address"] }],
      order: [[sortBy, order]],
      limit: +limit,
      offset
    });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
