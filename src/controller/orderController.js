import Checkout from "../model/orderModer";
import Cart from "../model/cartModel";
import User from "../model/authModel";

const createCheckout = async (req, res) => {
  const { shippingAddress, phoneNumber } = req.body;
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
    for (const item of carts) {
      totalAmount += item.totalPrice;
      totalQuantity += item.quantity;
    }
    const newCheckout = await Checkout.create({
      userId,
      products: carts.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })),
      totalAmount,
      totalQuantity,
      shippingAddress,
      phoneNumber,
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
export { createCheckout };
