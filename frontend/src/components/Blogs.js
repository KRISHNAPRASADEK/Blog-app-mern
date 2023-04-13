import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
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
    sendRequest().then((data) => {
      setBlogs(data.blogs);
      setLoading(false);
    });
  }, [isDelete]);

  useEffect(() => {
    sendRequest().then((data) => {
      setBlogs(data.blogs);
      setLoading(false);
    });
  }, []);

  console.log(blogs);
  return (
    <div>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="90vh"
          sx={{ background: "transparent" }}
        >
          <CircularProgress size="5rem" />
        </Box>
      )}
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            userId={blog.user._id}
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
      {blogs && blogs.length == 0 && (
        <Typography
          sx={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
          variant="h5"
          gutterBottom
        >
          <ErrorIcon sx={{ marginRight: 2 }} fontSize="large" /> No blogs found
        </Typography>
      )}
    </div>
  );
};

export default Blogs;
