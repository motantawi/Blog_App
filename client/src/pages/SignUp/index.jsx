import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { requestCreateUser } from "src/Api/auth";
import { createAccountSchema } from "src/utils/Schema";
import useUser from "src/hooks/useUser";

export default function SignUp() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [photo, setPhoto] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createAccountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { mutate: createUser } = useMutation({
    mutationKey: ["createAccount"],
    mutationFn: (credentials) => requestCreateUser(credentials),
    onSuccess: () => {
      toast.success("تم  انشاء حساب بنجاح");
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
      setError({ firstName: " ", lastName: " ", email: " ", password: " " });
    },
  });

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCreateUser = ({ firstName, lastName, email, password }) => {
    const userData = new FormData();
    userData.append("firstName", firstName);
    userData.append("lastName", lastName);
    userData.append("email", email);
    userData.append("password", password);
    userData.append("photo", photo);
    createUser(userData);
  };

  useEffect(() => {
    if (user !== null) {
      return navigate("/");
    }
  }, [navigate, user]);

  return (
    <Container component="main" maxWidth="xs">
      <Typography
        component="h1"
        variant="h4"
        position={"relative"}
        top={60}
        textAlign={"center"}
      >
        Welcome To MYBLOG
      </Typography>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 3,
          py: 5,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SignUp
        </Typography>
        <form
          onSubmit={handleSubmit((values) => handleCreateUser(values))}
          encType="multipart/form-data"
          method="POST"
        >
          <input
            type="text"
            placeholder="firstName"
            name="firstName"
            {...register("firstName")}
          />
          <p style={{ color: "red" }}>{errors?.firstName?.message}</p>
          <input
            type="text"
            placeholder="lastName"
            name="lastName"
            {...register("lastName")}
          />
          <p style={{ color: "red" }}>{errors?.lastName?.message}</p>

          <input
            type="email"
            placeholder="email"
            name="email"
            {...register("email")}
          />
          <p style={{ color: "red" }}>{errors?.email?.message}</p>

          <input
            type="password"
            placeholder="password"
            name="password"
            {...register("password")}
          />
          <p style={{ color: "red" }}>{errors?.password?.message}</p>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            id="photo"
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
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
}
