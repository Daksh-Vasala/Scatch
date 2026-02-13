import jwt from "jsonwebtoken"
import Cart from "../models/Cart.js"
import Order from "../models/Order.js"

export const createOrder = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.id;

    if(!userId) {
      return res.status(400).json({ message: "User not found, please login" });
    }

    const { fullName, phone, addressLine, city, state, pincode, paymentMethod } = req.body;

    const cart = await Cart.findOne({user: userId}).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    
    let totalAmount = 0;

    const orderItems = cart.items.map(item => {
      totalAmount += item.priceAtAddTime * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        priceAtAddTime: item.priceAtAddTime
      };
    });

    const newOrder = await Order.create({
      user: userId,
      items: orderItems,
      shippingAddress: {
        fullName,
        phone,
        addressLine,
        city,
        state,
        pincode
      },
      totalAmount,
      paymentMethod
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order" });
  }
}