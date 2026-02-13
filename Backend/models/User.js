import mongoose from 'mongoose';
import addressSchema from './schemas/addressSchema.js'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  
  password: {
    type: String,
    required: true,
    select: false
  },
  
  avatar: {
    type: String,
    dafult: "",
  },

  addresses: [addressSchema],
  
  cart: [
    {
      product: {type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: {type: Number, default: 1}
    }
  ],
  
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User;