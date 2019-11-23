import React from "react";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaCarCrash,
  FaUsers,
  FaTimes
} from "react-icons/fa";
import "./Panel.scss";

const Panel = ({ remove }) => {
  return (
    <section className="Panel">
      <FaUsers className="Panel__icon" />
      <FaCalendarAlt className="Panel__icon" />
      <FaFileAlt className="Panel__icon" />
      <FaCarCrash className="Panel__icon" />
      <FaTimes className="Panel__icon Panel__icon--danger" onClick={remove} />
    </section>
  );
};

export default Panel;
