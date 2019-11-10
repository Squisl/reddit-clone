import React from "react";
import PropTypes from "prop-types";
import {IoLogoReddit} from "react-icons/io";
import {GiHamburgerMenu} from "react-icons/gi";
import {Link} from "react-router-dom";

import styles from "./Header.module.css";
import Button from "../../components/Button";

const Header = props => {
  return (
    <div className={styles.header__container}>
      <div className={styles.header__container_left}>
        <GiHamburgerMenu className={styles.header__hamburger__icon} />
        <Link to="/" className={styles.header__logo__link}>
          <IoLogoReddit className={styles.header__logo} />
        </Link>
      </div>
      <div className={styles.header__container_right}>
        <Button label="Log In" color="var(--light-brown)" />
        <Button label="Register" color="var(--brown)" />
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
