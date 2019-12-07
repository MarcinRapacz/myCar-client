import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import "./CollisionEdit.scss";

// Actions
import { showModal } from "../../actions/modalActions";

// Utils
import { handleError } from "../../utils/error";

// Components
import CollisionForm from "../../components/CollisionForm/CollisionForm";

const CollisionEdit = props => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  let collision = {};

  if (props.location.state) {
    collision = props.location.state.collision;
  } else {
    props.history.push(`/`);
    dispatch(showModal({ text: "Brak autoryzacji", color: "danger" }));
  }

  if (collision._id) {
    collision.dateOfNotification = collision.dateOfNotification.slice(0, 10);
  }

  const initialValues = useMemo(() => collision, [collision]);

  const handleCancel = () => props.history.push(`/car/${collision.car}`);

  const handleSubmit = async values => {
    try {
      setLoading(true);
      await axios.put(`/api/v1/collision/${collision._id}`, values);
      props.history.push(`/car/${collision.car}`);
      dispatch(
        showModal({
          text: "Kolizja została zaaktualizowana",
          color: "success"
        })
      );
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <section className="CollisionEdit conttainer">
      <div className="row">
        <div className="col-12 col-lg-6 offset-lg-3">
          <h3>Dodaj kolizję</h3>
          <CollisionForm
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            loading={loading}
            initialValues={initialValues}
          />
        </div>
      </div>
    </section>
  );
};

CollisionEdit.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default CollisionEdit;
