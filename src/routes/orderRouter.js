import express from "express";
import {
  createCheckout,
  deleteOrder,
  getAllOrdersByUser,
  getOneOrder,
  updateOrder,
} from "../controller/orderController";
import { authenticate } from "../middleware/authenticate";
import { authorization } from "../middleware/authorization";

const router = express.Router();
router.post("/checkout", authenticate, createCheckout);
router.get("/checkout", authenticate, getAllOrdersByUser);
router.get("/checkout/:id", authenticate, getOneOrder);
router.delete("/checkout/:id", authenticate, deleteOrder);
router.put("/checkout/:id", authenticate, authorization, updateOrder);
export default router;
