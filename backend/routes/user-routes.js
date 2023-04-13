import express from "express";
import {
  followUser,
  getAllUsers,
  getUserById,
  login,
  signup,
  unFollowUser,
  updateUserProfile,
} from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.post("/signup", signup);

userRouter.post("/login", login);
userRouter.put("/follow/:id", followUser);
userRouter.put("/unfollow/:id", unFollowUser);
userRouter.get("/:id", getUserById);
userRouter.put("/update/:id", updateUserProfile);

export default userRouter;
