import API from "./api";

export const getUsers = () => {
  return API.get("/users");
};

export const getUserDetails = (id) => {
  return API.get(`/users/${id}`);
};

export const searchUsers = (query) => {
  return API.get(
    `/users/search?q=${query}`
  );
};