import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { handleError } from "../../utils/error";
import "./EditCar.scss";
import { showModal } from "../../actions/modalActions";

// Components
import CarForm from "../../components/CarForm/CarForm";

const EditCar = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let car = {};

  if (props.location.state) {
    car = props.location.state.car;
  } else {
    props.history.push(`/car/${props.match.params.id}`);
    dispatch(showModal({ text: "Brak autoryzacji", color: "danger" }));
  }

  if (car._id) {
    car.dateOfFirstRegistration = car.dateOfFirstRegistration.slice(0, 10);
    car.nextTechnicalInspection = car.nextTechnicalInspection.slice(0, 10);
  }

  const initialValues = useMemo(() => car, [car]);

  const handleSubmit = useCallback(
    async values => {
      try {
        setLoading(true);
        await axios.put(`/api/v1/car/${car._id}`, values);
        dispatch(
          showModal({ text: "Pojazd został zaktualizowany", color: "success" })
        );
        props.history.push(`/car/${car._id}`);
      } catch (error) {
        handleError(error);
      }
    },
    // eslint-disable-next-line
    [car]
  );

  return (
    <div className="EditCar container">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <h3>Edytuj pojazd</h3>
          <CarForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCar;
