import React, {useState} from "react";
import PropTypes from "prop-types";

import styles from "./RegisterModal.module.css";
import Modal from "../Modal";
import FormInput from "../FormInput";
import Button from "../Button";

const RegisterModal = ({open, toggleRegister}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const update = fn => e => fn(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Modal open={open} toggle={toggleRegister}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormInput type="text" label="E-mail" value={email} onChange={update(setEmail)} />
        <FormInput type="text" label="Name" value={name} onChange={update(setName)} />
        <FormInput
          type="password"
          label="Password"
          value={password}
          onChange={update(setPassword)}
        />
        <FormInput
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={update(setConfirmPassword)}
        />
        <Button type="submit" label="Register" color="var(--light-brown)" />
      </form>
    </Modal>
  );
};

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default RegisterModal;
