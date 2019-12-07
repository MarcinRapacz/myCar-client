import React from "react";
import PropTypes from "prop-types";
import validator from "validator";
import "./CollisionForm.scss";

import { Formik, Form } from "formik";

// Components
import TextInput from "../TextInput/TextInput";
import Spinner from "../Spinner/Spinner";

const validate = values => {
  const errors = {};

  // Strings
  if (
    !validator.isLength(values.name.toString(), {
      min: 2,
      max: 64
    })
  ) {
    errors.name = "Wpisana wartość poza dostępnym zakresem";
  }
  if (
    !validator.isLength(values.description.toString(), {
      min: 2,
      max: 400
    })
  ) {
    errors.description = "Wpisana wartość poza dostępnym zakresem";
  }

  // Dates
  if (
    validator.isEmpty(values.dateOfNotification) ||
    validator.isBefore(
      values.dateOfNotification.toString(),
      new Date(1900, 0, 1).toString()
    ) ||
    validator.isAfter(
      values.dateOfNotification.toString(),
      new Date().toISOString().slice(0, 10)
    )
  ) {
    errors.dateOfNotification = `Wpisana wartość poza dostępnym zakresem`;
  }

  return errors;
};

const CollisionForm = ({
  initialValues,
  handleSubmit,
  handleCancel,
  loading
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {formik => (
        <Form className="form-row">
          <TextInput {...formik} name="name" label="Nazwa kolizji" />
          <TextInput {...formik} name="description" label="Opis kolizji" />
          <TextInput
            {...formik}
            name="dateOfNotification"
            label="Data kolizji"
            type="date"
          />
          {loading ? (
            <Spinner />
          ) : (
            <div
              className="btn-group btn-block"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="submit"
                className="btn btn-outline-primary col-7 col-md-9"
              >
                Zapisz
              </button>
              <button
                type="button"
                className="btn btn-outline-danger col-5 col-md-3"
                onClick={handleCancel}
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

CollisionForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default CollisionForm;
