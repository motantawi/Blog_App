import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import { requestDeletePost, requestPosts } from "src/Api/posts";
import { useMutation, useQuery } from "react-query";
import base_url from "src/Api/constant";
import useUser from "src/hooks/useUser";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useUser();
  const { _id } = user;
  const navigate = useNavigate();

  const {
    data: posts,
    isError: isPostsError,
    refetch,
  } = useQuery({
    queryKey: ["getPosts"],
    suspense: true,
    queryFn: () => requestPosts(),
  });

  const { mutate: deletePost } = useMutation({
    mutationKey: ["deletePost"],
    suspense: true,
    mutationFn: (id) => requestDeletePost(id),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDeletePost = (id) => {
    deletePost(id);
    toast.success("Post Deleted Successfully");
  };

  useEffect(() => {
    refetch();
  }, [posts, refetch]);

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={5} my={2}>
      {!isPostsError &&
        posts.map((data) => (
          <Grid item justifyContent={"center"} xs={12} key={data._id}>
            <Grid container justifyContent="center">
              <Card sx={{ width: 400 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500] }}
                      aria-label="recipe"
                      src={`${base_url}/${data.userPhoto}`}
                    />
                  }
                  title={`${data.author}`}
                  subheader={dayjs(data.createdAt).format(
                    "D/MMMM/YYYY - h:mm a"
                  )}
                />

                <CardMedia
                  component="img"
                  height="300"
                  style={{ cursor: "pointer" }}
                  image={`${base_url}/${data.postImg}`}
                  alt="Paella dish"
                  onClick={() => navigate(`/postDetails/${data._id}`)}
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {data.postText}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  {_id === data.userId ? (
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeletePost(data._id)}
                    >
                      <DeleteForeverIcon width={"100%"} height={"100%"} />
                    </IconButton>
                  ) : null}
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}
