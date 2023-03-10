import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import blogRouter from "./routes/blog-routes";
import userRouter from "./routes/user-routes";

const server = express();
server.use(cors());

server.use(express.json());
// parse the data to json format
server.use("/api/user", userRouter);

server.use("/api/blog", blogRouter);
mongoose
  .connect(
    "mongodb+srv://test:test@cluster0.surpf9r.mongodb.net/Blog-app-mern?retryWrites=true&w=majority"
  )
  .then(() => {
    server.listen(5000);
  })
  .then(() => {
    console.log("connected to db and listening at port 5000");
  })
  .catch((err) => {
    console.log(err);
  });

// server.use(express.json());
// server.listen(5000, () => {
//   console.log("cart server listening at port number 5000");
// });

// // application specific middleware
// const appMiddleware = (req, res, next) => {
//   res.send("inside application middleware");
//   next();
// };

// server.use(appMiddleware);
