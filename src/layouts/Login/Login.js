import React from "react";
import validator from "validator";
import "./Login.scss";

// Components
import Form from "../../components/Form/Form";

// Actions
import { loginUser } from "../../actions/authenticationActions";

const Login = () => {
  const config = {
    header: "Zaloguj się do aplikacji",
    inputs: [
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
      }
    ],
    buttons: [
      {
        type: "submit",
        text: "Zaloguj się"
      }
    ],
    checkbox: null,
    formIsValid: false,
    action: loginUser
  };

  return (
    <section className="Login">
      <div className="Login__form">
        <Form config={config} />
      </div>
    </section>
  );
};

export default Login;
