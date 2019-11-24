import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { handleError } from "../../utils/error";
import "./CreateCar.scss";
import { showModal } from "../../actions/modalActions";

// Components
import CarForm from "../../components/CarForm/CarForm";

const CreateCar = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = useMemo(
    () => ({
      mark: "",
      commercialModel: "",
      typeOfVehicle: "",
      capacity: "",
      power: "",
      fuel: "",
      dateOfFirstRegistration: "",
      yearOfProduction: "",
      differentiator: "",
      origin: "",
      destiny: "",
      nextTechnicalInspection: ""
    }),
    []
  );

  const handleSubmit = useCallback(async values => {
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/car", values);
      dispatch(showModal({ text: "Pojazd został dodany", color: "success" }));
      props.history.push(`/car/${res.data.content.car._id}`);
    } catch (error) {
      handleError(error);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="CreateCar container">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <h3>Dodaj nowy pojazd</h3>
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

export default CreateCar;
