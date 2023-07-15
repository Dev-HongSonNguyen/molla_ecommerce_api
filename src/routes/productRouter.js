import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
} from "../controller/productController";
import { authenticate } from "../middleware/authenticate";
import { authorization } from "../middleware/authorization";
const router = express.Router();
router.get("/products", getAllProduct);
router.get("/products/:id", getOneProduct);
router.delete("/products/:id", authenticate, authorization, deleteProduct);
router.post("/products", authenticate, authorization, addProduct);
router.put("/products/:id", authenticate, authorization, updateProduct);
export default router;
