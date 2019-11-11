import React from "react";
import PropTypes from "prop-types";
import {IoLogoReddit} from "react-icons/io";
import {GiHamburgerMenu} from "react-icons/gi";
import {Link} from "react-router-dom";

import styles from "./Header.module.css";
import Button from "../../components/Button";
import HamburgerIcon from "../../components/HamburgerIcon";

const Header = ({toggleRegister, toggleLogin}) => {
  return (
    <div className={styles.header__container}>
      <div className={styles.header__container_left}>
        <HamburgerIcon />
        <Link to="/" className={styles.header__logo__link}>
          <IoLogoReddit className={styles.header__logo} />
        </Link>
      </div>
      <div className={styles.header__container_right}>
        <Button label="Log In" color="var(--light-brown)" onClick={toggleLogin} />
        <Button label="Register" color="var(--brown)" onClick={toggleRegister} />
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
