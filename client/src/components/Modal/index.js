import React from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";

import styles from "./styles.module.css";
import {IoMdClose} from "react-icons/io";

const Modal = ({open, toggle, children}) =>
  open
    ? createPortal(
        <div className={styles.modal__overlay}>
          <div className={styles.modal}>
            <div className={styles.modal__header}>
              <IoMdClose className={styles.modal__close__icon} onClick={toggle} />
            </div>
            <div className={styles.modal__content}>{children}</div>
          </div>
        </div>,
        document.body
      )
    : null;

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
