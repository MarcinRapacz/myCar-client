import React from "react";
import { Field, ErrorMessage } from "formik";
import "./SelectInput.scss";

const SelectInput = ({ errors, touched, name, options, defaultVal, label }) => {
  return (
    <div className="form-group col-12 mb-1">
      <label htmlFor={name} className="mb-0">
        {label}
      </label>
      <Field
        id={name}
        as="select"
        name={name}
        className={`form-control ${errors[name] &&
          touched[name] &&
          "is-invalid"}`}
      >
        <option>{defaultVal}</option>
        {options.map(o => {
          const [key, value] = Object.entries(o)[0];
          return (
            <option key={key} value={key}>
              {value}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} className="invalid-feedback" component="div" />
    </div>
  );
};

export default SelectInput;
