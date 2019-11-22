import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";
import {Link} from "react-router-dom";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaCode,
  FaSuperscript,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
} from "react-icons/fa";
import styles from "./CommentForm.module.css";
import Button from "../Button";
import ToolbarButton from "../ToolbarButton";

const CommentForm = ({users, toggleRegister, toggleLogin}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editorRef = useRef(null);

  const toggleInlineStyle = e => {
    e.preventDefault();
    const style = e.currentTarget.getAttribute("data-style");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  if (users.authenticated) {
    return (
      <div className={styles.comment__form__container}>
        <span className={styles.comment__user}>
          Comment as{" "}
          <Link to="/" className={styles.user__link}>
            {users.session.name}
          </Link>
        </span>
        <div className={styles.comment__editor__container}>
          <div
            className={styles.comment__editor}
            onClick={() => editorRef.current.focus()}
          >
            <Editor ref={editorRef} editorState={editorState} onChange={setEditorState} />
          </div>
          <div className={styles.comment__editor__toolbar}>
            <div className={styles.toolbar__buttons}>
              <ToolbarButton>
                <FaBold />
              </ToolbarButton>
              <ToolbarButton>
                <FaItalic />
              </ToolbarButton>
              <ToolbarButton>
                <FaStrikethrough />
              </ToolbarButton>
              <ToolbarButton>
                <FaCode />
              </ToolbarButton>
              <ToolbarButton>
                <FaSuperscript />
              </ToolbarButton>
              <ToolbarButton>
                <FaHeading />
              </ToolbarButton>
              <ToolbarButton>
                <FaListOl />
              </ToolbarButton>
              <ToolbarButton>
                <FaListUl />
              </ToolbarButton>
              <ToolbarButton>
                <FaQuoteLeft />
              </ToolbarButton>
            </div>
            <button className={styles.toolbar__comment__button}>Comment</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.authentication__request}>
        <span className={styles.authentication__text}>
          What are you thoughts? Log In or Register?
        </span>
        <div className={styles.authentication__buttons}>
          <Button label="Log In" onClick={toggleLogin} />
          <Button label="Register" onClick={toggleRegister} />
        </div>
      </div>
    );
  }
};

CommentForm.propTypes = {
  users: PropTypes.object.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
};

export default CommentForm;
