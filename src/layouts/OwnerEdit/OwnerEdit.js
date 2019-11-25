import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

// Actions
import { showModal } from "../../actions/modalActions";

// Components
import OwnerForm from "../../components/OwnerForm/OwnerForm";

// Utils
import { handleError } from "../../utils/error";

const OwnerEdit = props => {
  const dispatch = useDispatch();
  let owner = {};
  if (props.location.state) {
  }

  if (props.location.state) {
    owner = props.location.state.owner;
  } else {
    props.history.push(`/`);
    dispatch(showModal({ text: "Brak autoryzacji", color: "danger" }));
  }

  if (owner._id) {
    owner.dateOfBirth = owner.dateOfBirth.slice(0, 10);
    owner.drivingLicensePickupDate = owner.drivingLicensePickupDate.slice(
      0,
      10
    );
  }

  const initialValues = useMemo(() => owner, [owner]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    try {
      setLoading(true);
      await axios.put(`/api/v1/owner/${owner._id}`, values);
      props.history.push(`/car/${owner.car}`);
      dispatch(
        showModal({
          text: "Dane właściciela zostały zaaktualizowane",
          color: "success"
        })
      );
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <section className="OwnerEdit container">
      <div className="row">
        <div className="col-6 offset-3">
          <h3>Zaaktualizuj dane właściciela</h3>
          <OwnerForm
            loading={loading}
            initialValues={initialValues}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default OwnerEdit;
