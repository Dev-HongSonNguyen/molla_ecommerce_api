import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      // required: true,
    },
    totalQuantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Cart", cartSchema);
