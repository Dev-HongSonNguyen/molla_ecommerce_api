import { signinValidate, signupValidate } from "../schema/authSchema";
import bcrypt from "bcryptjs";
import userSchema from "../model/authModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signup = async (req, res) => {
  // validate
  try {
    const { name, email, password, confirmPassword } = req.body;
    const { error } = signupValidate.validate(
      { name, email, password, confirmPassword },
      { abortEarly: true }
    );
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    // check email đã tồn tại
    const checkEmail = await userSchema.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Email này đã được đăng ký !",
      });
    }
    // ma hoa mat khau khi dky
    const encodePassword = await bcrypt.hash(password, 10);
    //tao accessToken
    const user = await userSchema.create({
      name,
      email,
      password: encodePassword,
    });
    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.status(201).json({
      message: "Tạo tài khoản thành công !",
      user,
      accessToken,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinValidate.validate(
      { email, password },
      { abortEarly: true }
    );
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không chính xác !",
      });
    }
    const checkPassword = await bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không chính xác !",
      });
    }
    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    return res.status(200).json({
      message: "Đăng nhập thành công !",
      data: {
        token: accessToken,
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
