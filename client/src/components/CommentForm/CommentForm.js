import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
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
import {stateToHTML} from "draft-js-export-html";
import styles from "./CommentForm.module.css";
import Button from "../Button";
import ToolbarButton from "../ToolbarButton";

const inlineStyleButtons = [
  {
    icon: <FaBold />,
    style: "BOLD",
  },

  {
    icon: <FaItalic />,
    style: "ITALIC",
  },

  {
    icon: <FaStrikethrough />,
    style: "STRIKETHROUGH",
  },
  {
    icon: <FaCode />,
    style: "CODE",
  },
  {
    icon: <FaSuperscript />,
    style: "SUPERSCRIPT",
  },
];

const blockTypeButtons = [
  {
    icon: <FaHeading />,
    block: "header-two",
  },

  {
    icon: <FaQuoteLeft />,
    block: "blockquote",
  },

  {
    icon: <FaListUl />,
    block: "unordered-list-item",
  },

  {
    icon: <FaListOl />,
    block: "ordered-list-item",
  },
];

const styleMap = {
  SUPERSCRIPT: {
    verticalAlign: "super",
    fontSize: "0.8rem",
  },
};

const exportOptions = {
  inlineStyles: {
    SUPERSCRIPT: {
      style: {
        verticalAlign: "super",
        fontSize: "0.8rem",
      },
    },
  },
};

const CommentForm = ({post_id, users, toggleRegister, toggleLogin, createComment}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editorRef = useRef(null);

  const toggleInlineStyle = e => {
    e.preventDefault();
    const style = e.currentTarget.getAttribute("data-style");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = e => {
    e.preventDefault();
    const block = e.currentTarget.getAttribute("data-block");
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  const renderInlineStyleButton = (icon, style) => {
    const currentInlineStyle = editorState.getCurrentInlineStyle();
    return (
      <ToolbarButton
        key={style}
        data-style={style}
        onMouseDown={toggleInlineStyle}
        style={{background: currentInlineStyle.has(style) ? "var(--light-brown" : ""}}
      >
        {icon}
      </ToolbarButton>
    );
  };

  const renderBlockButton = (icon, block) => {
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);
    return (
      <ToolbarButton
        key={block}
        data-block={block}
        onMouseDown={toggleBlockType}
        style={{background: currentBlockType === block ? "var(--light-brown" : ""}}
      >
        {icon}
      </ToolbarButton>
    );
  };

  const handleClickComment = () => {
    if (!editorState.getCurrentContent().hasText()) {
      return;
    }
    const commentHTML = stateToHTML(editorState.getCurrentContent(), exportOptions);
    createComment(post_id, commentHTML);
    const newEditorState = EditorState.push(editorState, ContentState.createFromText(""));
    setEditorState(newEditorState);
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
            <Editor
              ref={editorRef}
              editorState={editorState}
              onChange={setEditorState}
              customStyleMap={styleMap}
            />
          </div>
          <div className={styles.comment__editor__toolbar}>
            <div className={styles.toolbar__buttons}>
              {inlineStyleButtons.map(button =>
                renderInlineStyleButton(button.icon, button.style)
              )}
              {blockTypeButtons.map(button =>
                renderBlockButton(button.icon, button.block)
              )}
            </div>
            <button
              className={`${
                styles.toolbar__comment__button
              } ${!editorState.getCurrentContent().hasText() && styles.comment_invalid}`}
              onClick={handleClickComment}
            >
              Comment
            </button>
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
