import base_url from "./constant";
import privateInstance from "src/utils/lib/axios";

const POST_PATH = "/posts";

const requestPosts = async () => {
  const request = await privateInstance.get(`${base_url}${POST_PATH}`);
  return request.data;
};

const requestPostDetails = async ({ id }) => {
  const request = await privateInstance.get(`${base_url}${POST_PATH}/${id}`);
  return request.data;
};

const requestPostComments = async ({ id }) => {
  const request = await privateInstance.get(
    `${base_url}${POST_PATH}/${id}/comments`
  );
  return request.data;
};

const requestCreateComment = async ({ addedComment, id }) => {
  const request = await privateInstance.post(
    `${base_url}${POST_PATH}/${id}/comments`,
    {
      commentBody: addedComment,
      postId: id,
    }
  );
  return request.data;
};

const requestCreatePost = async ({ postData, id }) => {
  const request = await privateInstance.post(
    `${base_url}/${id}${POST_PATH}`,
    postData
  );
  return request;
};

export {
  requestPosts,
  requestCreatePost,
  requestPostDetails,
  requestPostComments,
  requestCreateComment,
};
