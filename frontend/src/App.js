import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <header style={{ marginBottom: "5rem" }}>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/add" element={<AddBlog />} />
          <Route path="/myBlogs" element={<UserBlogs />} />
          <Route path="/myBlogs/:id" element={<BlogDetail />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route
            path="*"
            element={
              <h1 style={{ marginTop: "200px", textAlign: "center" }}>
                Page Not Found/Inavalid Link
              </h1>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
