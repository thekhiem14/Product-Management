const mongoose = require("mongoose")

const cartsSchema = new mongoose.Schema(
    {
      user_id: String,
      products: [
        {
          product_id: String,
          quantity: Number
        }
      ]
    },
    {
        timestamps: true
    },
)

const Cart = mongoose.model('Cart', cartsSchema, "carts")

module.exports = Cart