import express from "express";
import { createCheckout } from "../controller/orderController";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();
router.post("/checkout", authenticate, createCheckout);

export default router;
