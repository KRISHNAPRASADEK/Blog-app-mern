import {
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
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteSliceActions } from "../store";

const Blog = ({ title, description, image, userName, isUser, id }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
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
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userName.charAt(0)}
            </Avatar>
          }
          action={
            isUser && (
              <Box display="flex">
                <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                  <EditIcon color="warning" />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            )
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />

        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> : {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

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
              An interview-centric course designed to prepare you for the role
              of SDE for both product and service-based companies. A placement
              preparation pack built with years of expertise. Learn Resume
              Building, C++, Java, DSA, CS Theory concepts, Aptitude, Reasoning,
              LLD, and much more!
            </Container>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default Blog;
