import axios from "axios";
import base_url from "src/Api/constant";

const getUser = () => {
  const localStorageUser = localStorage.getItem("user");
  return JSON.parse(localStorageUser);
};

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

const privateInstance = axios.create({
  baseURL: `${base_url}`,
});

privateInstance.interceptors.request.use(
  (config) => {
    const user = getUser();
    const accessToken = getAccessToken();

    if (user || accessToken) {
      config.headers["accessToken"] = accessToken;
    } else {
      // If access token is not in localStorage, you can handle it here.
      // For example, you can redirect the user to a login page or perform another action.
      console.error("Access token not found in localStorage");
      // You may also choose to reject the request with an error.
      return Promise.reject("Access token not found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default privateInstance;
