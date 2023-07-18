import express from "express";
import {
  getAllUsers,
  getOneUser,
  signin,
  signup,
} from "../controller/authController";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", getAllUsers);
router.get("/users/:id", getOneUser);
export default router;
