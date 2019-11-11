import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const FormInput = ({value, onChange, label, type, onBlur, error}) => (
  <div className={styles.form__input}>
    <label htmlFor={label} className={styles.input__label}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={styles.input}
      onBlur={onBlur}
    />
    {error && <span className={styles.input__error}>{error}</span>}
  </div>
);

FormInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
};

export default FormInput;
