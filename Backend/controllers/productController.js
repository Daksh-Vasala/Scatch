import Product from "../models/Product.js"

export const getProducts = async (req, res) => {
  try {
    const { collection, inStock, discount, sort } = req.query;

    let query = {};
    let sortQuery = {};

    // Collection filter
    if (collection && collection === "discounted") {
      query.discount = { $gt: 0 };
    }

    // Stock filter
    if (inStock === "true") {
      query.stock = { $gt: 0 };
    }

    if (collection === "new") {
      sortQuery.createdAt = -1;
    }

    // Discount filter
    if (discount) {
      query.discount = { $gte: Number(discount) };
    }

    // Sorting
    if (sort === "price_asc") sortQuery.price = 1;
    if (sort === "price_desc") sortQuery.price = -1;
    if (sort === "newest") sortQuery.createdAt = -1;

    const products = await Product.find(query).sort(sortQuery);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};