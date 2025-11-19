import { Store, Rating, User } from "../models/index.js";
import { Op, fn, col, literal } from "sequelize";

export const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    const store = await Store.create({ name, email, address, ownerId });
    res.status(201).json(store);
  } catch (err) {
    console.error("CREATE STORE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


export const listStores = async (req, res) => {
  try {
    const { q } = req.query;

    const where = q
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${q}%` } },
            { address: { [Op.like]: `%${q}%` } }
          ]
        }
      : {};

    const stores = await Store.findAll({
      where,
      include: [{ model: Rating, attributes: [] }],
      attributes: {
        include: [
          [fn("AVG", col("Ratings.rating")), "avgRating"],
          [fn("COUNT", col("Ratings.id")), "ratingCount"]
        ]
      },
      group: ["Store.id"],
      order: [["name", "ASC"]]
    });

    res.json(stores);
  } catch (err) {
    console.error("STORE LIST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getStoreDetails = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [
        {
          model: Rating,
          include: [
            { model: User, attributes: ["id", "name", "email"] }
          ]
        }
      ]
    });

    if (!store)
      return res.status(404).json({ message: "Store not found" });

    res.json(store);
  } catch (err) {
    console.error("STORE DETAILS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
