import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const Button = ({label, onClick, color, className}) => (
  <button
    className={`${styles.button} ${className ? className : ""}`}
    style={{background: color}}
    onClick={onClick}
  >
    {label}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
