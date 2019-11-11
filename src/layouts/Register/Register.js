import React from "react";
import validator from "validator";
import "./Register.scss";

import Form from "../../components/Form/Form";

// Actions
import { registerUser } from "../../actions/authenticationActions";

const Register = () => {
  const config = {
    header: "Załóż nowe konto",
    inputs: [
      {
        name: "name",
        type: "name",
        placeholder: "Podaj imię",
        value: "",
        validator: {
          check: validator.isLength,
          options: { min: 2 },
          errMsg: "Imię musi zawierać min 2 znaki"
        },
        valid: false,
        touched: false
      },
      {
        name: "email",
        type: "email",
        placeholder: "Podaj adres email",
        value: "",
        validator: {
          check: validator.isEmail,
          options: {},
          errMsg: "Podany adres email jest niepoprawny"
        },
        valid: false,
        touched: false
      },
      {
        name: "password",
        type: "password",
        placeholder: "Wpisz hasło",
        value: "",
        validator: {
          check: validator.isLength,
          options: { min: 8 },
          errMsg: "Hasło musi zawierać min 8 znaków"
        },
        valid: false,
        touched: false
      },
      {
        name: "password2",
        type: "password",
        placeholder: "Powtórz hasło",
        value: "",
        validator: {
          check: validator.isLength,
          options: { min: 8 },
          errMsg: "Hasła muszą być identyczne"
        },
        valid: false,
        touched: false
      }
    ],
    buttons: [
      {
        type: "submit",
        text: "Zarejestruj się"
      },
      {
        type: "button",
        text: "Załóż konto testowe"
      }
    ],
    checkbox: null,
    formIsValid: false,
    action: registerUser
  };

  return (
    <section className="Register">
      <div className="Register__form">
        <Form config={config} />
      </div>
    </section>
  );
};

export default Register;
