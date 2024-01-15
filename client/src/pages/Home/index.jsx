import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { toast } from "react-toastify";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const { _id } = user;

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={5} my={2}>
      {posts.map((data) => (
        <Grid item justifyContent={"center"} xs={12} key={data._id}>
          <Grid container justifyContent="center">
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    src={`http://localhost:3001/${data.userPhoto}`}
                  />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={`${data.author}`}
              />
              <Link to={`/postDetails/${data._id}`}>
                <CardMedia
                  component="img"
                  height="194"
                  image={`http://localhost:3001/${data.postImg}`}
                  alt="Paella dish"
                />
              </Link>
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
                  <IconButton aria-label="delete">
                    <DeleteForeverIcon id={data._id} />
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
