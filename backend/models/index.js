import sequelize from "../config/sequelize.js";
import User from "./User.js";
import Store from "./Store.js";
import Rating from "./Rating.js";
import { seedAdmin } from "../utils/seedAdmin.js";  // <-- import seeder

export const dbInit = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected (sequelize)");

    await sequelize.sync({ alter: true });
    console.log("Models Synced");

    // 🔥 Create admin user automatically
    await seedAdmin();
    console.log("Admin seeded (if not existing)");
    
  } catch (err) {
    console.error("MySQL Connection Error:", err);
  }
};

export { sequelize, User, Store, Rating };
