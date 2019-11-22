import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const ToolbarButton = ({children, className, ...rest}) => (
  <button className={`${styles.toolbar__button} ${className ? className : ""}`} {...rest}>
    {children}
  </button>
);

ToolbarButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToolbarButton;
