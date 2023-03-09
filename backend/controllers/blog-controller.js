import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "no blogs found" });
  } else {
    return res.status(200).json({ blogs });
  }
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "unable to find the user by this id" });
  } else {
    const blog = new Blog({
      title,
      description,
      image,
      user,
    });

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await blog.save({ session });
      existingUser.blogs.push(blog);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
    return res.status(200).json({ message: "blog created", blog });
  }
};

export const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description } = req.body;
  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ message: "unable to update the blog" });
  } else {
    return res.status(200).json({ message: "blog updated successfully" });
  }
};

export const getBlogById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  } else {
    return res.status(200).json({ blog });
  }
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ message: "unable to delete the Blog" });
  } else {
    return res.status(200).json({ message: "Successfully deleted the Blog" });
  }
};

export const getBlogsByUserId = async (req, res, next) => {
  const userId = req.params.id;

  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (error) {
    return console.log(error);
  }

  if (!userBlogs) {
    return res.status(404).json({ message: "No blogs found" });
  } else {
    return res.status(200).json({ blogs: userBlogs });
  }
};
