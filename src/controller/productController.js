import Product from "../model/productModel";
import Category from "../model/categoryModel";
import productValidate from "../schema/productSchema";
export const getAllProduct = async (req, res) => {
  const { _limit = 50, _sort, _order } = req.query;
  const options = {
    limit: _limit,
  };
  try {
    const product = await Product.paginate({}, options);
    if (!product) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      product,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      product,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const addProduct = async (req, res) => {
  try {
    const { error } = productValidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const product = await Product.create(req.body);
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: { products: product._id },
    });
    if (!product) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Thêm tài nguyên thành công !",
      product,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    const categoryId = product.categoryId;
    await Category.findByIdAndUpdate(categoryId, {
      $pull: { products: product._id },
    });
    return res.json({
      message: "Xóa tài nguyên thành công !",
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { error } = productValidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const id = req.params.id;
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: { products: product._id },
    });
    if (!product) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Update tài nguyên thành công !",
      product,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
