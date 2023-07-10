import Category from "../model/categoryModel";
export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    if (!category) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if (!category) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Thêm tài nguyên thành công !",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Xóa tài nguyên thành công !",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOneAndUpdate({ _id: id }, req.body);
    if (!category) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Update tài nguyên thành công !",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
