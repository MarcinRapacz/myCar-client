import { combineReducers } from "redux";
import authenticationReducer from "./authenticationReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  auth: authenticationReducer,
  modal: modalReducer
});
