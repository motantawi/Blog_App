import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Container,
  Grid,
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import base_url from "src/Api/constant";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [addedComment, setAddedComment] = useState("");
  useEffect(() => {
    axios
      .get(`${base_url}/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => setPost(res.data));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${base_url}/posts/${id}/comments`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setComments(res.data);
      }, []);
  }, [addedComment, id]);

  const handleSubmit = () => {
    if (addedComment !== "") {
      axios
        .post(
          `${base_url}/posts/${id}/comments`,
          {
            commentBody: addedComment,
            postId: id,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then(() => {
          setAddedComment("");
        })
        .catch((err) => console.log(err));
    } else {
      return null;
    }
  };

  return (
    <Container sx={{ py: { xs: 8, lg: 5 } }}>
      <Grid container spacing={8}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Box
            sx={{
              p: 6,
              border: 1,
              borderColor: "grey.200",
              borderRadius: 1,
              boxShadow: 1,
            }}
            bgcolor={blue[900]}
          >
            <Typography
              variant="h4"
              component="h2"
              color="#fff"
              mb={2}
              sx={{ fontWeight: "bold" }}
            >
              {post.title}
            </Typography>
            <Typography variant="body2" color={grey[300]} mb={5}>
              {post.postText}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={`${base_url}/${post.userPhoto}`}
                  sx={{ width: 28, height: 28, mr: 1 }}
                />
                <Typography color="#fff" variant="subtitle1">
                  {post.author}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Box
            sx={{
              p: 3,
              border: 1,
              borderColor: "grey.200",
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Add Comment"
              variant="outlined"
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              value={addedComment}
              onChange={(e) => setAddedComment(e.target.value)}
            />
            <Button
              variant="contained"
              style={{
                width: "100%",
                backgroundColor: "#0d47a1",
                color: "#fff",
              }}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Box>
          <Box
            sx={{
              p: 3,
              border: 1,
              borderColor: "grey.200",
              borderRadius: 1,
              boxShadow: 1,
              maxHeight: "300px",
              overflow: "scroll",
            }}
          >
            {comments.map((comment) => {
              return (
                <Typography
                  variant="body2"
                  color="white"
                  key={comment._id}
                  sx={{ display: "flex", alignItems: "center" }}
                  mb={3}
                  border={1}
                  p={2}
                  bgcolor={blue[900]}
                  borderRadius="10px"
                  style={{ position: "relative" }}
                >
                  <Avatar
                    src={`http://localhost:3001/${comment.userPhoto}`}
                    sx={{ width: 28, height: 28, mr: 1 }}
                  />
                  <Typography
                    variant="subtitle1"
                    color={grey[400]}
                    fontSize="12px"
                    style={{ position: "relative", bottom: "10px" }}
                  >
                    {comment.username}
                  </Typography>
                  <div
                    style={{
                      position: "absolute",
                      left: "53px",
                      bottom: "10px",
                    }}
                  >
                    {comment.commentBody}
                  </div>
                </Typography>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostDetails;
