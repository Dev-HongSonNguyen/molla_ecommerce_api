import express from "express";
import {
  createComment,
  deleteComment,
  getAllComment,
  getCommentByProductId,
} from "../controller/commentController";
import { authenticate } from "../middleware/authenticate";
import { authorization } from "../middleware/authorization";
const router = express.Router();
router.post("/comment", createComment);
router.get("/comment/:productId", getCommentByProductId);
router.get("/comment", getAllComment);
router.delete("/comment/:id", authenticate, authorization, deleteComment);
export default router;
