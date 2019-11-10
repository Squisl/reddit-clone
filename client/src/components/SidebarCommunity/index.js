import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const SidebarCommunity = ({label}) => (
  <div className={styles.sidebar__community}>{label}</div>
);

SidebarCommunity.propTypes = {};

export default SidebarCommunity;
