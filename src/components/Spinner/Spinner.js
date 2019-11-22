import React from "react";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="Spinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
