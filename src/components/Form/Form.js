import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import "./Form.scss";

const Form = props => {
  const dispatch = useDispatch();
  const [config, setConfig] = useState({ ...props.config });
  const { inputs, buttons } = config;

  const checkFromIsValid = () => {
    let formIsValid = true;
    try {
      config.inputs.forEach(i => {
        if (i.valid === false || i.touched === false) {
          setConfig({ ...config, formIsValid: false });
          throw i;
        }
      });
    } catch {
      formIsValid = false;
    }

    if (formIsValid) setConfig({ ...config, formIsValid });
  };

  const handleChange = e => {
    setConfig({
      ...config,
      inputs: config.inputs.map(i => {
        if (i.name === e.target.name) {
          i.value = e.target.value;
          i.valid = i.validator.check(e.target.value, i.validator.options);
        }
        return i;
      })
    });
    checkFromIsValid();
  };

  const handleBlur = e => {
    setConfig({
      ...config,
      inputs: config.inputs.map(i => {
        if (i.name === e.target.name) {
          i.touched = true;
        }
        return i;
      })
    });
    checkFromIsValid();
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {};
    config.inputs.forEach(i => (payload[i.name] = i.value));

    dispatch(config.action(payload));
  };

  return (
    <section className="Form">
      <form className="Form__form" onSubmit={handleSubmit} noValidate>
        <h1 className="Form__header">{config.header}</h1>

        {/* Inputs */}
        {inputs.map(
          ({ name, type, placeholder, value, validator, valid, touched }) => (
            <div key={name}>
              <input
                className={`Form__input form-control mt-2 ${!valid &&
                  touched &&
                  "is-invalid"}`}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p className="Form__error-msg text-center invalid-feedback my-1">
                {validator.errMsg}
              </p>
            </div>
          )
        )}

        {/* Buttons */}
        <Button
          type={buttons[0].type}
          className="Form__btn"
          variant="secondary"
          disabled={!config.formIsValid}
        >
          {buttons[0].text}
        </Button>
      </form>
    </section>
  );
};

export default Form;
