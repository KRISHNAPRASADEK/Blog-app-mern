import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import BookIcon from "@mui/icons-material/Book";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Blog from "./Blog";
import { deleteSliceActions } from "../store";

const Profile = () => {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [loginOpen, setLoginOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const isDelete = useSelector((state) => state.delete.isDelete);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickFollowersOpen = () => {
    setFollowersOpen(true);
  };

  const handleFollowersClose = () => {
    setFollowersOpen(false);
  };
  const handleClickFollowingOpen = () => {
    setFollowingOpen(true);
  };

  const handleFollowingClose = () => {
    setFollowingOpen(false);
  };

  const addBlog = () => {
    navigate("/blogs/add");
  };

  const viewUser = (id) => {
    navigate(`/user/${id}`);
    dispatch(deleteSliceActions.delete());
    setFollowingOpen(false);
    setFollowersOpen(false);
  };
  // api request for user profile
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/user/${id}`)
      .catch((err) => {
        console.log(err);
      });

    const data = await res.data;
    return data;
  };

  const followUserRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/user/follow/${id}`, {
        followerId: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const followUser = () => {
    if (localStorage.getItem("userId")) {
      followUserRequest()
        .then((data) => console.log(data))
        .then(() => {
          dispatch(deleteSliceActions.delete());
        });
    } else {
      handleLoginClick();
    }
  };

  const unFollowUserRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/user/unfollow/${id}`, {
        followerId: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const unFollowUser = () => {
    unFollowUserRequest()
      .then((data) => console.log(data))
      .then(() => {
        dispatch(deleteSliceActions.delete());
      });
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const sendEditedProfileRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/user/update/${id}`, {
        name: inputs.name,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendEditedProfileRequest()
      .then((data) => console.log(data))
      .then(() => {
        dispatch(deleteSliceActions.delete());
        setEdit(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setUserId(localStorage.getItem("userId"));
    }
    sendRequest().then((data) => {
      setProfile(data.user);
      setLoading(false);
      setInputs({
        name: data.user.name,
        description: data.user.description
          ? data.user.description
          : "enter about you",
      });
    });
  }, []);

  useEffect(() => {
    sendRequest().then((data) => {
      setProfile(data.user);
      setLoading(false);
      setInputs({
        name: data.user.name,
        description: data.user.description
          ? data.user.description
          : "enter about you",
      });
    });
  }, [isDelete]);

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setLoginOpen(false);
  };

  console.log(profile);
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
      {profile && (
        <>
          <Card
            sx={{
              width: "70%",
              margin: "auto",
              mt: 2,
              padding: 2,
              boxShadow: "5px 5px 10px #ccc",
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            {!edit && profile._id == localStorage.getItem("userId") && (
              <IconButton
                sx={{ display: "flex", marginLeft: "auto" }}
                onClick={handleEdit}
              >
                <EditIcon color="info" />
              </IconButton>
            )}
            {edit && (
              <>
                <Typography
                  variant="h5"
                  display="flex"
                  sx={{ justifyContent: "center", margin: 1 }}
                  color="darkblue"
                >
                  <EditIcon color="inherit" /> Edit Your Profile
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Box display="flex" justifyContent="center">
                    <Box m="auto">
                      <TextField
                        id="standard-name"
                        label="Name"
                        name="name"
                        variant="standard"
                        onChange={handleChange}
                        value={inputs.name}
                        sx={{ width: "17rem" }}
                      />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Box m="auto">
                      <TextField
                        id="standard-about"
                        label="About"
                        name="description"
                        onChange={handleChange}
                        value={inputs.description}
                        variant="standard"
                        sx={{ width: "17rem", marginTop: 2 }}
                      />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Button
                      sx={{
                        m: 2,
                        borderRadius: 4,
                        width: "48%",
                      }}
                      variant="contained"
                      color="warning"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              </>
            )}
            {!edit && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 1,
                    paddingTop: 0,
                    m: 1,
                    marginTop: 0,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: blue[500],
                      width: 56,
                      height: 56,
                    }}
                    aria-label="username"
                  >
                    {profile.name.charAt(0).toUpperCase()}
                  </Avatar>{" "}
                </Box>{" "}
                <Typography
                  sx={{ display: "flex", justifyContent: "center" }}
                  variant="h5"
                  component="div"
                >
                  {profile.name}
                </Typography>
                {profile._id != localStorage.getItem("userId") && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {profile.followers.some(
                      (i) => i._id === localStorage.getItem("userId")
                    ) ? (
                      <>
                        <Typography
                          sx={{ marginTop: "10px" }}
                          variant="overline"
                          gutterBottom
                        >
                          Following
                        </Typography>{" "}
                        &nbsp; &nbsp;
                        <Button
                          color="success"
                          sx={{ borderRadius: "50px" }}
                          variant="contained"
                          onClick={unFollowUser}
                        >
                          Unfollow
                        </Button>
                      </>
                    ) : (
                      <Button
                        color="info"
                        sx={{ borderRadius: "50px", m: 1 }}
                        variant="contained"
                        onClick={followUser}
                      >
                        Follow
                      </Button>
                    )}
                  </Box>
                )}
                <Typography
                  display="flex"
                  color="primary"
                  variant="subtitle1"
                  sx={{
                    marginTop: 2,
                    marginBottom: 0,
                    justifyContent: "center",
                  }}
                  gutterBottom
                >
                  About me
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {"description" in profile && profile.description ? (
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{ textAlign: "center", width: "50%" }}
                    >
                      {profile.description}
                    </Typography>
                  ) : (
                    <>
                      <InfoIcon color="disabled" />
                      <Typography
                        variant="caption"
                        display="block"
                        marginTop={1}
                        gutterBottom
                      >
                        {profile._id == localStorage.getItem("userId")
                          ? "Click edit to add about"
                          : `${profile.name} haven't added about him`}
                      </Typography>
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button id="b1" variant="outlined" disabled>
                    {profile.blogs.length} posts
                  </Button>
                  <Button id="b1" variant="outlined" disabled>
                    {profile.blogs.reduce((acc, blog) => {
                      return acc + blog.likes.length;
                    }, 0)}{" "}
                    Likes
                  </Button>
                  <Button
                    id="b1"
                    variant="outlined"
                    onClick={handleClickFollowersOpen}
                  >
                    {profile.followers.length} followers
                  </Button>
                  {/* followers list */}
                  <Dialog
                    open={followersOpen}
                    onClose={handleFollowersClose}
                    aria-labelledby="alert-dialog-title-followers"
                    aria-describedby="alert-dialog-description-followers"
                    fullWidth={true}
                  >
                    <Alert
                      severity="info"
                      onClose={() => {
                        handleFollowersClose();
                      }}
                      sx={{ padding: "1rem", fontSize: "1rem" }}
                    >
                      Followers
                    </Alert>
                    {profile.followers.length ? (
                      <List sx={{ pt: 0 }}>
                        {profile.followers.map((user) => (
                          <ListItem disableGutters>
                            <ListItemButton
                              key={user._id}
                              onClick={() => viewUser(user._id)}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  sx={{ bgcolor: blue[500] }}
                                  aria-label="follower"
                                >
                                  {user.name.charAt(0).toUpperCase()}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  user._id === userId ? (
                                    <span style={{ color: "darkblue" }}>
                                      You
                                    </span>
                                  ) : (
                                    user.name
                                  )
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <DialogTitle>0 followers</DialogTitle>
                    )}
                  </Dialog>

                  <Button
                    id="b1"
                    variant="outlined"
                    onClick={handleClickFollowingOpen}
                  >
                    {profile.following.length} following
                  </Button>
                  {/* following list */}
                  <Dialog
                    open={followingOpen}
                    onClose={handleFollowingClose}
                    aria-labelledby="alert-dialog-title-following"
                    aria-describedby="alert-dialog-description-following"
                    fullWidth={true}
                  >
                    <Alert
                      severity="info"
                      onClose={() => {
                        handleFollowingClose();
                      }}
                      sx={{ padding: "1rem", fontSize: "1rem" }}
                    >
                      Following
                    </Alert>
                    {profile.following.length ? (
                      <List sx={{ pt: 0 }}>
                        {profile.following.map((user) => (
                          <ListItem disableGutters>
                            <ListItemButton
                              key={user._id}
                              onClick={() => viewUser(user._id)}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  sx={{ bgcolor: blue[500] }}
                                  aria-label="following"
                                >
                                  {user.name.charAt(0).toUpperCase()}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  user._id === userId ? (
                                    <span style={{ color: "darkblue" }}>
                                      You
                                    </span>
                                  ) : (
                                    user.name
                                  )
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <DialogTitle>0 following</DialogTitle>
                    )}
                  </Dialog>
                </Box>
              </>
            )}
          </Card>
          {/* alert when follow clicked if not signup */}
          <Snackbar
            open={loginOpen}
            autoHideDuration={3000}
            onClose={handleLoginClose}
          >
            <Alert
              onClose={handleLoginClose}
              severity="warning"
              sx={{ width: "100%", background: "#FF4500", color: "white" }}
            >
              Please Login to follow!
            </Alert>
          </Snackbar>
          <Typography
            display="block"
            color="black"
            variant="h4"
            sx={{ margin: "auto", marginTop: 2, width: "70% " }}
            gutterBottom
          >
            <BookIcon sx={{ marginTop: 1 }} color="inherit" />
            Blogs
          </Typography>
          {!profile.blogs.length && (
            <>
              <Typography
                sx={{ display: "flex", justifyContent: "center", m: 3 }}
                variant="h5"
                gutterBottom
              >
                <InfoIcon sx={{ marginTop: "4px" }} />
                &nbsp;&nbsp;
                {localStorage.getItem("userId") === profile._id
                  ? "You"
                  : profile.name}
                &nbsp;haven't added any blogs yet
              </Typography>
              {localStorage.getItem("userId") === profile._id && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ background: "transparent" }}
                >
                  <Button
                    variant="contained"
                    sx={{ borderRadius: 4 }}
                    onClick={addBlog}
                  >
                    Click here to add blog
                  </Button>
                </Box>
              )}
            </>
          )}

          {profile.blogs &&
            profile.blogs.map((blog, index) => (
              <Blog
                key={index}
                id={blog._id}
                isUser={localStorage.getItem("userId") === blog.user}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                userName={profile.name}
                date={blog.date}
                likes={blog.likes}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default Profile;
