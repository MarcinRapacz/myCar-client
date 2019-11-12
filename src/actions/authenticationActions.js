import axios from "axios";
import { SET_USER, REMOVE_USER } from "./actionTypes";

// Utils
import { setToken, decodeToken, removeToken } from "../utils/jwt";

// Actions
import { showModal } from "./modalActions";

export const setUser = payload => ({
  type: SET_USER,
  payload
});

export const removeUser = () => ({
  type: REMOVE_USER
});

export const logoutUser = () => dispatch => {
  removeToken();

  dispatch(
    showModal({
      text: "Wylogowano z aplikcaji",
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

    dispatch(setUser(decoded));
    dispatch(
      showModal({
        text: "Zalogowano do aplikacji",
        color: "success"
      })
    );
  } catch (error) {
    const { msg } = error.response.data;
    let text = "";
    switch (msg) {
      case "Validation Field":
        text = "Podane dane nie przeszły pomyślnie walidacji danych";
        break;
      case "Invalid credentials":
        text = "Podano niewłaściwe dane logowania";
        break;
      default:
        text = "Nieoczekiwany błąd, spróbuj ponownie";
        break;
    }
    dispatch(
      showModal({
        text,
        color: "danger"
      })
    );
  }
};

export const registerUser = payload => async dispatch => {
  try {
    const res = await axios.post("/api/v1/authentication/create/", payload);
    const { token } = res.data.content;
    const decoded = decodeToken(token);

    setToken(token);

    dispatch(setUser(decoded));
    dispatch(
      showModal({
        text: "Nowe konto zostało utworzone",
        color: "success"
      })
    );
  } catch (error) {
    const { msg } = error.response.data;
    let text = "";
    switch (msg) {
      case "Validation Field":
        text = "Podane dane nie przeszły pomyślnie walidacji danych";
        break;
      case "User already exists":
        text = "Użytkownik o podanym adresie emial już istnieje";
        break;
      default:
        text = "Nieoczekiwany błąd, spróbuj ponownie";
        break;
    }
    dispatch(
      showModal({
        text,
        color: "danger"
      })
    );
  }
};
