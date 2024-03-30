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
import { useMutation, useQuery } from "react-query";
import {
  requestCreateComment,
  requestPostComments,
  requestPostDetails,
} from "src/Api/posts";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const PostDetails = () => {
  const { id } = useParams();
  const [addedComment, setAddedComment] = useState("");
  const { data: post, refetch: refetchPost } = useQuery({
    queryKey: ["getPostDetails"],
    suspense: true,
    queryFn: () => requestPostDetails({ id }),
  });

  const { data: comments, refetch } = useQuery({
    queryKey: ["getPostComments"],
    suspense: true,
    queryFn: () => requestPostComments({ id }),
  });
  const { mutate: createComment } = useMutation({
    mutationKey: ["createPostComment"],
    suspense: true,
    mutationFn: () => requestCreateComment({ id, addedComment }),
    onSuccess: () => {
      refetch();
      setAddedComment("");
    },
  });

  const handleCreateComment = () => {
    if (addedComment === "") {
      toast.error("Must provide a comment");
      return null;
    } else {
      createComment();
    }
  };
  useEffect(() => {
    refetch();
    refetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ py: { xs: 8, lg: 5 } }}>
      <Grid container spacing={8}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Box
            sx={{
              p: 3,
              border: 1,
              borderColor: "grey.200",
              borderRadius: 1,
              boxShadow: 1,
              overflow: "hidden !important",
            }}
            bgcolor={blue[900]}
          >
            <img
              src={`${base_url}/${post.postImg}`}
              width={"80%"}
              style={{ margin: "0px 45px 20px 45px" }}
              alt=""
            />

            <Typography
              variant="h4"
              component="h2"
              color="#fff"
              mb={2}
              sx={{ fontWeight: "bold" }}
            >
              {post.title}
            </Typography>
            <Typography variant="body1" color={grey[100]} mb={5}>
              {post.postText}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  style={{ position: "relative" }}
                  src={`${base_url}/${post.userPhoto}`}
                  sx={{ width: 50, height: 50, mr: 1 }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography color="#fff" variant="subtitle1">
                    {post.author}
                  </Typography>
                  <Typography color="#fff" variant="caption">
                    {dayjs(post.createdAt).format("D/MMMM/YYYY - h:mm a")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Box
            sx={{
              p: 3,
              boxShadow: 1,
            }}
            bgcolor={"#fff"}
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
              onClick={handleCreateComment}
            >
              Add
            </Button>
          </Box>
          <Box
            sx={{
              p: 3,
              boxShadow: 1,
              maxHeight: "300px",
              overflow: "scroll",
            }}
            bgcolor={"#fff"}
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
