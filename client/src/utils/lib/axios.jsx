import axios from "axios";
import base_url from "src/Api/constant";

const getUser = () => {
  const localStorageUser = localStorage.getItem("user-storage");
  return JSON.parse(localStorageUser)["state"]["user"];
};


const privateInstance = axios.create({
  baseURL: `${base_url}`,
});

privateInstance.interceptors.request.use(
  (config) => {
    const user = getUser();
    if (user) {
      config.headers["accessToken"] = user.accessToken;
    } else {
      console.error("Access token not found in localStorage");
      window.location.replace("/login");
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
