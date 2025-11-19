import express from "express";
import { authenticate } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import { Rating, Store, User } from "../models/index.js";
import { fn, col } from "sequelize";

const router = express.Router();

router.use(authenticate, permit("owner"));

// Owner dashboard
router.get("/dashboard", async (req, res) => {
  const store = await Store.findOne({ where: { ownerId: req.user.id } });

  if (!store) return res.json({ store: null, ratings: [], average: 0 });

  const ratings = await Rating.findAll({
    where: { storeId: store.id },
    include: [{ model: User, attributes: ["name", "email"] }]
  });

  // 🔥 FIXED: Changed score → rating
  const avg = await Rating.findOne({
    where: { storeId: store.id },
    attributes: [[fn("AVG", col("rating")), "avgRating"]],
    raw: true
  });

  res.json({
    store,
    ratings,
    average: avg?.avgRating || 0
  });
});

export default router;
