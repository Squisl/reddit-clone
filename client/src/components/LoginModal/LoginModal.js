import React, {useState} from "react";
import PropTypes from "prop-types";

import styles from "./LoginModal.module.css";
import Modal from "../Modal";
import FormInput from "../FormInput";
import Button from "../Button";
import {validateName, validatePassword, validateLogin} from "../../utilities/validations";

const LoginModal = ({open, toggleLogin, login}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleBlur = (fn, field, ...rest) => e => {
    const {valid, error} = fn(e.target.value, ...rest);
    if (!valid) {
      setErrors({...errors, ...error});
    } else if (errors[field]) {
      const errorsCopy = Object.assign({}, errors);
      delete errorsCopy[field];
      setErrors(errorsCopy);
    }
  };

  const update = fn => e => fn(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = {name, password};
    const {valid, errors: validationErrors} = validateLogin(formData);
    if (valid) {
      const loginErrors = await login(formData);
      if (loginErrors) {
        setErrors({...errors, ...loginErrors});
      }
    } else {
      setErrors({...errors, ...validationErrors});
    }
  };

  return (
    <Modal open={open} toggle={toggleLogin}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label="Name"
          value={name}
          onChange={update(setName)}
          onBlur={handleBlur(validateName, "name")}
          error={errors.name}
        />
        <FormInput
          type="password"
          label="Password"
          value={password}
          onChange={update(setPassword)}
          onBlur={(handleBlur(validatePassword), "password")}
          error={errors.password}
        />
        <Button type="submit" label="Login" color="var(--light-brown)" />
      </form>
    </Modal>
  );
};
LoginModal.propTypes = {};

export default LoginModal;
