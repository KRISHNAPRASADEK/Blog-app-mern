import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const isDelete = useSelector((state) => state.delete.isDelete);
  console.log(isDelete);
  // api request for all blogs
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => {
        console.log(err);
      });

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, [isDelete]);

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            key={index}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={blog.user.name}
            date={blog.date}
            likes={blog.likes}
          />
        ))}
    </div>
  );
};

export default Blogs;
