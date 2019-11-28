import React from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import validator from "validator";

// Components
import SelectInput from "../../components/SelectInput/SelectInput";
import TextInput from "../../components/TextInput/TextInput";
import Spinner from "../../components/Spinner/Spinner";

const avaliableSex = [{ woman: "Kobieta" }, { man: "Mężczyzna" }];
const avaliableSexKeys = avaliableSex.map(a => Object.keys(a)[0]);

const avaliableMaritalStatus = [
  { single: "Singielka / Singiel" },
  { divorced: "Rozwiedziona / Rozwiedziony" },
  { widower: "Wdowa / Wdowiec" },
  { married: "Małżeństwo" }
];
const avaliableMaritalStatusKeys = avaliableMaritalStatus.map(
  a => Object.keys(a)[0]
);

const validate = values => {
  const errors = {};

  // Patterns
  if (!avaliableSexKeys.includes(values.sex)) {
    errors.sex = "Podana wartość nie jest dostępna";
  }
  if (!avaliableMaritalStatusKeys.includes(values.maritalStatus)) {
    errors.maritalStatus = "Podana wartość nie jest dostępna";
  }

  // Dates
  if (
    validator.isEmpty(values.dateOfBirth) ||
    validator.isBefore(
      values.dateOfBirth.toString(),
      new Date(1900, 0, 1).toString()
    ) ||
    validator.isAfter(values.dateOfBirth.toString(), new Date().toString())
  ) {
    errors.dateOfBirth = `Wpisana wartość poza dostępnym zakresem`;
  }
  if (
    validator.isEmpty(values.drivingLicensePickupDate) ||
    validator.isBefore(
      values.drivingLicensePickupDate.toString(),
      new Date(1900, 0, 1).toString()
    ) ||
    validator.isAfter(
      values.drivingLicensePickupDate.toString(),
      new Date().toString()
    )
  ) {
    errors.drivingLicensePickupDate = `Wpisana wartość poza dostępnym zakresem`;
  }

  // Postal Code
  if (!validator.isPostalCode(values.postCode, "PL")) {
    errors.postCode = "Wpisz poprawny kod pocztowy";
  }

  // Numbers
  if (
    !validator.isInt(values.numberOfChildrenUnder18Years.toString(), {
      min: 0,
      max: 63
    })
  ) {
    errors.numberOfChildrenUnder18Years =
      "Wpisana wartość poza dostępnym zakresem";
  }

  return errors;
};

const OwnerForm = ({ initialValues, handleSubmit, loading, ...props }) => {
  const handleCancel = () => {
    const id = props.car || props.match.params.id;
    props.history.push(`/car/${id}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form>
          <div className="form-row">
            <SelectInput
              {...formik}
              label="Płeć"
              options={avaliableSex}
              name="sex"
              defaultVal="Wybierz płeć"
            />
            <TextInput
              {...formik}
              name="dateOfBirth"
              label="Data urodzenia"
              type="date"
            />
            <TextInput
              {...formik}
              name="drivingLicensePickupDate"
              label="Data odbioru prawa jazdy"
              type="date"
            />
            <TextInput
              {...formik}
              name="postCode"
              label="Kod pocztowy"
              type="text"
            />
            <SelectInput
              {...formik}
              label="Płeć"
              options={avaliableMaritalStatus}
              name="maritalStatus"
              defaultVal="Wybierz stan cywilny"
            />
            <TextInput
              {...formik}
              name="numberOfChildrenUnder18Years"
              label="Liczba dzieci do 18 lat"
              type="number"
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

OwnerForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default withRouter(OwnerForm);
