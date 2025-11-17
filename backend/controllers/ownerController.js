import bcrypt from "bcryptjs";
import { User, Store, Rating } from "../models/index.js";

/**
 * GET: Owner store
 */
export const getMyStore = async (req, res) => {
  const ownerId = req.user.id;

  const store = await Store.findOne({ where: { ownerId } });
  if (!store) return res.json({ store: null });

  res.json({ store });
};

/**
 * POST: Create store (only one allowed)
 */
export const createMyStore = async (req, res) => {
  const ownerId = req.user.id;
  const { name, email, address } = req.body;

  const exists = await Store.findOne({ where: { ownerId } });

  if (exists)
    return res.status(400).json({ message: "You already created a store" });

  const store = await Store.create({
    ownerId,
    name,
    email,
    address,
  });

  res.status(201).json({ message: "Store created", store });
};

/**
 * GET: Ratings for this owner's store
 */
export const getMyStoreRatings = async (req, res) => {
  const ownerId = req.user.id;

  const store = await Store.findOne({ where: { ownerId } });
  if (!store) return res.json({ ratings: [], avgRating: 0 });

  const ratings = await Rating.findAll({
    where: { storeId: store.id },
    include: [
      {
        model: User,
        attributes: ["name", "email"],
      },
    ],
  });

  const avgRating =
    ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);

  res.json({
    store,
    ratings,
    avgRating: Number(avgRating.toFixed(2)),
  });
};

/**
 * PUT: Update owner password
 */
export const updateOwnerPassword = async (req, res) => {
  const ownerId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findByPk(ownerId);

  const ok = await bcrypt.compare(currentPassword, user.password);
  if (!ok) return res.status(400).json({ message: "Incorrect password" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password updated" });
};
