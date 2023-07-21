import Checkout from "../model/orderModer";
import Cart from "../model/cartModel";
import User from "../model/authModel";

const createCheckout = async (req, res) => {
  const { shippingAddress, phoneNumber, userId } = req.body;
  try {
    // const userId = req.user.id;
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
export { createCheckout };
