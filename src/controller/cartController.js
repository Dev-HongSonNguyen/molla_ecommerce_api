import cartValidate from "../schema/cartSchema";
import Product from "../model/productModel";
import User from "../model/authModel";
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
    let totalAmount = 0;
    let totalQuantity = 0;
    carts.forEach((cart) => {
      totalAmount += cart.totalPrice;
      totalQuantity += cart.quantity;
    });
    return res.json({
      message: "Lấy tài nguyên thành công !",
      carts,
      totalAmount,
      totalQuantity,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getOneCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id).populate("productId");
    if (!cart) {
      return res.status(404).json({
        message: "Không tìm thấy giỏ hàng",
      });
    }
    return res.json({
      message: "Lấy thông tin giỏ hàng thành công",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const existingCart = await Cart.findOne({ userId, productId });

    if (existingCart) {
      existingCart.quantity += quantity;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          message: "Không tìm thấy sản phẩm",
        });
      }

      if (isNaN(existingCart.quantity) || isNaN(product.price)) {
        return res.status(400).json({
          message: "Số lượng hoặc giá sản phẩm không hợp lệ",
        });
      }

      existingCart.totalPrice = existingCart.quantity * product.price;

      await existingCart.save();
      // Tính toán totalAmount cho người dùng
      const carts = await Cart.find({ userId });
      let totalAmount = 0;
      carts.forEach((cart) => {
        totalAmount += cart.totalPrice;
      });

      // Cập nhật totalAmount cho người dùng
      await User.findByIdAndUpdate(userId, { totalAmount });

      await User.findByIdAndUpdate(existingCart.userId, {
        $addToSet: { cart: existingCart._id },
      });

      return res.json({
        message: "Cập nhật giỏ hàng thành công!",
        cart: existingCart,
        totalAmount,
      });
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          message: "Không tìm thấy sản phẩm",
        });
      }
      if (isNaN(quantity) || isNaN(product.price)) {
        return res.status(400).json({
          message: "Số lượng hoặc giá sản phẩm không hợp lệ",
        });
      }
      const newCart = new Cart({
        userId,
        productId,
        quantity,
        totalPrice: quantity * product.price,
      });

      await newCart.save();
      // Tính toán totalAmount cho người dùng
      const carts = await Cart.find({ userId });
      let totalAmount = 0;
      carts.forEach((cart) => {
        totalAmount += cart.totalPrice;
      });

      // Cập nhật totalAmount cho người dùng
      await User.findByIdAndUpdate(userId, { totalAmount });
      return res.json({
        message: "Thêm vào giỏ hàng thành công!",
        cart: newCart,
        totalAmount,
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
