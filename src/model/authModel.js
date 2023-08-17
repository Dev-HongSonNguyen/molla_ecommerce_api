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
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dwzh9i6xf/image/upload/v1692269660/BookShopMolla/770136_man_512x512_yfbmuw.png",
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
