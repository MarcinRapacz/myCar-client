import { SHOW_MODAL, HIDE_MODAL } from "../actions/actionTypes";

const initialState = {
  show: false,
  color: "primary",
  text: "",
  timeoutID: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_MODAL:
      return { ...state, ...payload, show: true };

    case HIDE_MODAL:
      return { ...state, show: false };

    default:
      return state;
  }
};
