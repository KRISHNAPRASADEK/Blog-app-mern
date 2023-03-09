import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByUserId,
  updateBlog,
} from "../controllers/blog-controller";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
// to get particular blog by its id
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlog);
// to get all blogs of particular user
blogRouter.get("/user/:id", getBlogsByUserId);

export default blogRouter;
