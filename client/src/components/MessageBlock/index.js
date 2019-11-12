import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const MessageBlock = ({message, color}) => (
  <div className={styles.message__block} style={{background: color}}>
    <span className={styles.message}>{message}</span>
  </div>
);

MessageBlock.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default MessageBlock;
