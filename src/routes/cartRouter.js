import express from "express";
import {
  addToCart,
  deleteCart,
  getAllCart,
  getOneCart,
  updateCart,
} from "../controller/cartController";
import { authenticate } from "../middleware/authenticate";
const router = express.Router();
router.get("/cart", authenticate, getAllCart);
router.get("/cart/:id", getOneCart);
router.post("/cart", authenticate, addToCart);
router.put("/cart/:id", authenticate, updateCart);
router.delete("/cart/:id", authenticate, deleteCart);
export default router;
