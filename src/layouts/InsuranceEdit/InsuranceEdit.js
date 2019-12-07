import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./InsuranceEdit.scss";

// Utils
import { handleError } from "../../utils/error";

// Components
import InsuranceForm from "../../components/InsuranceForm/InsuranceForm";

// Actions
import { showModal } from "../../actions/modalActions";

const InsuranceEdit = props => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  let insurance = {};

  if (props.location.state) {
    insurance = props.location.state.insurance;
  } else {
    props.history.push(`/`);
    dispatch(showModal({ text: "Brak autoryzacji", color: "danger" }));
  }

  if (insurance._id) {
    insurance.to = insurance.to.slice(0, 10);
  }

  const initialValues = useMemo(() => insurance, [insurance]);

  const handleCancel = () => props.history.push(`/car/${insurance.car}`);

  const handleSubmit = async values => {
    try {
      setLoading(true);
      await axios.put(`/api/v1/insurance/${insurance._id}`, values);
      props.history.push(`/car/${insurance.car}`);
      dispatch(
        showModal({
          text: "Ubezpieczenie zostało zaaktualizowane",
          color: "success"
        })
      );
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <section className="InsuranceEdit container">
      <div className="row">
        <div className="col-12 col-lg-6 offset-lg-3">
          <InsuranceForm
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            loading={loading}
            initialValues={initialValues}
          />
        </div>
      </div>
    </section>
  );
};

export default InsuranceEdit;
