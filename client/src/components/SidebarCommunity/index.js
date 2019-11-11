import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const SidebarCommunity = ({label}) => (
  <div className={styles.sidebar__community}>
    <div className={styles.sidebar__community__label}>{label}</div>
  </div>
);

SidebarCommunity.propTypes = {};

export default SidebarCommunity;
