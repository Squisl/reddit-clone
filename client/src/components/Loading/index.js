import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const Loading = props => (
  <div className={styles.loading__container}>
    <div className={styles.loading}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

Loading.propTypes = {};

export default Loading;
