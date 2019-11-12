import jwt from "jsonwebtoken";

export const setToken = token => {
  localStorage.setItem("token", token);
};

export const removeToken = () => localStorage.removeItem("token");

export const getToken = () => localStorage.getItem("token");

export const decodeToken = token => {
  const decoded = jwt.decode(token);
  return decoded;
};
