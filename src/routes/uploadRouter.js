import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  deleteImage,
  updateImage,
  uploadImage,
} from "../controller/uploadController";
import cloudinary from "../config/cloudinary";
const router = express.Router();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Movifx",
    resource_type: "auto",
  },
});
const upload = multer({ storage: storage });
router.post("/images/upload", upload.array("images", 10), uploadImage);
router.delete("/images/:publicId", deleteImage);
router.put("/images/:publicId", upload.array("images", 10), updateImage);

export default router;
