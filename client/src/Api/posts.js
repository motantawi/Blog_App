import base_url from "./constant";
import privateInstance from "src/utils/lib/axios";

const POST_PATH = "/posts";

const requestPosts = async () => {
  const request = await privateInstance.get(`${base_url}${POST_PATH}`);
  return request.data;
};

const requestCreatePost = async ({ postData, id }) => {
  const request = await privateInstance.post(
    `${base_url}/${id}${POST_PATH}`,
    postData
  );
  return request;
};

export { requestPosts, requestCreatePost };
