import store from "../store";
import { showModal } from "../actions/modalActions";
import { setAuthHeader, removeUser } from "../actions/authenticationActions";
import { expiredToken } from "./jwt";

export const handleError = error => {
  let text = "";
  if (error && error.response && error.response.data) {
    const { msg } = error.response.data;
    switch (msg) {
      case "Validation Field":
        text = "Podane dane nie przeszły pomyślnie walidacji danych";
        break;
      case "Invalid credentials":
        text = "Podano niewłaściwe dane logowania";
        break;
      case "User already exists":
        text = "Użytkownik o podanym adresie emial już istnieje";
        break;
      case "jwt expired":
        text = "Twój token wygasł, zaloguj się ponownie";
        expiredToken();
        setAuthHeader();
        store.dispatch(removeUser());
        break;

      default:
        text = "Nieoczekiwany błąd serwera, spróbuj ponownie";
        break;
    }
  } else {
    text = "Nieoczekiwany błąd aplikacji, spróbuj ponownie";
  }

  store.dispatch(
    showModal({
      text,
      color: "danger"
    })
  );
};
