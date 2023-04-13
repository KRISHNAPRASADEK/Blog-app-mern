import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteSliceActions } from "../store";

const Blog = ({
  title,
  description,
  image,
  userName,
  isUser,
  id,
  userId,
  date,
  likes,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open2, setOpen2] = useState(false);
  const [likeOpen, setLikeOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(likes);
  const isLiked = likes.some((i) => i._id == localStorage.getItem("userId"));

  const handleClickOpen = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen2(false);
  };

  const handleClickLikesOpen = () => {
    setLikeOpen(true);
  };

  const handleLikesClose = () => {
    setLikeOpen(false);
  };

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const viewUser = (id) => {
    navigate(`/user/${id}`);
    dispatch(deleteSliceActions.delete());
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then((data) => console.log(data))
      .then(() => navigate(""))
      .then(() => {
        navigate("/myBlogs");
        dispatch(deleteSliceActions.delete());
      });
  };

  const likeThePostRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/like/${id}`, {
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const likeTheBlog = () => {
    likeThePostRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs"))
      .then(() => {
        navigate("");
        dispatch(deleteSliceActions.delete());
      });
  };

  // dislike
  const disLikeThePostRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/dislike/${id}`, {
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const disLikeTheBlog = () => {
    disLikeThePostRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs"))
      .then(() => {
        navigate("");
        dispatch(deleteSliceActions.delete());
      });
  };

  console.log(isLiked);
  console.log(isUser);

  return (
    <div>
      <Card
        sx={{
          width: "70%",
          margin: "auto",
          mt: 2,
          mb: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <CardHeader
          avatar={
            isUser ? (
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                sx={{ bgcolor: blue[500], cursor: "pointer" }}
                aria-label="recipe"
                onClick={() => viewUser(userId)}
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            )
          }
          action={
            isUser && (
              <Box display="flex">
                <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                  <EditIcon color="info" />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            )
          }
          title={userName}
          subheader={date}
        />
        <CardMedia
          component="img"
          height="260"
          image={image}
          alt="Paella dish"
          sx={{ paddingBottom: "10px", borderBottom: "1px solid gray" }}
        />
        <CardContent>
          <Typography variant="h5" color="black">
            {title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {isLoggedIn && (
            <>
              {isLiked ? (
                <Button
                  aria-label="remove from favorites"
                  onClick={disLikeTheBlog}
                  sx={{
                    color: "red",
                    textTransform: "none",
                    minWidth: "36px",
                  }}
                >
                  <FavoriteIcon />
                </Button>
              ) : (
                <Button
                  aria-label="add to favorites"
                  onClick={likeTheBlog}
                  sx={{
                    color: "gray",
                    textTransform: "none",
                    minWidth: "36px",
                  }}
                >
                  <FavoriteIcon />
                </Button>
              )}
              <Button
                sx={{ color: "gray", minWidth: "30px" }}
                onClick={handleClickLikesOpen}
              >
                {likes.length}
              </Button>

              {/* liked users list dialog */}
              <Dialog
                open={likeOpen}
                onClose={handleLikesClose}
                aria-labelledby={`alert-dialog-title-${id}`}
                aria-describedby={`alert-dialog-description-${id}`}
                fullWidth={true}
              >
                <Alert
                  severity="info"
                  onClose={() => {
                    handleLikesClose();
                  }}
                  sx={{ padding: "1rem", fontSize: "1rem" }}
                >
                  Likes
                </Alert>
                {likes.length ? (
                  <List sx={{ pt: 0 }}>
                    {likes.map((user) => (
                      <ListItem disableGutters>
                        <ListItemButton
                          key={user._id}
                          onClick={() => viewUser(user._id)}
                        >
                          <ListItemAvatar>
                            <Avatar
                              sx={{ bgcolor: blue[500] }}
                              aria-label="recipe"
                            >
                              {user.name.charAt(0).toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              user._id === localStorage.getItem("userId") ? (
                                <span style={{ color: "darkblue" }}>You</span>
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
                  <DialogTitle>0 Likes</DialogTitle>
                )}
              </Dialog>
            </>
          )}
          {!isLoggedIn && (
            <Button
              aria-label="add to favorites"
              sx={{
                color: "gray",
                textTransform: "none",
                minWidth: "36px",
              }}
              onClick={handleClickOpen}
            >
              <FavoriteIcon /> &nbsp; {likes.length}
            </Button>
          )}

          {/* please login alert */}
          <Dialog
            open={open2}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth="true"
          >
            <Alert
              severity="error"
              onClose={() => {
                handleClose();
              }}
              sx={{ padding: "1rem", fontSize: "1rem" }}
            >
              Please Login, to like the post and see the likes!
            </Alert>
          </Dialog>

          <Button
            title="show more"
            onClick={() => setOpen(!open)}
            aria-label="expand"
            size="small"
            sx={{
              color: "gray",
              textTransform: "none",
              marginLeft: "auto",
            }}
          >
            {open ? (
              <>
                Hide
                <KeyboardArrowUpIcon />
              </>
            ) : (
              <>
                Show More
                <KeyboardArrowDownIcon />
              </>
            )}
          </Button>
        </CardActions>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CardContent>
            <Container
              sx={{
                lineHeight: 2,
              }}
            >
              <Typography variant="body1" gutterBottom>
                {description}
              </Typography>
            </Container>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default Blog;
