import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/authContext";
import base_url from "src/Api/constant";

function CreatePost() {
  const { user } = useAuth();
  const { _id } = user;
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    postText: "",
    postImg: "",
  });

  const handleUpload = (e) => {
    e.preventDefault();
    if (newPost.postText !== "") {
      const formData = new FormData();
      formData.append("postText", newPost.postText);
      formData.append("postImg", newPost.postImg);

      axios
        .post(`${base_url}/${_id}/posts/create`, formData, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then(() => {
          setNewPost({
            postText: "",
            postImg: "",
          });
          navigate("/", { replace: true });
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    } else {
      toast.error("All fields are required");
    }
  };
  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };
  const handlePhoto = (e) => {
    setNewPost({ ...newPost, postImg: e.target.files[0] });
  };

  return (
    <Container sx={{ py: { xs: 8, lg: 5 } }}>
      <Grid container spacing={8}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <form
            onSubmit={handleUpload}
            encType="multipart/form-data"
            method="POST"
          >
            <StyledTextarea
              aria-label="minimum height"
              minRows={5}
              name="postText"
              value={newPost.postText}
              onChange={handleChange}
              style={{ width: "100%" }}
              placeholder="Write Something..."
            />

            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="postImg"
              onChange={handlePhoto}
            />
            <Button
              type="submit"
              style={{
                color: "#fff",
                backgroundColor: "#0d47a1",
                marginTop: "10px",
              }}
            >
              Add Post
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreatePost;

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#00d72E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[500] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
