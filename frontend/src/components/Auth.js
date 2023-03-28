import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
import { isSignupActions } from "../store";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignup = useSelector((state) => state.sign.isSignup);
  console.log(isSignup);
  const [inputs, setinputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  

  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // api request for login
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
        console.log(err);
      });

    const data = await res.data;

    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => {
          console.log(data.user._id);
          localStorage.setItem("userId",data.user._id)
        })
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId",data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ boxShadow: 5 }}
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h4" padding={2} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              type="text"
              placeholder="Name"
              margin="normal"
              sx={{ width: 1 }}
              value={inputs.name}
              name="name"
              onChange={handleChange}
            />
          )}
          <TextField
            type="email"
            placeholder="Email"
            margin="normal"
            sx={{ width: 1 }}
            value={inputs.email}
            name="email"
            onChange={handleChange}
          />
          <TextField
            type="password"
            placeholder="Password"
            margin="normal"
            sx={{ width: 1 }}
            value={inputs.password}
            name="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="error"
          >
            Submit
          </Button>
          {isSignup?<Button
            onClick={() => dispatch(isSignupActions.login())}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Click here for Login
          </Button>:
          <Button
          onClick={() => dispatch(isSignupActions.signup())}
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Click here for Signup
        </Button>
          }
        </Box>
      </form>
    </div>
  );
};

export default Auth;
