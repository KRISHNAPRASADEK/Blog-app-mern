import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authActions,
  deleteSliceActions,
  isSignupActions,
  linkValueActions,
} from "../store";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const dispatch = useDispatch();
  const [value, setvalue] = useState(0);
  const [id, setId] = useState();
  const pages = [
    { label: "All Blogs", to: "/" },
    { label: "My Blogs", to: "/myBlogs" },
    { label: "Add Blog", to: "/blogs/add" },
    { label: "Profile", to: `/user/${id}` },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDelete = useSelector((state) => state.delete.isDelete);

  const val = useSelector((state) => state.link.value);
  const { pathname } = useLocation();

  useEffect(() => {
    TabChangeOnPathChange();
  }, [pathname]);

  const TabChangeOnPathChange = () => {
    if (pathname.includes("myBlogs")) {
      dispatch(linkValueActions.myBlog());
    } else if (pathname.includes("blogs/add")) {
      dispatch(linkValueActions.addBlog());
    } else if (pathname.includes("blogs")) {
      dispatch(linkValueActions.allBlog());
    } else if (pathname.includes("user")) {
      dispatch(linkValueActions.profile());
    }
  };

  useEffect(() => {
    setvalue(val);
  }, [val]);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
      setId(localStorage.getItem("userId"));
    }
    setvalue(val);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setId(localStorage.getItem("userId"));
      TabChangeOnPathChange();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    TabChangeOnPathChange();
  }, [isDelete]);

  return (
    <AppBar position="fixed" sx={{ background: "#6495ED" }}>
      <Toolbar>
        <Button
          variant="text"
          LinkComponent={Link}
          to="/"
          sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
        >
          <h1 id="logo">CODER's Blogs</h1>
        </Button>
        {isLoggedIn && (
          <Box
            sx={{
              background: "#6495ED",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.to}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        <Button
          variant="text"
          LinkComponent={Link}
          to="/"
          sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1, mr: 1 }}
        >
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
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              onChange={(e, val) => {
                setvalue(val);
              }}
            >
              <Tab label="All Blogs" LinkComponent={Link} to="/" />
              <Tab label="My Blogs" LinkComponent={Link} to="/myBlogs" />
              <Tab label="Add Blog" LinkComponent={Link} to="/blogs/add" />
              <Tab label="Profile" LinkComponent={Link} to={`/user/${id}`} />
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
                color="primary"
              >
                Login
              </Button>
              <Button
                onClick={() => dispatch(isSignupActions.signup())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="primary"
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
                dispatch(deleteSliceActions.delete());
              }}
              LinkComponent={Link}
              to="/"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="primary"
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
