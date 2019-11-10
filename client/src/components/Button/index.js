import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const Button = ({label, onClick, color}) => (
  <button className={styles.button} style={{background: color}} onClick={onClick}>
    {label}
  </button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
