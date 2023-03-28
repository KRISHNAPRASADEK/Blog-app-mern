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
  const {pathname} = useLocation();
  console.log(pathname)
  const dispatch = useDispatch();
  const [value, setvalue] = useState(0);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  const val = useSelector((state) => state.link.value);
  
  

  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }
    if(pathname=="/blogs/add"){
      dispatch(linkValueActions.addBlog())
    }else if(pathname=="/myBlogs"){
      dispatch(linkValueActions.myBlog())
    }
    setvalue(val)
  }, [])

  return (
    <AppBar position="sticky" sx={{ background: "#f60661" }}>
      <Toolbar>
        <Typography variant="h4">BlogsApp</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => {
                setvalue(val);
              }}
            >
              <Tab label="All Blogs" LinkComponent={Link} to="/blogs" />
              <Tab label="My Blogs" LinkComponent={Link} to="/myBlogs" />
              <Tab label="Add Blog" LinkComponent={Link} to="/blogs/add" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                onClick={() => dispatch(isSignupActions.login())}
                LinkComponent={Link}
                to="/"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="error"
              >
                Login
              </Button>
              <Button
                onClick={() => dispatch(isSignupActions.signup())}
                LinkComponent={Link}
                to="/"
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
              onClick={() =>{
                 localStorage.clear()
                 dispatch(authActions.logout())
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
