import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/User";
import CreatePost from "./pages/Posts/CreatePost";
import Home from "./pages/Home";
import PostDetails from "./pages/Posts/PostDetails";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Suspense } from "react";
import Loading from "src/components/Loading.jsx";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/createpost"
              element={
                <RequireAuth>
                  <CreatePost />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route
              path="/postDetails/:id"
              element={
                <RequireAuth>
                  <PostDetails />
                </RequireAuth>
              }
            />

            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
};

export default App;
