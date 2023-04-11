import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user").populate("likes");
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
  const { title, description, image, user, date } = req.body;

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
      date,
      likes: [],
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
  const { title, description, image } = req.body;
  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
      image,
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

export const likeBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { user } = req.body;
  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: user },
      },
      { safe: true, upsert: true }
    ).populate("likes");
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ message: "unable to like the blog" });
  } else {
    return res.status(200).json({ message: "blog liked successfully", blog });
  }
};

export const disLikeBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { user } = req.body;
  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: user },
      },
      { safe: true, upsert: true }
    ).populate("likes");
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ message: "unable to remove like from blog" });
  } else {
    return res
      .status(200)
      .json({ message: "blog like removed successfully", blog });
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
    userBlogs = await User.findById(userId).populate({
      path: "blogs",
      populate: { path: "likes" },
    });
  } catch (error) {
    return console.log(error);
  }

  if (!userBlogs) {
    return res.status(404).json({ message: "No blogs found" });
  } else {
    return res.status(200).json({ user: userBlogs });
  }
};
