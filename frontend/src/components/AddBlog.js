import {
  Box,
  Button,
  InputLabel,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold" };
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    let date = Date().slice(0, 15);
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
        date: date,
        likes: [],
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (inputs.title && inputs.description && inputs.imageURL) {
      sendRequest()
        .then((data) => console.log(data))
        .then(() => navigate("/myBlogs"));
    } else {
      alert("Invalid Inputs");
    }
  };
  return (
    <div>
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
            Post Your Blog
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
    </div>
  );
};

export default AddBlog;
