import User from "../model/User";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "no users found" });
  } else {
    return res.status(200).json({ users });
  }
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "user already exists!" });
  } else {
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      blogs: [],
      followers: [],
      following: [],
      description: null,
    });
    try {
      await user.save();
    } catch (error) {
      return console.log(error);
    }
    return res
      .status(201)
      .json({ message: `${name} account is created`, user });
  }
};

export const login = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Incorrect Account / Password" });
  } else {
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Account / Password" });
    } else {
      return res
        .status(200)
        .json({ message: "Login success", user: existingUser });
    }
  }
};

export const followUser = async (req, res, next) => {
  const userId = req.params.id;
  const { followerId } = req.body;
  let user;

  try {
    user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { followers: followerId },
      },
      { safe: true, upsert: true }
    ).populate("followers");
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return res.status(500).json({ message: "unable to follow the user" });
  } else {
    try {
      user = await User.findByIdAndUpdate(
        followerId,
        {
          $push: { following: userId },
        },
        { safe: true, upsert: true }
      ).populate("following");
    } catch (error) {
      return console.log(error);
    }

    if (!user) {
      return res.status(500).json({ message: "unable to follow the user" });
    } else {
      return res.status(200).json({ message: "followed successfully", user });
    }
  }
};

export const unFollowUser = async (req, res, next) => {
  const userId = req.params.id;
  const { followerId } = req.body;
  let user;

  try {
    user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { followers: followerId },
      },
      { safe: true, upsert: true }
    ).populate("followers");
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return res.status(500).json({ message: "unable to unfollow the user" });
  } else {
    try {
      user = await User.findByIdAndUpdate(
        followerId,
        {
          $pull: { following: userId },
        },
        { safe: true, upsert: true }
      ).populate("following");
    } catch (error) {
      return console.log(error);
    }

    if (!user) {
      return res.status(500).json({ message: "unable to unfollow the user" });
    } else {
      return res.status(200).json({ message: "unfollowed successfully", user });
    }
  }
};

export const updateUserProfile = async (req, res, next) => {
  const userId = req.params.id;
  const { name, description } = req.body;
  let user;

  try {
    user = await User.findByIdAndUpdate(userId, {
      name,
      description,
    });
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return res
      .status(500)
      .json({ message: "unable to update the your profile" });
  } else {
    return res.status(200).json({ message: "profile updated successfully" });
  }
};

export const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId)
      .populate("followers")
      .populate("following")
      .populate({
        path: "blogs",
        populate: { path: "likes" },
      });
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return res.status(404).json({ message: "No User found" });
  } else {
    return res.status(200).json({ user });
  }
};
