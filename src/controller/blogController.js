import Blog from "../model/blogModel"
import blogVlidate from "../schema/blogSchema"
export const getAllBlog = async (req, res) => {
    try {
        const blog = await Blog.find()
        if (!blog) {
            return res.status(400).json({
                message: "Lấy danh sách blog thất bại !"
            })
        }
        return res.status(200).json({
            message: "Lấy danh sách blog thành công",
            blog,
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const getOneBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return res.status(400).json({
                message: "Blog này không tồn tại"
            })
        }
        return res.status(200).json({
            message: "Lấy dữ liệu thành công",
            blog
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const addBlog = async (req, res) => {
    try {
        const { error } = blogVlidate.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const blog = await Blog.create(req.body)
        return res.status(200).json({
            message: "Thêm bài viết thành công",
            blog
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const updateBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (!blog) {
            return res.status(400).json({
                message: "Bài viết này không tồn tại !",
            });
        }
        return res.json({
            message: "Chỉnh sửa bài viết thành công",
            blog,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndRemove(req.params.id)
        if (!blog) {
            return res.status(400).json({
                message: "Bài viết này không tồn tại"
            })
        }
        return res.status(200).json({
            message: "Xóa bài viết thành công"
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}