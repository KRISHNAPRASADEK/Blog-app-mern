import { Avatar, Box, Card, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
const userName = "Nivin";

const Profile = () => {
  return (
    <div>
      <Card
        sx={{
          width: "90%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 1,
            m: 1,
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
            {userName.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          variant="h5"
          component="div"
        >
          Krishnaprasad
        </Typography>
      </Card>
    </div>
  );
};

export default Profile;
