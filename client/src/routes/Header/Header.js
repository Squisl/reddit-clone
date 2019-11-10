import React from "react";
import PropTypes from "prop-types";

import styles from "./Header.module.css";

const Header = props => {
  return (
    <div className={styles.header__container}>
      <span>Header</span>
    </div>
  );
};

Header.propTypes = {};

export default Header;
