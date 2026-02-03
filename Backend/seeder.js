import dotenv from "dotenv";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import Product from "./models/Product.js"

dotenv.config();
connectDB();

const importData = async () => {
  try {
    if(process.env.NODE_ENV = "develeopment"){
      await Product.deleteMany();
      await Product.insertMany(products);
      console.log("✅ Products seeded successfully");
      process.exit();
    } else {
      console.log("Seeding blocked , not in development mode");
    }
  } catch (error) {
    console.log("❌ Seeding failed", error);
    process.exit(1);
  }
};

importData();