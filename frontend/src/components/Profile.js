import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import BookIcon from "@mui/icons-material/Book";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Blog from "./Blog";
const userName = "Nivin";

const Profile = () => {
  const [profile, setProfile] = useState();
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const isDelete = useSelector((state) => state.delete.isDelete);
  const { id } = useParams();
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

  useEffect(() => {
    sendRequest().then((data) => setProfile(data.user));
  }, []);
  useEffect(() => {
    sendRequest().then((data) => setProfile(data.user));
  }, [isDelete]);
  console.log(profile);
  return (
    <div>
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
            <IconButton sx={{ display: "flex", marginLeft: "auto" }}>
              <EditIcon color="info" />
            </IconButton>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
              >
                Follow
              </Button>
              <Button
                color="success"
                sx={{ borderRadius: "50px" }}
                variant="contained"
              >
                Unfollow
              </Button>
            </Box>
            <Typography
              display="flex"
              color="primary"
              variant="subtitle1"
              sx={{ marginTop: 2, marginBottom: 0, justifyContent: "center" }}
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
                    Click edit to add about
                  </Typography>
                </>
              )}
              {/* <form>
            <TextField
              id="standard-password-input"
              label="Enter about yourself"
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: 10, marginTop: 1 }}
              color="error"
            >
              Submit
            </Button>
          </form> */}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button id="b1" variant="outlined" disabled>
                {profile.blogs.length} posts
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
                        <ListItemButton key={user._id}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{ bgcolor: blue[500] }}
                              aria-label="follower"
                            >
                              {user.name.charAt(0).toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={user.name} />
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
                        <ListItemButton key={user._id}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{ bgcolor: blue[500] }}
                              aria-label="following"
                            >
                              {user.name.charAt(0).toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={user.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <DialogTitle>0 following</DialogTitle>
                )}
              </Dialog>
            </Box>
          </Card>
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
                sx={{ display: "flex", justifyContent: "center" }}
                variant="h5"
                gutterBottom
              >
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
