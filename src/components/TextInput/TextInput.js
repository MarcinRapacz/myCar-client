import React from "react";
import { Field, ErrorMessage } from "formik";
import "./TextInput.scss";

const TextInput = ({
  errors,
  touched,
  name,
  placeholder,
  type = "text",
  label
}) => {
  return (
    <div className="form-group col-12 mb-1">
      <label htmlFor={name} className="mb-0">
        {label}
      </label>
      <Field
        id={name}
        type={type}
        name={name}
        className={`form-control ${errors[name] &&
          touched[name] &&
          "is-invalid"}`}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} className="invalid-feedback" component="div" />
    </div>
  );
};

export default TextInput;
