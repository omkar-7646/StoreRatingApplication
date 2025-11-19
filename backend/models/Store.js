import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./User.js";

const Store = sequelize.define("Store", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(60), allowNull: false },
  email: { type: DataTypes.STRING(100) },
  address: { type: DataTypes.STRING(400) },
  ownerId: { type: DataTypes.INTEGER },   // 🔥 FIXED
  averageRating: { type: DataTypes.FLOAT, defaultValue: 0 }
});

Store.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
User.hasMany(Store, { as: "stores", foreignKey: "ownerId" });

export default Store;
