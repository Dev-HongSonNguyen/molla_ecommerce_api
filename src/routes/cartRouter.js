import express from "express";
import {
  createCart,
  deleteCart,
  getAllCart,
  getOneCart,
  updateCart,
} from "../controller/cartController";
import { authenticate } from "../middleware/authenticate";
const router = express.Router();
router.get("/cart", getAllCart);
router.get("/cart/:id", getOneCart);
router.post("/cart", authenticate, createCart);
router.put("/cart/:id", authenticate, updateCart);
router.delete("/cart/:id", authenticate, deleteCart);
export default router;
