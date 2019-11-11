import React, {useState} from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const HamburgerIcon = ({}) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <div className={styles.hamburger__icon} onClick={toggleOpen}>
      <div className={open ? styles.hamburger__first : ""}></div>
      <div className={open ? styles.hamburger__middle : ""}></div>
      <div className={open ? styles.hamburger__last : ""}></div>
    </div>
  );
};

HamburgerIcon.propTypes = {};

export default HamburgerIcon;
