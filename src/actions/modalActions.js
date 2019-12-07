import { HIDE_MODAL, SHOW_MODAL } from "./actionTypes";

export const hideModal = () => ({
  type: HIDE_MODAL
});

/**
 * Show modal
 * @payload color: String - default primary
 * @payload text: String - required
 */
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
