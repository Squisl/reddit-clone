import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const ToolbarButton = ({children}) => (
  <button className={styles.toolbar__button}>{children}</button>
);

ToolbarButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToolbarButton;
