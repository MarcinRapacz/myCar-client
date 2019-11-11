import * as at from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case at.SET_USER:
      return { ...state, ...payload };

    default:
      return state;
  }
};
