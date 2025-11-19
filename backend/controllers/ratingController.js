import { Rating, Store } from "../models/index.js";
import { sequelize } from "../models/index.js";

export const submitRating = async (req, res) => {
  try {
    const storeId = req.params.id;   // <-- FIXED (getting ID from URL)
    const { rating, comment } = req.body;

    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be 1-5" });
    }

    // Check if rating exists (update instead of duplicate)
    let existing = await Rating.findOne({
      where: { userId: req.user.id, storeId }
    });

    if (existing) {
      existing.rating = rating;
      existing.comment = comment;
      await existing.save();
    } else {
      existing = await Rating.create({
        storeId,
        userId: req.user.id,
        rating,
        comment
      });
    }

    // Recalculate average rating properly
    const avg = await Rating.findOne({
      where: { storeId },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating")), "avgRating"]
      ],
      raw: true,
    });

    await Store.update(
      { averageRating: Number(avg.avgRating) || 0 },
      { where: { id: storeId } }
    );

    res.status(201).json({
      message: "Rating submitted",
      rating: existing
    });

  } catch (err) {
    console.error("Rating Error:", err);
    res.status(500).json({ message: err.message });
  }
};
