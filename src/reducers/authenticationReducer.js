import { SET_USER, REMOVE_USER } from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return { ...state, ...payload };

    case REMOVE_USER:
      return {};

    default:
      return state;
  }
};
