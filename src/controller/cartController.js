import cartValidate from "../schema/cartSchema";
import Product from "../model/productModel";
import Cart from "../model/cartModel";
export const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find();
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
    const cart = await Cart.findById(req.params.id);

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
    const existingCart = await Cart.findOne({ productId });

    if (existingCart) {
      existingCart.quantity += quantity;
      existingCart.totalPrice = existingCart.quantity * existingCart.price;

      await existingCart.save();

      return res.json({
        message: "Thêm vào giỏ hàng thành công!",
        cart: existingCart,
      });
    } else {
      const newCart = new Cart({ productId, quantity });

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
    const cart = await Cart.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
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
