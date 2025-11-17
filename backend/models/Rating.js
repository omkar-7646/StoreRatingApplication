import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./User.js";
import Store from "./Store.js";

const Rating = sequelize.define("Rating", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } }
});

Rating.belongsTo(User, { as: "user", foreignKey: "userId" });
User.hasMany(Rating, { as: "ratings", foreignKey: "userId" });

Rating.belongsTo(Store, { as: "store", foreignKey: "storeId" });
Store.hasMany(Rating, { as: "ratings", foreignKey: "storeId" });

export default Rating;
