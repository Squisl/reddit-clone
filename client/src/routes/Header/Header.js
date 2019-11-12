import React from "react";
import PropTypes from "prop-types";
import {IoLogoReddit} from "react-icons/io";
import {Link} from "react-router-dom";

import styles from "./Header.module.css";
import Button from "../../components/Button";
import HamburgerIcon from "../../components/HamburgerIcon";

const Header = ({toggleRegister, toggleLogin, authenticated, logout}) => {
  return (
    <div className={styles.header__container}>
      <div className={styles.header__container_left}>
        <HamburgerIcon />
        <Link to="/" className={styles.header__logo__link}>
          <IoLogoReddit className={styles.header__logo} />
        </Link>
      </div>
      <div className={styles.header__container_right}>
        {authenticated ? (
          <>
            <Button label="Log Out" color="var(--light-brown)" onClick={logout} />
          </>
        ) : (
          <>
            <Button label="Log In" color="var(--light-brown)" onClick={toggleLogin} />
            <Button label="Register" color="var(--brown)" onClick={toggleRegister} />
          </>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  toggleRegister: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Header;
