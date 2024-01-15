import { object, string } from "yup";

export const loginSchema = object({
  email: string()
    .required("This field is required")
    .email("Valid email is required"),
  password: string().required("This field is required"),
});

export const createAccountSchema = object({
  firstName: string().required("This field is required"),
  lastName: string().required("This field is required"),
  email: string()
    .required("This field is required")
    .email("Valid email is required"),
  password: string().required("This field is required"),
});

export const createPostSchema = object({
  postText: string()
    .required("This field is required")
    .min(15, "Minimum text length is 15 characters"),
});
