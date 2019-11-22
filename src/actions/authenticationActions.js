import axios from "axios";
import { SET_USER, REMOVE_USER } from "./actionTypes";

// Utils
import { setToken, decodeToken, removeToken } from "../utils/jwt";
import { handleError } from "../utils/error";

// Actions
import { showModal } from "./modalActions";

export const setUser = payload => ({
  type: SET_USER,
  payload
});

export const removeUser = () => ({
  type: REMOVE_USER
});

export const setAuthHeader = (token = null) =>
  (axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "");

export const logoutUser = () => dispatch => {
  removeToken();
  setAuthHeader();

  dispatch(
    showModal({
      text: "Wylogowano z aplikacji",
      color: "success"
    })
  );

  dispatch(removeUser());
};

export const loginUser = payload => async dispatch => {
  try {
    const res = await axios.post("/api/v1/authentication/login/", payload);
    const { token } = res.data.content;
    const decoded = decodeToken(token);

    setToken(token);
    setAuthHeader(token);

    dispatch(setUser(decoded));
    dispatch(
      showModal({
        text: "Zalogowano do aplikacji",
        color: "success"
      })
    );
    return true;
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = payload => async dispatch => {
  try {
    const res = await axios.post("/api/v1/authentication/create/", payload);
    const { token } = res.data.content;
    const decoded = decodeToken(token);

    setToken(token);
    setAuthHeader(token);

    dispatch(setUser(decoded));
    dispatch(
      showModal({
        text: "Nowe konto zostało utworzone",
        color: "success"
      })
    );
    return true;
  } catch (error) {
    handleError(error);
  }
};
