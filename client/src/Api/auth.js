import axios from "axios";
import base_url from "./constant";

const AUTH_PATH = "/auth";

const requestLogin = async ({ email, password }) => {
  const request = await axios.post(`${base_url}${AUTH_PATH}/login`, {
    email,
    password,
  });
  return request;
};

const requestCreateUser = async (userData) => {
  const request = await axios.post(
    `${base_url}${AUTH_PATH}/register`,
    userData
  );

  return request;
};

export { requestLogin, requestCreateUser };
