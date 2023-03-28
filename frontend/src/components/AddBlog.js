import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const labelStyles={mb:1,mt:1,fontSize:"24px",fontWeight:"bold"}
const AddBlog = () => {
  const navigate=useNavigate()
  const [inputs, setinputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange=(e)=>{
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const sendRequest=async()=>{
    const res=await axios.post("http://localhost:5000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image: inputs.imageURL,
      user:localStorage.getItem("userId")
    }).catch((err)=>console.log(err))

    const data=await res.data;
    return data;
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs"))
  }
  return <div>
    <form onSubmit={handleSubmit}>
      <Box border={3} borderColor="gray" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={4} margin={"auto"} marginTop={3} display="flex" flexDirection={"column"} width="60%">
        <Typography fontWeight={"bold"} color="black" variant="h3" textAlign={"center"}>Post Your Blog</Typography>
        <InputLabel sx={labelStyles}>Title</InputLabel>
        <TextField name="title" onChange={handleChange} value={inputs.title} margin="normal" variant="outlined" size="small" sx={{marginTop:0}}/>
        <InputLabel sx={labelStyles}>Description</InputLabel>
        <TextField name="description" onChange={handleChange} value={inputs.description} margin="normal" variant="outlined" size="small"  sx={{marginTop:0}}/>
        <InputLabel sx={labelStyles}>ImageURL</InputLabel>
        <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin="normal" variant="outlined" size="small"  sx={{marginTop:0}}/>
        <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>
      </Box>

    </form>
    
  </div>;
};

export default AddBlog;
