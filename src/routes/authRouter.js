import express from "express";
import {
  deleteUser,
  getAllUsers,
  getOneUser,
  signin,
  signup,
  updateUserbyAdmin,
  updateUserbyUser,
} from "../controller/authController";
import { authenticate } from "../middleware/authenticate";
import { authorization } from "../middleware/authorization";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", getAllUsers);
router.get("/users/:id", getOneUser);
router.put("/userbyAdmin/:id", authenticate, authorization, updateUserbyAdmin);
router.put("/userbyUser/:id", authenticate, updateUserbyUser);
router.delete("/users/:id", authenticate, authorization, deleteUser);
export default router;
