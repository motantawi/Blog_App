import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "src/utils/Schema";
import { useMutation } from "react-query";
import { requestLogin } from "src/Api/auth";
export default function SignIn() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials) => requestLogin(credentials),
    onSuccess: ({ data }) => {
      toast.success("تم تسجيل الدخول بنجاح");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      setError({ email: " ", password: " " });
    },
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            SignIn
          </Typography>
          <form
            onSubmit={handleSubmit((values) => {
              return mutate(values);
            })}
          >
            <input
              type="text"
              placeholder="email"
              {...register("email")}
              style={{
                margin: "30px 0 0 0",
                padding: "20px",
                color: "#000",
              }}
              onChange={() => setError("email", " ")}
            />
            <p style={{ color: "red" }}>{errors.email?.message}</p>
            <input
              type="password"
              placeholder="password"
              {...register("password")}
              style={{ padding: "20px", color: "#000", marginTop: "20px" }}
              onChange={() => setError("password", " ")}
            />
            <p style={{ color: "red" }}>{errors.password?.message}</p>
            <Button
              type="submit"
              style={{
                color: "#fff",
                backgroundColor: "#0d47a1",
                padding: "10px",
                margin: "30px 0 0 0",
              }}
            >
              Sign In
            </Button>
            <Button
              style={{
                marginLeft: "auto",
                background: "none",
                textDecoration: "underLine",
                width: "fit-content",
                fontSize: "14px",
                textTransform: "lowercase",
                fontWeight: "100",
                color: "#000",
              }}
              className="showBtn"
              onClick={() => navigate("/register")}
            >
              Don't have an account? Sign Up
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
