import React, {useState} from "react";
import PropTypes from "prop-types";

import styles from "./RegisterModal.module.css";
import Modal from "../Modal";
import FormInput from "../FormInput";
import Button from "../Button";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateRegister,
} from "../../utilities/validations";

const RegisterModal = ({
  open,
  toggleRegister,
  register,
  errors,
  receiveErrors,
  clearError,
  clearErrors,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    clearErrors();
  };

  const handleClose = () => {
    toggleRegister();
    handleReset();
  };

  const update = fn => e => fn(e.target.value);

  const handleBlur = (fn, field, ...rest) => e => {
    const {valid, error} = fn(e.target.value, ...rest);
    if (!valid) {
      receiveErrors(error);
    } else if (errors[field]) {
      clearError(field);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = {name, email, password, confirmPassword};
    const {valid, errors: validationErrors} = validateRegister(formData);
    if (valid) {
      await register(formData, handleReset);
    } else {
      console.log(validationErrors);
      receiveErrors(validationErrors);
    }
  };

  return (
    <Modal open={open} toggle={handleClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormInput
          type="text"
          label="E-mail"
          value={email}
          onChange={update(setEmail)}
          onBlur={handleBlur(validateEmail, "email")}
          error={errors.email}
        />
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
          onBlur={handleBlur(validatePassword, "password")}
          error={errors.password}
        />
        <FormInput
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={update(setConfirmPassword)}
          onBlur={handleBlur(validateConfirmPassword, "confirmPassword", password)}
          error={errors.confirmPassword}
        />
        <Button type="submit" label="Register" color="var(--brown)" />
      </form>
    </Modal>
  );
};

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default RegisterModal;
