import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, isSignupActions, linkValueActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const [value, setvalue] = useState(0);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const val = useSelector((state) => state.link.value);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("myBlogs")) {
      dispatch(linkValueActions.myBlog());
    } else if (pathname.includes("blogs/add")) {
      dispatch(linkValueActions.addBlog());
    } else if (pathname.includes("blogs")) {
      dispatch(linkValueActions.allBlog());
    }
  }, [pathname]);

  useEffect(() => {
    setvalue(val);
  }, [val]);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
    setvalue(val);
  }, []);

  return (
    <AppBar position="sticky" sx={{ background: "#6495ED" }}>
      <Toolbar>
        <Button variant="text" LinkComponent={Link} to="/">
          <h1 id="logo">CODER's Blogs</h1>
        </Button>
        {isLoggedIn && (
          <Box
            sx={{ background: "#6495ED" }}
            display="flex"
            marginLeft="auto"
            marginRight="auto"
          >
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => {
                setvalue(val);
              }}
            >
              <Tab label="All Blogs" LinkComponent={Link} to="/" />
              <Tab label="My Blogs" LinkComponent={Link} to="/myBlogs" />
              <Tab label="Add Blog" LinkComponent={Link} to="/blogs/add" />
            </Tabs>
          </Box>
        )}
        <Box sx={{ background: "#6495ED" }} display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                onClick={() => dispatch(isSignupActions.login())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="error"
              >
                Login
              </Button>
              <Button
                onClick={() => dispatch(isSignupActions.signup())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="error"
              >
                Signup
              </Button>
            </>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => {
                localStorage.clear();
                dispatch(authActions.logout());
              }}
              LinkComponent={Link}
              to="/"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="error"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
