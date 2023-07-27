import Checkout from "../model/orderModer";
import Cart from "../model/cartModel";
import User from "../model/authModel";

const createCheckout = async (req, res) => {
  const { shippingAddress, phoneNumber, userId } = req.body;
  try {
    const carts = await Cart.find({ userId }).populate("productId");
    if (!carts) {
      return res.status(404).json({
        message: "Tài nguyên không tồn tại",
      });
    }
    let totalAmount = 0;
    for (const item of carts) {
      totalAmount += item.totalPrice;
    }
    const newCheckout = await Checkout.create({
      userId,
      totalAmount,
      shippingAddress,
      phoneNumber,
      carts,
    });
    await Cart.deleteMany({ userId });
    await User.findByIdAndUpdate(userId, { $set: { cart: [] } });
    return res.status(201).json({
      success: true,
      checkout: newCheckout,
      message: "Thanh toán đơn hàng thành công",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Thanh toán đơn hàng không thành công" });
  }
};
const getAllOrdersByUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await Checkout.find({ userId }).populate("carts.productId");
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Lấy danh sách đơn hàng thất bại" });
  }
};
const getAllOrder = async (req, res) => {
  try {
    const orders = await Checkout.find();
    if (!orders) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      orders,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
const getOneOrder = async (req, res) => {
  try {
    const orders = await Checkout.findById(req.params.id).populate(
      "carts.productId"
    );
    if (!orders) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      orders,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Checkout.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Đơn hàng không tồn tại",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Xóa đơn hàng thành công",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Xóa đơn hàng thất bại" });
  }
};
export const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const orders = await Checkout.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!orders) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Update tài nguyên thành công !",
      orders,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export {
  createCheckout,
  getAllOrdersByUser,
  getOneOrder,
  deleteOrder,
  getAllOrder,
};
