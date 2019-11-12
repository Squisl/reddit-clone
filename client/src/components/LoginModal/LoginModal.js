import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

import styles from "./LoginModal.module.css";
import Modal from "../Modal";
import FormInput from "../FormInput";
import Button from "../Button";
import {validateName, validatePassword, validateLogin} from "../../utilities/validations";
import MessageBlock from "../MessageBlock";

const LoginModal = ({
  open,
  toggleLogin,
  login,
  errors,
  clearErrors,
  receiveErrors,
  clearError,
}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const clearForm = () => {
    name.length && setName("");
    password.length && setPassword("");
    Object.keys(errors).length && clearErrors();
  };
  useEffect(() => {
    if (!open) {
      clearForm();
    }
  }, [clearForm, open]);

  const handleBlur = (fn, field, ...rest) => e => {
    const {valid, error} = fn(e.target.value, ...rest);
    if (!valid) {
      receiveErrors(error);
    } else if (errors[field]) {
      clearError(field);
    }
  };

  const update = fn => e => fn(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = {name, password};
    const {valid, errors: validationErrors} = validateLogin(formData);
    if (valid) {
      await login(formData);
    } else {
      receiveErrors(validationErrors);
    }
  };

  return (
    <Modal open={open} toggle={toggleLogin}>
      {errors.msg && (
        <div className={styles.message__container}>
          <MessageBlock message={errors.msg} color="var(--red)" />
        </div>
      )}
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
          onBlur={handleBlur(validatePassword, "password")}
          error={errors.password}
        />
        <Button type="submit" label="Login" color="var(--light-brown)" />
      </form>
    </Modal>
  );
};
LoginModal.propTypes = {};

export default LoginModal;
