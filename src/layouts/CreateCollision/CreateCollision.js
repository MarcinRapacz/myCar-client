import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Form
import CollisionForm from "../../components/CollisionForm/CollisionForm";

// Utils
import { handleError } from "../../utils/error";

const CreateCollision = props => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    description: "",
    dateOfNotification: new Date().toISOString().slice(0, 10)
  };

  const handleSubmit = async values => {
    setLoading(true);
    try {
      await axios.post(
        `/api/v1/car/${props.match.params.id}/collision`,
        values
      );
      props.history.push(`/car/${props.match.params.id}`);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const handleCancel = () => {
    props.history.push(`/car/${props.match.params.id}`);
  };

  return (
    <section className="CreateCollision conttainer">
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

CreateCollision.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default CreateCollision;
