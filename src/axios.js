import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/"
    : "https://backtick-my-car.herokuapp.com";
