import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { requestCreatePost } from "src/Api/posts";
import { createPostSchema } from "src/utils/Schema";
import useUser from "src/hooks/useUser";

function CreatePost() {
  const { user } = useUser();
  const { _id } = user;
  const navigate = useNavigate();
  const [postImg, setPostImg] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      postText: "",
    },
  });

  const { mutate: createPost } = useMutation({
    mutationKey: ["createPost"],
    onSuccess: ({ data }) => {
      toast.success(data);
      reset();
      setPostImg(null);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      setError({ postText: " " });
    },
    mutationFn: (newPost) => requestCreatePost(newPost),
  });

  const handlePhoto = (e) => {
    setPostImg(e.target.files[0]);
  };

  const handleCreatePost = (values) => {
    const postData = new FormData();
    postData.append("postText", values.postText);
    postData.append("postImg", postImg);
    createPost({ postData, id: _id });
  };

  return (
    <Container sx={{ py: { xs: 8, lg: 5 } }}>
      <Grid container spacing={8}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <form
            onSubmit={handleSubmit((values) => handleCreatePost(values))}
            encType="multipart/form-data"
            method="POST"
          >
            <StyledTextarea
              aria-label="minimum height"
              minRows={5}
              {...register("postText")}
              style={{ width: "100%" }}
              placeholder="Write Something..."
            />
            <p style={{ color: "red" }}>{errors.postText?.message}</p>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="postImg"
              required
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
