import React from "react";
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

const CarForm = ({ initialValues, handleSubmit, loading }) => {
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
            <button className="btn btn-block btn-outline-primary" type="submit">
              Zapisz
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default CarForm;
