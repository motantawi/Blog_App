import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import RequireAuth from "./components/RequireAuth";
import { useAuth } from "./context/authContext";
import RequireLogout from "./components/RequireLogout";
import Profile from "./pages/User";
import CreatePost from "./pages/Posts/CreatePost";
import Home from "./pages/Home";
import PostDetails from "./pages/Posts/PostDetails";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  const auth = useAuth();

  return (
    <>
      <CssBaseline />
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
          <Route
            path="/register"
            element={
              <RequireLogout>
                <SignUp />
              </RequireLogout>
            }
          />
          <Route
            path="/login"
            element={
              <RequireLogout>
                <SignIn />
              </RequireLogout>
            }
          />
          <Route
            path="/postDetails/:id"
            element={
              <RequireAuth>
                <PostDetails />
              </RequireAuth>
            }
          />

          {auth.user && <Route path="*" element={<Home />} />}
        </Routes>
      </Router>
    </>
  );
};

export default App;
