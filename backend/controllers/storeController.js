import { Store, Rating, User } from "../models/index.js";
import { Op } from "sequelize";

export const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    const store = await Store.create({ name, email, address, ownerId });
    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listStores = async (req, res) => {
  try {
    const { name, address, sortBy = "name", order = "ASC", page = 1, limit = 20 } = req.query;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    const offset = (page - 1) * limit;

    const stores = await Store.findAndCountAll({
      where,
      include: [{
        model: Rating,
        as: "ratings",
        attributes: ["id", "rating", "userId"]
      }],
      order: [[sortBy, order]],
      limit: +limit,
      offset
    });

    let userId = null;
    if (req.user) userId = req.user.id;

    const payload = stores.rows.map(s => {
      const userRating = s.ratings.find(r => r.userId === userId);
      return {
        id: s.id,
        name: s.name,
        email: s.email,
        address: s.address,
        averageRating: s.averageRating || 0,
        userRating: userRating ? userRating.rating : null
      };
    });

    res.json({ count: stores.count, rows: payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStoreDetails = async (req, res) => {
  const id = req.params.id;
  const store = await Store.findByPk(id, { include: [{ model: Rating, as: "ratings", include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }] }] });
  if (!store) return res.status(404).json({ message: "Store not found" });
  res.json(store);
};
