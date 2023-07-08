import jwt from "jsonwebtoken";
import User from "../model/authModel";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new Error("Bạn phải đăng nhập để thực hiện hành động này");

    const token = authHeader && authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET;

    const { _id } = jwt.verify(token, secretKey);
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Vui lòng đăng nhập lại !",
    });
  }
};
