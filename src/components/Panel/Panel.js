import React from "react";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaCarCrash,
  FaUsers,
  FaEdit,
  FaTimes
} from "react-icons/fa";
import "./Panel.scss";

const Panel = ({ car, remove, insurance }) => {
  return (
    <section className="Panel">
      <Link to={`/car/${car.id}/owner`}>
        <FaUsers className="Panel__icon" />
      </Link>
      {!insurance && (
        <Link to={{ pathname: `/car/${car.id}/insurance` }}>
          <FaCalendarAlt className="Panel__icon" />
        </Link>
      )}
      <FaFileAlt className="Panel__icon" />
      <FaCarCrash className="Panel__icon" />
      <Link to={{ pathname: `/car/${car.id}/edit`, state: { car } }}>
        <FaEdit className="Panel__icon Panel__icon--edit" />
      </Link>
      <FaTimes className="Panel__icon Panel__icon--danger" onClick={remove} />
    </section>
  );
};

export default React.memo(Panel);
