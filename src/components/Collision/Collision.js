import React, { useState, useCallback } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";

// Components
import Spinner from "../../components/Spinner/Spinner";

// Utils
import { handleError } from "../../utils/error";

const Collision = ({ collision, removeCollision }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(s => s.auth);

  const remove = useCallback(async () => {
    setLoading(true);
    try {
      await removeCollision(collision._id);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  }, [removeCollision, collision._id]);

  return (
    <div className="Collision card mt-1 col-12 col-md-4 justify-content-center">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="card-body">
            <p className="card-text text-right">
              Kolizja z dnia:{" "}
              <span className="font-weight-bold">
                <Moment format="DD/MM/YYYY">
                  {collision.dateOfNotification}
                </Moment>
              </span>
            </p>
            <h5 className="card-text">{collision.name}</h5>
            <p className="card-text">{collision.description}</p>
          </div>
          {user.id === collision.user && (
            <div className="mr-0 ml-auto">
              <Link
                to={{
                  pathname: `/collision/${collision._id}/edit`,
                  state: { collision }
                }}
              >
                <FaEdit className="Panel__icon Panel__icon--edit mx-2" />
              </Link>
              <FaTimes
                className="Panel__icon Panel__icon--danger"
                onClick={remove}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

Collision.propTypes = {
  collision: PropTypes.object.isRequired,
  removeCollision: PropTypes.func.isRequired
};

export default Collision;
