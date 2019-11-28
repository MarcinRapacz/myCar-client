import React, { useState, useCallback } from "react";
import axios from "axios";
import "./InsuranceCreate.scss";

// Components
import InsuranceForm from "../../components/InsuranceForm/InsuranceForm";

// Utils
import { handleError } from "../../utils/error";

const initialValues = {
  to: "",
  company: "",
  discount: "",
  installment: false
};

const InsuranceCreate = props => {
  const [loading, setLoading] = useState(false);
  const carId = props.match.params.id;

  const handleCancel = useCallback(
    () => props.history.push(`/car/${carId}`),
    // eslint-disable-next-line
    []
  );

  const handleSubmit = useCallback(async values => {
    setLoading(true);
    try {
      await axios.post(`/api/v1/car/${carId}/insurance`, values);

      props.history.push(`/car/${carId}`);
    } catch (error) {
      handleError(error);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="InsuranceCreate container">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <h3>Dodaj ubezpieczenie</h3>
          <InsuranceForm
            initialValues={initialValues}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
};

export default InsuranceCreate;
