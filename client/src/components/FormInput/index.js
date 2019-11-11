import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const FormInput = ({value, onChange, label, type}) => (
  <div className={styles.form__input}>
    <label htmlFor={label} className={styles.input__label}>
      {label}
    </label>
    <input type={type} value={value} onChange={onChange} className={styles.input} />
  </div>
);

FormInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FormInput;
