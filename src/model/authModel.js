import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "member",
    },
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Cart",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Users", userSchema);
