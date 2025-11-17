import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

export const seedAdmin = async () => {
  const adminEmail = "admin@example.com";
  const existing = await User.findOne({ where: { email: adminEmail } });
  if (existing) return console.log("Admin already exists");
  const hashed = await bcrypt.hash("Admin@123", 10);
  await User.create({ name: "System Administrator", email: adminEmail, password: hashed, role: "admin", address: "Head Office" });
  console.log("Admin user created: admin@example.com / Admin@123");
};
