import React from "react";
import { FaFileAlt, FaCalendarAlt, FaCarCrash, FaUsers } from "react-icons/fa";
import "./Panel.scss";

const Panel = () => {
  return (
    <section className="Panel">
      <FaUsers className="Panel__icon" />
      <FaCalendarAlt className="Panel__icon" />
      <FaFileAlt className="Panel__icon" />
      <FaCarCrash className="Panel__icon" />
    </section>
  );
};

export default Panel;
