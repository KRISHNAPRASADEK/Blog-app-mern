import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions, linkValueActions } from "../store";
import { isSignupActions } from "../store";
import { useForm } from "react-hook-form";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignup = useSelector((state) => state.sign.isSignup);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (inputs, e) => {
    setLoading(true);
    e.preventDefault();

    const sendRequest = async (type = "login") => {
      const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      const data = await res.data;
      return data;
    };

    if (isSignup) {
      sendRequest("signup")
        .then((data) => {
          setLoading(false);
          console.log(data.user._id);
          localStorage.setItem("userId", data.user._id);
        })
        .then(() => {
          dispatch(authActions.login());
          dispatch(linkValueActions.allBlog());
        })
        .then(() => navigate("/"))
        .then(() => {
          reset();
        })
        .catch((err) => {
          error(err);
        });
    } else {
      sendRequest()
        .then((data) => {
          setLoading(false);
          localStorage.setItem("userId", data.user._id);
        })
        .then(() => {
          dispatch(authActions.login());
          dispatch(linkValueActions.allBlog());
        })
        .then(() => navigate("/"))
        .then(() => {
          reset();
        })
        .catch((err) => {
          error(err);
        });
    }
  };

  useEffect(() => {
    reset();
  }, [isSignup]);

  const error = (err) => {
    setLoading(false);
    if (err.response) {
      // The client was given an error response (5xx, 4xx)
      setErrorMsg(err.response.data.message);
      reset();
    } else if (err.request) {
      // The client never received a response, and the request was never left
      setErrorMsg("Server Busy Try Again");
      console.log(err.request);
    } else {
      // Anything else
      setErrorMsg("Server Busy Try Again");
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          // alignItems="center"
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
              name="name"
              {...register("name", {
                required: true,
                maxLength: 15,
                minLength: 4,
                pattern: /^([a-zA-Z]*)$/,
              })}
            />
          )}
          {errors.name && isSignup && (
            <p className="form-input-error">Please check the Name</p>
          )}
          <TextField
            type="email"
            placeholder="Email"
            margin="normal"
            sx={{ width: 1 }}
            name="email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && (
            <p className="form-input-error">Please check the Email</p>
          )}

          <TextField
            type="password"
            placeholder="Password"
            margin="normal"
            sx={{ width: 1 }}
            name="password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
            })}
          />
          {errors.password && (
            <p className="form-input-error">Please check the Password</p>
          )}
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="error"
          >
            Submit &nbsp; {loading && <CircularProgress color="inherit" />}
          </Button>
          {isSignup ? (
            <Button
              onClick={() => dispatch(isSignupActions.login())}
              sx={{ borderRadius: 3, marginTop: 3 }}
            >
              Click here for Login
            </Button>
          ) : (
            <Button
              onClick={() => dispatch(isSignupActions.signup())}
              sx={{ borderRadius: 3, marginTop: 3 }}
            >
              Click here for Signup
            </Button>
          )}
        </Box>
      </form>
    </div>
  );
};

export default Auth;
