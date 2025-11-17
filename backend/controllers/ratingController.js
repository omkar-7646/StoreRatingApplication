import { Rating, Store } from "../models/index.js";

export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be integer 1-5" });

    const existing = await Rating.findOne({ where: { userId, storeId } });

    if (existing) {
      existing.rating = rating;
      await existing.save();
    } else {
      await Rating.create({ userId, storeId, rating });
    }

    const ratings = await Rating.findAll({ where: { storeId } });
    const avg = ratings.reduce((s, r) => s + r.rating, 0) / (ratings.length || 1);
    const store = await Store.findByPk(storeId);
    store.averageRating = avg;
    await store.save();

    res.json({ message: "Rating submitted", averageRating: store.averageRating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRatingsForStore = async (req, res) => {
  const storeId = req.params.storeId;
  const ratings = await Rating.findAll({ where: { storeId }, include: ["user"] });
  res.json(ratings);
};
