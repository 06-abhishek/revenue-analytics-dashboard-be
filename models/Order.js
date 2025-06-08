import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
});

export default mongoose.model("Order", orderSchema);
