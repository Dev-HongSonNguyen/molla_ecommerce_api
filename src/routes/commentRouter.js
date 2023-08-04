import express from "express";
import {
  createComment,
  getCommentByProductId,
} from "../controller/commentController";
const router = express.Router();
router.post("/comment", createComment);
router.get("/comment/:productId", getCommentByProductId);
export default router;
