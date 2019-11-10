import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const Input = ({type, value, onChange}) => (
  <input type={type} value={value} onChange={onChange} className={styles.input} />
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
