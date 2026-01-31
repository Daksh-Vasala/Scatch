import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  stock: {
    type: Number,
    default: 1,
    min: 0
  },

  bgColor: {
    type: String,
    default: "#ffffff"
  },
  
  panelColor: {
    type: String,
    default: "#ffffff"
  },
  
  textColor: {
    type: String,
    default: "#000000"
  }
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;