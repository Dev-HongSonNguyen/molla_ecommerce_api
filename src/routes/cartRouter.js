import express from "express";
import {
  createCart,
  deleteCart,
  getAllCart,
  getOneCart,
  updateCart,
} from "../controller/cartController";
const router = express.Router();
router.get("/cart", getAllCart);
router.get("/cart/:id", getOneCart);
router.post("/cart", createCart);
router.put("/cart/:id", updateCart);
router.delete("/cart/:id", deleteCart);
export default router;
