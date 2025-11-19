import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./User.js";
import Store from "./Store.js";

const Rating = sequelize.define("Rating", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.STRING(255) }
});

// Associations
Rating.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Rating, { foreignKey: "userId" });

Rating.belongsTo(Store, { foreignKey: "storeId" });
Store.hasMany(Rating, { foreignKey: "storeId" });

export default Rating;
