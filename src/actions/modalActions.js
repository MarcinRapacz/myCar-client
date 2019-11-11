import { HIDE_MODAL, SHOW_MODAL } from "./actionTypes";

export const hideModal = () => ({
  type: HIDE_MODAL
});

export const showModal = payload => dispatch => {
  const timeoutID = setTimeout(() => {
    dispatch(hideModal());
  }, 5000);

  payload.timeoutID = timeoutID;

  dispatch({
    type: SHOW_MODAL,
    payload
  });
};
