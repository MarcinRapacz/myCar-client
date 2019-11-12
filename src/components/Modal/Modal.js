import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Modal.scss";

// Actions
import { hideModal } from "../../actions/modalActions";

const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);

  const handleClick = () => {
    clearTimeout(modal.timeoutID);
    dispatch(hideModal());
  };

  return (
    <section className="Modal text-center">
      <div
        className={`Modal__backdrop ${modal.backdrop &&
          "Modal__backdrop--show"}`}
        onClick={handleClick}
      ></div>
      <div
        className={`Modal__container ${modal.show && "Modal--show"}`}
        onClick={handleClick}
      >
        <div
          className={`card border-${modal.color}`}
          style={{ maxWidth: "24rem" }}
        >
          <div className={`card-body text-${modal.color}`}>
            <h6 className="card-title m-0">{modal.text}</h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
