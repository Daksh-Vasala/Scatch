import Product from "../models/Product.js"
import Order from "../models/Order.js"

export const getProducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server error", error});
  }
}

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if(!product){
      return res.status(400).json({ message: "Product not found" });
    }
    
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedFields = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleIsActive = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { isActive: !product.isActive },
      { new: true }
    );
    
    return res.status(200).json(updatedProduct);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if(!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    return res.status(200).json({ message: "Product deleted successfully" });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      description = "",
      discount = 0,
      stock = 1,
      bgColor = "#ffffff",
      textColor = "#000000",
      isActive = true
    } = req.body;

    // Basic validation
    if (!name || !price || !image) {
      return res.status(400).json({ message: "Name, price, and image are required" });
    }

    // Optional: Validate ranges
    if (discount < 0 || discount > 100) {
      return res.status(400).json({ message: "Discount must be between 0 and 100" });
    }

    if (stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    // Create product
    const newProduct = await Product.create({
      name,
      price,
      image,
      description,
      discount,
      stock,
      bgColor,
      textColor,
      isActive
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if(!orders){
      return res.status(400).json({message: "No orders yet"});
    }

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}