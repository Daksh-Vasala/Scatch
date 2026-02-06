import jwt from "jsonwebtoken";
import Cart from "../models/Cart.js"
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Login required" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.id;

    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, priceAtAddTime: product.price });
    }

    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.priceAtAddTime, 0);

    await cart.save();

    res.status(200).json({
      message: "Added to cart",
      cart
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
}

export const getCart = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Login required" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.id;  
    
    const cart = await Cart.findOne({user: userId})
      .populate("items.product");
    if(!cart || cart.items.length === 0){
      return res.json({ message: "No items in cart", cart: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log("Get cart error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const updateQuantity = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Login required" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.id;
    const { productId, quantity } = req.body;

    if(quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ user : userId});

    if(!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }
    
    const index = cart.items.findIndex((item) => 
      item.product.toString() === productId.toString()
    );
    
    if(index === -1) {
      return res.status(400).json({ message: "Product not found" });
    }

    cart.items[index].quantity = quantity;

     cart.totalAmount = cart.items.reduce(
      (sum, i) => sum + i.priceAtAddTime * i.quantity,
      0
    );

    await cart.save();

    res.status(200).json({ message: "Cart quantity updated successfully"});

  } catch (error) {
    console.log("Error in updating quantity: ", error.message)
  }
}


