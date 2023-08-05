import User from "../model/authModel";
import Product from "../model/productModel";
import Comment from "../model/commentModel";
export const createComment = async (req, res) => {
  const { productId, userId, text } = req.body;
  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
      return res
        .status(404)
        .json({ error: "Người dùng hoặc sản phẩm không tồn tại !" });
    }
    const existingComment = await Comment.findOne({ productId, userId });
    if (existingComment) {
      return res
        .status(400)
        .json({ error: "Bạn chỉ được đánh giá sản phẩm 1 lần" });
    }
    const newComment = new Comment({ productId, userId, text });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const getAllComment = async (req, res) => {
  try {
    const comment = await Comment.find();
    if (!comment) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      comment,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const getCommentByProductId = async (req, res) => {
  const productId = req.params.productId;
  try {
    const comments = await Comment.find({ productId: productId });
    const commentCount = comments.length;
    res.status(200).json({
      message: "Lấy danh sách bình luận thành công",
      comments: comments,
      commentCount: commentCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Đã xảy ra lỗi khi lấy dữ liệu bình luận." });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const delComment = await Comment.findByIdAndDelete(req.params.id);
    if (!delComment) {
      return res.status(404).json({
        success: false,
        message: "Comment không tồn tại",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Xóa comment thành công",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Xóa comment thất bại" });
  }
};
