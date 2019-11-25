import React from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form } from "formik";

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
} from "./CarFormHelper";

const CarForm = ({ initialValues, handleSubmit, loading, ...props }) => {
  const handleCancel = () => {
    initialValues._id = initialValues._id ? `/${initialValues._id}` : "";
    props.history.push(`/car${initialValues._id}`);
  };

  return (
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
            <div className="btn-group col-12 p-0">
              <button
                className="btn col-7 col-md-9 btn-outline-primary"
                type="submit"
              >
                Zapisz
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn col-5 col-md-3 btn-outline-danger"
              >
                Anuluj
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default withRouter(CarForm);
