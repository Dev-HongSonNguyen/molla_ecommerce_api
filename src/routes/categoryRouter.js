import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../controller/categoryController";
const router = express.Router();
router.get("/categories", getAllCategory);
router.get("/categories/:id", getOneCategory);
router.post("/categories", addCategory);
router.delete("/categories/:id", deleteCategory);
router.put("/categories/:id", updateCategory);
export default router;
