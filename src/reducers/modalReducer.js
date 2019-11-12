import { SHOW_MODAL, HIDE_MODAL } from "../actions/actionTypes";

const initialState = {
  show: false,
  color: "primary",
  text: "",
  timeoutID: null,
  backdrop: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_MODAL:
      return { ...state, ...payload, show: true, backdrop: true };

    case HIDE_MODAL:
      return { ...state, show: false, backdrop: false };

    default:
      return state;
  }
};
