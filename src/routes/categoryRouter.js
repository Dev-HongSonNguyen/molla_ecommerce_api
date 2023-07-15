import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../controller/categoryController";
import { authenticate } from "../middleware/authenticate";
import { authorization } from "../middleware/authorization";
const router = express.Router();
router.get("/categories", getAllCategory);
router.get("/categories/:id", getOneCategory);
router.post("/categories", authenticate, authorization, addCategory);
router.delete("/categories/:id", authenticate, authorization, deleteCategory);
router.put("/categories/:id", authenticate, authorization, updateCategory);
export default router;
