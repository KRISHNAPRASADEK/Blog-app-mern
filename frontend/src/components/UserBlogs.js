import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  const isDelete = useSelector((state) => state.delete.isDelete);
  console.log(isDelete);

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
    });
  }, [isDelete]);

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
    });
  }, []);
  console.log(user);

  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={true}
            key={index}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
