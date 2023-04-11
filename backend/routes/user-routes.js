import express from "express";
import {
  followUser,
  getAllUsers,
  getUserById,
  login,
  signup,
} from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.post("/signup", signup);

userRouter.post("/login", login);
userRouter.put("/follow/:id", followUser);
userRouter.get("/:id", getUserById);

export default userRouter;
