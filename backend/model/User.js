import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  description: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);

// in mongodb collection will be stored as users
