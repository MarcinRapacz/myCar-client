import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import "./CollisionList.scss";

// Components
import Collision from "../Collision/Collision";

// Actions
import { showModal } from "../../actions/modalActions";

// Utils
import { handleError } from "../../utils/error";

const CollisionList = ({ carId }) => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  const getCollisionsList = useCallback(async () => {
    try {
      const res = await axios.get(`/api/v1/car/${carId}/collision`);
      setList(res.data.content.list);
    } catch (error) {
      handleError(error);
    }
  }, [carId]);

  const handleRemove = useCallback(
    async id => {
      try {
        await axios.delete(`/api/v1/collision/${id}`);
        dispatch(
          showModal({ color: "success", text: "Kolizja została usunięta" })
        );
        const newList = list.filter(l => l._id !== id);
        setList(newList);
      } catch (error) {
        handleError(error);
      }
    },
    [dispatch, list]
  );

  useEffect(() => {
    getCollisionsList();
  }, [getCollisionsList]);

  return (
    <section className="CollisionList mt-4">
      <h4>Zgłoszone kolizje ({list.length})</h4>
      <div className="card-group">
        {list.map(collision => (
          <Collision
            key={collision._id}
            collision={collision}
            removeCollision={handleRemove}
          />
        ))}
      </div>
    </section>
  );
};

CollisionList.propTypes = {
  carId: PropTypes.string.isRequired
};

export default CollisionList;
