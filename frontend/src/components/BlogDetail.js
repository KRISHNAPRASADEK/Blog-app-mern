import {
  Box,
  Button,
  InputLabel,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { linkValueActions } from "../store";

const BlogDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const labelStyles = { mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold" };
  const [inputs, setinputs] = useState({});

  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetailes = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetailes().then((data) => {
      setBlog(data.blog);
      setinputs({
        title: data.blog.title,
        description: data.blog.description,
        imageURL: data.blog.image,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => dispatch(linkValueActions.myBlog()))
      .then(() => {
        navigate("/myBlogs/");
      });
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={4}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width="60%"
          >
            <Typography
              fontWeight={"bold"}
              color="black"
              variant="h4"
              textAlign={"center"}
            >
              Update Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="normal"
              variant="outlined"
              size="small"
              sx={{ marginTop: 0 }}
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextareaAutosize
              name="description"
              minRows={2}
              onChange={handleChange}
              value={inputs.description}
              margin="normal"
              size="small"
              variant="outlined"
              style={{
                fontSize: "1.1rem",
                padding: "8.5px 14px",
              }}
            />
            <InputLabel sx={labelStyles}>ImageURL</InputLabel>
            <TextField
              name="imageURL"
              onChange={handleChange}
              value={inputs.imageURL}
              margin="normal"
              variant="outlined"
              size="small"
              sx={{ marginTop: 0 }}
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
