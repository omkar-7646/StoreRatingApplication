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


export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await Rating.destroy({ where: { userId: id } });
    await Store.update({ ownerId: null }, { where: { ownerId: id } });
    await User.destroy({ where: { id } });

    res.json({ message: "User deleted successfully" });
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

export const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const store = await Store.create({ name, email, address, ownerId });
    res.json(store);
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

export const listUsers = async (req, res) => {
  try {
    const { q } = req.query;

    const where = {};
    if (q) {
      where[Op.or] = [
        { name: { [Op.like]: `%${q}%` } },
        { email: { [Op.like]: `%${q}%` } },
        { address: { [Op.like]: `%${q}%` } }
      ];
    }

    const users = await User.findAll({ where });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const storeId = req.params.id;

    const store = await Store.findByPk(storeId);

    if (!store)
      return res.status(404).json({ message: "Store not found" });

    await store.destroy();

    res.json({ message: "Store deleted successfully" });
  } catch (err) {
    console.error("ADMIN DELETE STORE:", err);
    res.status(500).json({ message: err.message });
  }
};
