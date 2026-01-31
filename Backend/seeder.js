import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import Product from "./models/Product.js"

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.log("❌ Seeding failed");
    process.exit(1);
  }
};

importData();