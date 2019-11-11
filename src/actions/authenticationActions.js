import axios from "axios";
import jwt from "jsonwebtoken";
import { SET_USER } from "./actionTypes";

// Actions
import { showModal } from "./modalActions";

export const setUser = payload => ({
  type: SET_USER,
  payload
});

export const loginUser = payload => async dispatch => {
  try {
    const res = await axios.post("/api/v1/authentication/login/", payload);
    const decoded = jwt.decode(res.data.content.token);
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
    const decoded = jwt.decode(res.data.content.token);
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
