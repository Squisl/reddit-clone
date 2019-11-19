import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styles from "./Comment.module.css";
import {GoArrowUp, GoArrowDown} from "react-icons/go";

const Comment = props => {
  return (
    <div className={styles.comment}>
      <div className={styles.comment__sidebar}>
        <div className={styles.comment__arrows}>
          <GoArrowUp className={`${styles.arrow__icon} ${styles.upvote}`} />
          <GoArrowDown className={`${styles.arrow__icon} ${styles.downvote}`} />
        </div>
      </div>
      <div className={styles.comment__main}>
        <div className={styles.comment__header}>
          <Link to="/" className={styles.comment__user}>
            HipHoppington
          </Link>
          <span className={styles.comment__points}>1.4k points</span>
          <span className={styles.comment__time}>1 hour ago</span>
        </div>
        <div className={styles.comment__text}>
          These are the kinds of easter eggs I love, just subtle little references to
          other things I like. Very cool detail
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {};

export default Comment;
