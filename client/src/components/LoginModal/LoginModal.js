import React, {useState} from "react";
import PropTypes from "prop-types";

import styles from "./LoginModal.module.css";
import Modal from "../Modal";
import FormInput from "../FormInput";
import Button from "../Button";

const LoginModal = ({open, toggleLogin}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const update = fn => e => fn(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Modal open={open} toggle={toggleLogin}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInput type="text" label="Name" value={name} onChange={update(setName)} />
        <FormInput
          type="password"
          label="Password"
          value={password}
          onChange={update(setPassword)}
        />
        <Button type="submit" label="Login" color="var(--light-brown)" />
      </form>
    </Modal>
  );
};
LoginModal.propTypes = {};

export default LoginModal;
