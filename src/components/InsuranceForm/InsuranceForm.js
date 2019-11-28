import React from "react";
import { Formik, Form } from "formik";
import validator from "validator";
import PropTypes from "prop-types";

// Components
import TextInput from "../../components/TextInput/TextInput";
import CheckboxInput from "../../components/CheckboxInput/CheckboxInput";
import Spinner from "../../components/Spinner/Spinner";

const validate = values => {
  const errors = {};

  // Dates
  if (
    validator.isEmpty(values.to) ||
    validator.isBefore(
      values.to.toString(),
      new Date(Date.now() - 1 * 366 * 24 * 60 * 60 * 1000).toString()
    ) ||
    validator.isAfter(
      values.to.toString(),
      new Date(Date.now() + 1 * 366 * 24 * 60 * 60 * 1000).toString()
    )
  ) {
    errors.to = `Wpisana wartość poza dostępnym zakresem`;
  }

  // Numbers
  if (
    !validator.isInt(values.discount.toString(), {
      min: 0,
      max: 100
    })
  ) {
    errors.discount = "Wpisana wartość poza dostępnym zakresem";
  }

  // Strings
  if (
    !validator.isLength(values.company.toString(), {
      min: 1,
      max: 128
    })
  ) {
    errors.company = "Wpisana wartość poza dostępnym zakresem";
  }

  return errors;
};

const InsuranceForm = ({
  initialValues,
  handleSubmit,
  handleCancel,
  loading
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form>
          <div className="form-row">
            <TextInput {...formik} label="Ważne do" name="to" type="date" />
            <TextInput
              {...formik}
              name="company"
              label="Nazwa firmy ubezpieczeniowej"
              type="text"
            />
            <TextInput
              {...formik}
              name="discount"
              label="Posiadane zniżki (%)"
              type="number"
            />

            <CheckboxInput
              {...formik}
              name="installment"
              label="Ubezpieczenie rozłożone na raty"
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

InsuranceForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default InsuranceForm;
