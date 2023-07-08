import cloudinary from "../config/cloudinary";
export const uploadImage = async (req, res) => {
  const files = req.files;
  if (!Array.isArray(files)) {
    return res.status(400).json({ error: "No files were uploaded" });
  }
  try {
    const uploadPromises = files.map((file) => {
      if (file.mimetype.startsWith("image/")) {
        return cloudinary.uploader.upload(file.path);
      } else if (file.mimetype.startsWith("video/")) {
        return cloudinary.uploader.upload(file.path, {
          resource_type: "video",
        });
      } else {
        throw new Error("Invalid file type");
      }
    });
    console.log("uploadPromises", uploadPromises);
    const results = await Promise.all(uploadPromises);
    const uploadedFiles = results.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));
    return res.json({ urls: uploadedFiles });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteImage = async (req, res) => {
  const publicId = req.params.publicId;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return res.status(200).json({ message: "Xóa file thành công", result });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error deleting image" });
  }
};
export const updateImage = async (req, res) => {
  const files = req.files;
  if (!Array.isArray(files)) {
    return res.status(400).json({ error: "No files were uploaded" });
  }

  const publicId = req.params.publicId; // Lấy publicId của ảnh cần cập nhật
  const newImage = req.files[0].path; // Lấy đường dẫn của ảnh mới

  try {
    const [uploadResult, deleteResult] = await Promise.all([
      cloudinary.uploader.upload(newImage),
      cloudinary.uploader.destroy(publicId),
    ]);
    return res.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message || "Error updating image" });
  }
};
