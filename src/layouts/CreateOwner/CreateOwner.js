import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./CreateOwner.scss";

// Actions
import { showModal } from "../../actions/modalActions";

// Components
import OwnerForm from "../../components/OwnerForm/OwnerForm";

// Utils
import { handleError } from "../../utils/error";

const CreateOwner = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    sex: "",
    dateOfBirth: "",
    drivingLicensePickupDate: "",
    postCode: "",
    maritalStatus: "",
    numberOfChildrenUnder18Years: ""
  };

  const handleSubmit = useCallback(async values => {
    try {
      setLoading(true);
      await axios.post(`/api/v1/car/${props.match.params.id}/owner`, values);
      dispatch(
        showModal({ text: "Właściciel został dodany", color: "success" })
      );
      props.history.push(`/car/${props.match.params.id}`);
    } catch (error) {
      handleError(error);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="CreateOwner container">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <h3>Dodaj właściciela pojazdu</h3>
          <OwnerForm
            initialValues={initialValues}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateOwner;
