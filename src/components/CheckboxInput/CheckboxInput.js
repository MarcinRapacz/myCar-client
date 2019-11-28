import React from "react";
import { Field, ErrorMessage } from "formik";
import "./CheckboxInput.scss";

const CheckboxInput = ({ errors, touched, name, label }) => {
  return (
    <div className="form-check col-12 mb-1">
      <label htmlFor={name} className="mt-2 mb-3 ml-4 form-check-label">
        <Field
          id={name}
          type="checkbox"
          name={name}
          className={`form-check-input ${errors[name] &&
            touched[name] &&
            "is-invalid"}`}
        />
        {label}
      </label>
      <ErrorMessage name={name} className="invalid-feedback" component="div" />
    </div>
  );
};

export default CheckboxInput;
