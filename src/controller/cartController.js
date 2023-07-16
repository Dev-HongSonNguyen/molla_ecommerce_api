import cartValidate from "../schema/cartSchema";
import Product from "../model/productModel";
import Cart from "../model/cartModel";
export const getAllCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const carts = await Cart.find({ userId }).populate("productId");
    if (!carts) {
      return res.status(404).json({
        message: "Tài nguyên không tồn tại",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      carts,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getOneCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    const cart = await Cart.findById({ _id: id, userId }).populate("productId");
    if (!cart) {
      return res.json({
        message: "Tài nguyên không tồn tại",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const createCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    const existingCart = await Cart.findOne({ userId, productId });

    if (existingCart) {
      existingCart.quantity += quantity;
      existingCart.totalPrice = existingCart.quantity * existingCart.price;

      await existingCart.save();

      return res.json({
        message: "Thêm vào giỏ hàng thành công!",
        cart: existingCart,
      });
    } else {
      const newCart = new Cart({ productId, userId, quantity });

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          message: "Không tìm thấy sản phẩm",
        });
      }

      newCart.price = product.price;
      newCart.totalPrice = newCart.quantity * newCart.price;
      await newCart.save();

      return res.json({
        message: "Thêm vào giỏ hàng thành công!",
        cart: newCart,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const updateCart = async (req, res) => {
  try {
    const { error } = cartValidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        massage: error.details[0].message,
      });
    }
    const id = req.params.id;
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { _id: id, userId, productId },
      { quantity },
      { new: true }
    );
    if (!cart) {
      return res.json({
        message: "Cập nhật tài nguyên không thành công !",
      });
    }
    return res.json({
      message: "Cập nhật tài nguyên thành công !",
      cart,
    });
  } catch (error) {
    return res.json(400).json({
      message: error,
    });
  }
};
export const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndRemove(req.params.id);
    return res.json({
      message: "Xóa tài nguyên thành công !",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
