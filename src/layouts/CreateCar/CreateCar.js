import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Formik, Form } from "formik";
import { handleError } from "../../utils/error";
import "./CreateCar.scss";
import { showModal } from "../../actions/modalActions";

// Components
import SelectInput from "../../components/SelectInput/SelectInput";
import TextInput from "../../components/TextInput/TextInput";
import Spinner from "../../components/Spinner/Spinner";

// Create Car Helpers
import {
  availableTypeOfVehicle,
  avaliableDestiny,
  avaliableOrigin,
  validate
} from "./CreateCarHelpers";

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
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {props => (
              <Form>
                <div className="form-row">
                  <TextInput {...props} name="mark" label="Marka" />
                  <TextInput {...props} name="commercialModel" label="Model" />
                  <SelectInput
                    {...props}
                    label="Rodzaj pojazdu"
                    options={availableTypeOfVehicle}
                    name="typeOfVehicle"
                    defaultVal="Wybierz rodzaj pojazdu"
                  />
                  <TextInput
                    {...props}
                    name="capacity"
                    label="Pojemność"
                    type="number"
                  />
                  <TextInput
                    {...props}
                    name="power"
                    label="Moc silnika"
                    type="number"
                  />
                  <TextInput {...props} name="fuel" label="Rodzaj paliwa" />
                  <TextInput
                    {...props}
                    name="dateOfFirstRegistration"
                    label="Data pierwszej rejestracji"
                    type="date"
                  />
                  <TextInput
                    {...props}
                    name="yearOfProduction"
                    label="Rok produkcji"
                    type="number"
                  />
                  <TextInput
                    {...props}
                    name="differentiator"
                    label="Wyróżnik powiatu"
                  />
                  <SelectInput
                    {...props}
                    label="Pochodzenie pojazdu"
                    options={avaliableOrigin}
                    name="origin"
                    defaultVal="Wybierz pochodzenie pojazdu"
                  />
                  <SelectInput
                    {...props}
                    label="Przeznaczenie pojazdu"
                    options={avaliableDestiny}
                    name="destiny"
                    defaultVal="Wybierz przeznaczenie"
                  />
                  <TextInput
                    {...props}
                    name="nextTechnicalInspection"
                    label="Termin kolejnego badania technicznego"
                    type="date"
                  />
                </div>
                {loading ? (
                  <Spinner />
                ) : (
                  <button
                    className="btn btn-block btn-outline-primary"
                    type="submit"
                  >
                    Dodaj pojazd
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateCar;
